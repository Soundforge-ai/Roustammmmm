# MCP Showroom Crawler

An MCP server for crawling showroom content including images, PDFs, and media from websites.

## Installation

```bash
cd mcp-showroom-crawler
npm install
```

## Usage

Add this server to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "showroom-crawler": {
      "command": "node",
      "args": [
        "/Users/innovarslabo/Desktop/yannova/mcp-showroom-crawler/index.js"
      ]
    }
  }
}
```

## Tools

### crawl_showroom

Crawls a showroom URL and extracts all images, PDFs, and downloadable content.

**Parameters:**
- `url`: The URL to crawl (e.g., `https://benefit.ekookna.com/nl/producthandleiding`)
- `maxDepth`: Maximum depth to crawl (default: 2)
- `followLinks`: Whether to follow internal links (default: true)

**Returns:**
- List of all found images with URLs
- List of all found PDFs and downloadable files
- Crawl report with statistics

## Example

Crawl a showroom and download all images.
