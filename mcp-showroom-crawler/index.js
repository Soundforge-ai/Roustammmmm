#!/usr/bin/env node

const { Server } = require("@modelcontextprotocol/sdk/server/index.js");
const { StdioServerTransport } = require("@modelcontextprotocol/sdk/server/stdio.js");
const {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} = require("@modelcontextprotocol/sdk/types.js");
const { crawlShowroom } = require("./crawl-showroom.js");

class ShowroomCrawlerServer {
  constructor() {
    this.server = new Server(
      {
        name: "mcp-showroom-crawler",
        version: "0.1.0",
      },
      {
        capabilities: {
          resources: {},
          tools: {
            crawl_showroom: {
              description: "Crawl all content from a showroom URL (producthandleiding) including images, PDFs, and other media",
              input: {
                type: "object",
                properties: {
                  url: {
                    type: "string",
                    description: "The base URL to crawl (e.g., https://benefit.ekookna.com/nl/producthandleiding)"
                  },
                  outputDir: {
                    type: "string",
                    description: "Directory to save crawled content",
                    default: "./showroom-content"
                  }
                },
                required: ["url"]
              }
            }
          },
        },
      }
    );

    this.setupToolHandlers();
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: "crawl_showroom",
          description: "Crawl all content from a showroom URL (producthandleiding) including images, PDFs, and other media",
          inputSchema: {
            type: "object",
            properties: {
              url: {
                type: "string",
                description: "The base URL to crawl (e.g., https://benefit.ekookna.com/nl/producthandleiding)"
              },
              outputDir: {
                type: "string",
                description: "Directory to save crawled content",
                default: "./showroom-content"
              }
            },
            required: ["url"]
          }
        }
      ]
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      if (name === "crawl_showroom") {
        try {
          const { url, outputDir = "./showroom-content" } = args;

          if (!url) {
            throw new McpError(
              ErrorCode.InvalidParams,
              "URL is required"
            );
          }

          console.error(`[MCP Showroom Crawler] Starting crawl of: ${url}`);
          console.error(`[MCP Showroom Crawler] Output directory: ${outputDir}`);

          // Execute the crawl
          const result = await crawlShowroom(url, outputDir);

          console.error(`[MCP Showroom Crawler] Crawl completed successfully!`);

          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  success: true,
                  message: "Showroom crawled successfully",
                  results: result,
                  outputDir: outputDir
                }, null, 2)
              }
            ]
          };

        } catch (error) {
          console.error(`[MCP Showroom Crawler] Error: ${error.message}`);
          throw new McpError(
            ErrorCode.InternalError,
            `Failed to crawl showroom: ${error.message}`
          );
        }
      }

      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
    });
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("[MCP Showroom Crawler] Server started and ready");
  }
}

// Start the server
const server = new ShowroomCrawlerServer();
server.start().catch((error) => {
  console.error("[MCP Showroom Crawler] Fatal error:", error);
  process.exit(1);
});
