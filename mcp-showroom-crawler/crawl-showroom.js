#!/usr/bin/env node

const { StdioClient } = require('@modelcontextprotocol/sdk/client/stdio.js');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

class ShowroomCrawler {
  constructor() {
    this.browser = null;
    this.page = null;
    this.mcpClient = null;
    this.crawledPages = new Set();
    this.pageData = [];
  }

  async initialize() {
    console.log('Initializing MCP client...');
    
    // Initialize MCP client with filesystem server
    this.mcpClient = new StdioClient({
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-filesystem@latest', '/Users/innovarslabo/Desktop/yannova'],
    });
    
    await this.mcpClient.initialize();
    console.log('MCP client initialized');
  }

  async initializeBrowser() {
    console.log('Launching browser...');
    this.browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    
    // Set user agent
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );
    console.log('Browser initialized');
  }

  async savePageData() {
    if (this.pageData.length === 0) {
      console.log('No data to save');
      return;
    }

    try {
      // Use MCP to save the data
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `showroom_crawl_${timestamp}.json`;
      
      console.log(`Saving ${this.pageData.length} pages to ${filename}...`);
      
      // Create directory if it doesn't exist
      const outputDir = path.join(process.cwd(), 'mcp-showroom-crawler', 'output');
      await fs.mkdir(outputDir, { recursive: true });
      
      // Save data as JSON
      const filePath = path.join(outputDir, filename);
      await fs.writeFile(
        filePath,
        JSON.stringify(this.pageData, null, 2),
        'utf-8'
      );
      
      console.log(`✓ Data saved to: ${filePath}`);
      
      // Also save with MCP filesystem server
      try {
        const outputPath = path.join('/Users/innovarslabo/Desktop/yannova', 'mcp-showroom-crawler', 'output', filename);
        await this.mcpWriteFile(outputPath, JSON.stringify(this.pageData, null, 2));
        console.log(`✓ Data also saved via MCP to: ${outputPath}`);
      } catch (mcpError) {
        console.warn('Warning: Could not save via MCP filesystem server:', mcpError.message);
        console.log('Data was still saved locally');
      }
      
    } catch (error) {
      console.error('Failed to save page data:', error);
    }
  }

  async mcpWriteFile(filePath, content) {
    if (!this.mcpClient) {
      throw new Error('MCP client not initialized');
    }

    try {
      // Use the MCP client to write the file
      await this.mcpClient.callTool({
        name: 'write_file',
        arguments: {
          path: filePath.replace('/Users/innovarslabo/Desktop/yannova', ''),
          content: content
        }
      });
    } catch (error) {
      console.error('MCP write_file failed, trying write-to-file tool...');
      await this.mcpClient.callTool({
        name: 'write-to-file',
        arguments: {
          path: filePath.replace('/Users/innovarslabo/Desktop/yannova', ''),
          content: content
        }
      });
    }
  }

  async crawlPage(url, depth = 0, maxDepth = 2) {
    if (depth > maxDepth || this.crawledPages.has(url)) {
      return;
    }

    console.log(`\n[Crawl ${depth}] ${url}`);
    this.crawledPages.add(url);

    try {
      await this.page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      
      // Wait a bit for any dynamic content
      await this.page.waitForTimeout(2000);

      // Extract page data
      const pageInfo = await this.page.evaluate(() => {
        const extractText = (selector) => {
          const element = document.querySelector(selector);
          return element ? element.textContent.trim() : null;
        };

        return {
          title: document.title,
          url: window.location.href,
          metaDescription: document.querySelector('meta[name="description"]')?.content || null,
          h1: extractText('h1'),
          h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent.trim()),
          firstParagraph: extractText('p'),
          language: document.documentElement.lang || 'nl',
          crawledAt: new Date().toISOString()
        };
      });

      this.pageData.push(pageInfo);
      console.log(`✓ Extracted: ${pageInfo.title}`);

      // Find all internal links
      const links = await this.page.evaluate(() => {
        const linkElements = Array.from(document.querySelectorAll('a[href]'));
        const currentOrigin = window.location.origin;
        
        return linkElements
          .map(link => link.href)
          .filter(href => {
            // Filter for internal links only
            return href && (
              href.startsWith(currentOrigin) ||
              href.startsWith('/') ||
              href.startsWith('./') ||
              href.startsWith('../')
            );
          })
          .map(href => {
            // Convert relative URLs to absolute
            if (href.startsWith('/') || href.startsWith('./') || href.startsWith('../')) {
              return new URL(href, window.location.origin).href;
            }
            return href;
          });
      });

      // Remove duplicates and already crawled URLs
      const uniqueLinks = [...new Set(links)]
        .filter(link => !this.crawledPages.has(link))
        .filter(link => {
          // Filter out common non-content URLs
          const excludePatterns = [
            '/wp-admin',
            '/wp-content/uploads',
            '/wp-json',
            '/feed',
            '/search',
            '/tag/',
            '/category/',
            '.pdf',
            '.jpg',
            '.png',
            '.gif',
            '.zip',
            '#'
          ];
          return !excludePatterns.some(pattern => link.includes(pattern));
        });

      console.log(`  Found ${uniqueLinks.length} unique links to follow`);

      // Crawl child links
      for (const link of uniqueLinks.slice(0, 10)) { // Limit to first 10 links per page
        try {
          await this.crawlPage(link, depth + 1, maxDepth);
        } catch (error) {
          console.warn(`  Warning: Failed to crawl ${link}:`, error.message);
        }
      }

    } catch (error) {
      console.error(`✗ Failed to crawl ${url}:`, error.message);
    }
  }

  async crawlShowroom(baseUrl, maxDepth = 2) {
    console.log(`Starting to crawl showroom from: ${baseUrl}`);
    console.log(`Maximum depth: ${maxDepth}`);
    
    await this.initializeBrowser();
    
    try {
      await this.crawlPage(baseUrl, 0, maxDepth);
      console.log(`\nCrawling completed! Total pages crawled: ${this.pageData.length}`);
      console.log(`Pages visited: ${this.crawledPages.size}`);
    } catch (error) {
      console.error('Crawling failed:', error);
    } finally {
      if (this.browser) {
        await this.browser.close();
        console.log('Browser closed');
      }
    }

    await this.savePageData();
  }

  async run() {
    try {
      await this.initialize();
      
      const baseUrl = 'https://benefit.ekookna.com/nl/producthandleiding';
      
      console.log('='.repeat(60));
      console.log('SHOWROOM CRAWLER - MCP EDITION');
      console.log('='.repeat(60));
      
      await this.crawlShowroom(baseUrl, 2);
      
      console.log('\n'.repeat(2));
      console.log('='.repeat(60));
      console.log('CRAWL COMPLETE');
      console.log('='.repeat(60));
      console.log(`Total pages crawled: ${this.pageData.length}`);
      console.log(`Data saved to: mcp-showroom-crawler/output/`);
      
    } catch (error) {
      console.error('Fatal error:', error);
      process.exit(1);
    }
  }
}

// Run the crawler
const crawler = new ShowroomCrawler();
crawler.run().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
