# mcp-hacker-news

A Model Context Protocol (MCP) server implementation for [Hacker News](https://news.ycombinator.com/) build with TypeScript.

## Features

- Fetches posts, comments, and user information from the Hacker News API
- Exposes standard MCP server endpoints
- TypeScript + ESM project structure

## Requirements

- Node.js >= 18
- [pnpm](https://pnpm.io/) >= 8

## Getting Started

Clone or copy the repository to your local folder.

Install dependencies and build the project:

```bash
pnpm install && pnpm build
```

Run with MCP Inspector:

```bash
pnpm inspector
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

