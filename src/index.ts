import * as readline from "node:readline";
import { stdin, stdout } from "node:process";

import { resources } from "./resources.js";
import { tools } from "./tools.js";

const serverInfo = {
  name: "Hacker News API Server",
  version: "2.0.0",
};

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

function sendResponse(id: number, result: object) {
  const response = {
    result,
    jsonrpc: "2.0",
    id,
  };
  console.log(JSON.stringify(response));
}

(async function main() {
  for await (const line of rl) {
    try {
      const json = JSON.parse(line);
      if (json.jsonrpc === "2.0") {
        if (json.method === "initialize") {
          sendResponse(json.id, {
            protocolVersion: "2025-03-26",
            capabilities: {
              tools: { listChanged: true },
              resources: { listChanged: true },
            },
            serverInfo,
          });
        }
      }
      if (json.method === "tools/list") {
        sendResponse(json.id, {
          tools: tools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            inputSchema: tool.inputSchema,
          })),
        });
      }
      if (json.method === "tools/call") {
        const tool = tools.find((tool) => tool.name === json.params.name);
        if (tool) {
          const toolResponse = await tool.execute(json.params.arguments);
          sendResponse(json.id, toolResponse);
        } else {
          sendResponse(json.id, {
            error: {
              code: -32602,
              message: `MCP error -32602: Tool ${json.params.name} not found`,
            },
          });
        }
      }
      if (json.method === "resources/list") {
        sendResponse(json.id, {
          resources: resources.map((resource) => ({
            uri: resource.uri,
            name: resource.name,
          })),
        });
      }
      if (json.method === "resources/read") {
        const uri = json.params.uri;
        const resource = resources.find((resource) => resource.uri === uri);
        if (resource) {
          sendResponse(json.id, await resource.get());
        } else {
          sendResponse(json.id, {
            error: { code: -32602, message: "Resource not found" },
          });
        }
      }
      if (json.method === "ping") {
        sendResponse(json.id, {});
      }
    } catch (error) {
      console.error(error);
    }
  }
})();
