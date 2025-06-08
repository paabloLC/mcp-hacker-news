# mcp-hacker-news

A [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/spec) server for [Hacker News](https://news.ycombinator.com/) built with TypeScript.

This MCP server acts as a bridge between the official [Hacker News API](https://github.com/HackerNews/API) and AI-powered tools that support the Model Context Protocol, such as [Claude](https://claude.ai/) and [Cursor](https://www.cursor.so/).  

It enables these tools to fetch and interact with live Hacker News data (posts, comments, users) via standardized MCP endpoints.

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

![Demo: Claude using MCP Hacker News](https://raw.githubusercontent.com/paabloLC/mcp-hacker-news/main/assets/mcp-hacker-news-demo.gif)

## Features

- Integrates with the official [Hacker News API](https://github.com/HackerNews/API) to fetch posts, comments, and user information.
- Exposes standard [Model Context Protocol](https://github.com/modelcontextprotocol/spec) endpoints for seamless integration with [Claude](https://claude.ai/), [Cursor](https://www.cursor.so/), and other LLM-based tools.
- Fetches the latest Hacker News data for AI and automation workflows.

### Requirements

- [Node.js](https://nodejs.org/) **version 18 or higher** is required.
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/) as a package manager.

> ⚠️ If you are unsure about your Node.js version, run `node --version` in your terminal.
> Make sure it shows `v18.x.x` or higher.  
> [How to upgrade Node.js](https://nodejs.org/en/download/)

---

### Want to contribute? Just follow the steps below

##### Clone the repository and install dependencies:

```bash
git clone https://github.com/paablolc/mcp-hacker-news.git
cd mcp-hacker-news
pnpm install
pnpm build
```

- To test the server with the MCP Inspector:

```bash
pnpm inspector
```
- or, if running from the source:
```bash
npx @modelcontextprotocol/inspector node dist/index.js
```
![mcp-inspector](https://raw.githubusercontent.com/paabloLC/mcp-hacker-news/main/assets/mcp-hacker-news-inspector.png)

## Resources

This MCP server exposes the following fixed resources, each corresponding to a core Hacker News endpoint:

| Resource URI        | Description                | Hacker News API Endpoint |
| ------------------- | -------------------------- | ------------------------ |
| `hackernews://top`  | Top stories                | `/v0/topstories`         |
| `hackernews://new`  | Newest stories             | `/v0/newstories`         |
| `hackernews://best` | Best (algorithmic) stories | `/v0/beststories`        |

These three collections match the main list endpoints officially provided by the [Hacker News API](https://github.com/HackerNews/API).  
Other types of stories (Ask HN, Show HN, Jobs, etc.) and item-specific lookups are available as **tools** (see below), allowing for flexible querying with custom parameters.

## Tools

The following tools are available for advanced or parameterized queries. These allow you to fetch other Hacker News content beyond the fixed resources above:

| Tool Name          | Description                                     |
| ------------------ | ----------------------------------------------- |
| `getTopStories`    | Fetch top stories (customizable limit)          |
| `getBestStories`   | Fetch best stories (customizable limit)         |
| `getNewStories`    | Fetch newest stories (customizable limit)       |
| `getAskHNStories`  | Fetch "Ask HN" posts                            |
| `getShowHNStories` | Fetch "Show HN" posts                           |
| `getJobStories`    | Fetch job postings                              |
| `getItem`          | Retrieve a specific item (story, comment, etc.) |
| `getUser`          | Retrieve a user profile by username             |
| `getComments`      | Fetch comments for a specific item              |
| `getMaxItemId`     | Get the current maximum item ID                 |
| `getUpdates`       | Fetch recently updated items and profiles       |

Check the code or inline documentation for supported arguments and usage examples for each tool.

---

> **Tip:**  
> Make sure you have [pnpm](https://pnpm.io/) installed for development setup.  
> You can substitute `npm` or `yarn` if you prefer, but `pnpm` is recommended for consistency.
