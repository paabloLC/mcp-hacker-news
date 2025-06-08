# mcp-hacker-news

A Model Context Protocol (MCP) server implementation for [Hacker News](https://news.ycombinator.com/) built with TypeScript.

## Features

- Fetches posts, comments, and user information from the Hacker News API
- Exposes standard MCP server endpoints for tools and resources
- TypeScript + ESM project structure
- Real-time access to Hacker News data

## Requirements

- Node.js >= 16.0.0

## Installation

### Option 1: Install from npm (Recommended)

```bash
npm install -g mcp-hacker-news
```

### Option 2: Development Setup

Clone or copy the repository to your local folder:

```bash
git clone https://github.com/paablolc/mcp-hacker-news.git
cd mcp-hacker-news
pnpm install && pnpm build
```

## Usage with Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "mcp-hacker-news": {
      "command": "npx",
      "args": ["-y", "mcp-hacker-news"]
    }
  }
}

```

## Testing

Run with MCP Inspector:

```bash
npx @modelcontextprotocol/inspector mcp-hacker-news
```

## Project Structure

```
└── src/
    ├── index.ts
    ├── resources.ts
    ├── tools.ts
    ├── fetch-actions.ts
    ├── helpers.ts
    └── types-hn.ts
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .nvmrc
├── .gitignore
├── README.md
```

![mcp-inspector](https://github.com/user-attachments/assets/49938eda-7c70-4ec2-bc5f-404fe812153d)

