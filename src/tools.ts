import { fetchFromAPI, fetchMultipleItems } from "./fetch-actions.js";
import { formatTime } from "./helpers.js";
import {
  HackerNewsItem,
  HackerNewsUser,
  HackerNewsUpdates,
} from "./types-hn.js";

// *****************************************************
// *********** Hacker News MCP Tools ***********
// *****************************************************

export const tools = [
  {
    name: "getTopStories",
    description: "Get top stories from Hacker News (up to 500 available)",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of stories to return (default: 10, max: 50)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 50);
      const topIds = await fetchFromAPI<number[]>("/topstories");

      if (!topIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch top stories" }),
            },
          ],
        };
      }

      const stories = await fetchMultipleItems(topIds, limit);
      const formattedStories = stories.map((story) => ({
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score,
        author: story.by,
        comments: story.descendants || 0,
        time: story.time ? formatTime(story.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${story.id}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Top ${limit} stories from Hacker News`,
                stories: formattedStories,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getBestStories",
    description: "Get best stories from Hacker News (algorithmically ranked)",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of stories to return (default: 10, max: 50)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 50);
      const bestIds = await fetchFromAPI<number[]>("/beststories");

      if (!bestIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch best stories" }),
            },
          ],
        };
      }

      const stories = await fetchMultipleItems(bestIds, limit);
      const formattedStories = stories.map((story) => ({
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score,
        author: story.by,
        comments: story.descendants || 0,
        time: story.time ? formatTime(story.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${story.id}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Best ${limit} stories from Hacker News`,
                stories: formattedStories,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getNewStories",
    description: "Get newest stories from Hacker News",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of stories to return (default: 10, max: 50)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 50);
      const newIds = await fetchFromAPI<number[]>("/newstories");

      if (!newIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch new stories" }),
            },
          ],
        };
      }

      const stories = await fetchMultipleItems(newIds, limit);
      const formattedStories = stories.map((story) => ({
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score,
        author: story.by,
        comments: story.descendants || 0,
        time: story.time ? formatTime(story.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${story.id}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Latest ${limit} stories from Hacker News`,
                stories: formattedStories,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getAskHNStories",
    description: "Get Ask HN stories",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of stories to return (default: 10, max: 30)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 30);
      const askIds = await fetchFromAPI<number[]>("/askstories");

      if (!askIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch Ask HN stories" }),
            },
          ],
        };
      }

      const stories = await fetchMultipleItems(askIds, limit);
      const formattedStories = stories.map((story) => ({
        id: story.id,
        title: story.title,
        score: story.score,
        author: story.by,
        comments: story.descendants || 0,
        time: story.time ? formatTime(story.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${story.id}`,
        text: story.text,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Latest ${limit} Ask HN stories`,
                stories: formattedStories,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getShowHNStories",
    description: "Get Show HN stories",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of stories to return (default: 10, max: 30)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 30);
      const showIds = await fetchFromAPI<number[]>("/showstories");

      if (!showIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                error: "Failed to fetch Show HN stories",
              }),
            },
          ],
        };
      }

      const stories = await fetchMultipleItems(showIds, limit);
      const formattedStories = stories.map((story) => ({
        id: story.id,
        title: story.title,
        url: story.url,
        score: story.score,
        author: story.by,
        comments: story.descendants || 0,
        time: story.time ? formatTime(story.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${story.id}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Latest ${limit} Show HN stories`,
                stories: formattedStories,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getJobStories",
    description: "Get job postings from Hacker News",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "number",
          description: "Number of jobs to return (default: 10, max: 30)",
          default: 10,
        },
      },
    },
    execute: async (args: any) => {
      const limit = Math.min(args.limit || 10, 30);
      const jobIds = await fetchFromAPI<number[]>("/jobstories");

      if (!jobIds) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch job stories" }),
            },
          ],
        };
      }

      const jobs = await fetchMultipleItems(jobIds, limit);
      const formattedJobs = jobs.map((job) => ({
        id: job.id,
        title: job.title,
        url: job.url,
        score: job.score,
        author: job.by,
        time: job.time ? formatTime(job.time) : "unknown",
        hnUrl: `https://news.ycombinator.com/item?id=${job.id}`,
        text: job.text,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Latest ${limit} job postings`,
                jobs: formattedJobs,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getItem",
    description: "Get a specific item (story, comment, job, etc.) by ID",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The item ID to fetch",
        },
      },
      required: ["id"],
    },
    execute: async (args: any) => {
      const item = await fetchFromAPI<HackerNewsItem>(`/item/${args.id}`);

      if (!item) {
        return {
          content: [
            { type: "text", text: JSON.stringify({ error: "Item not found" }) },
          ],
        };
      }

      const formattedItem = {
        id: item.id,
        type: item.type,
        title: item.title,
        url: item.url,
        score: item.score,
        author: item.by,
        time: item.time ? formatTime(item.time) : "unknown",
        comments: item.descendants || 0,
        text: item.text,
        parent: item.parent,
        kids: item.kids,
        hnUrl: `https://news.ycombinator.com/item?id=${item.id}`,
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Item ${args.id}`,
                item: formattedItem,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getUser",
    description: "Get user profile information",
    inputSchema: {
      type: "object",
      properties: {
        username: {
          type: "string",
          description: "The username to look up",
        },
      },
      required: ["username"],
    },
    execute: async (args: any) => {
      const user = await fetchFromAPI<HackerNewsUser>(`/user/${args.username}`);

      if (!user) {
        return {
          content: [
            { type: "text", text: JSON.stringify({ error: "User not found" }) },
          ],
        };
      }

      const formattedUser = {
        id: user.id,
        karma: user.karma,
        created: user.created ? formatTime(user.created) : "unknown",
        about: user.about,
        submittedCount: user.submitted?.length || 0,
        recentSubmissions: user.submitted?.slice(0, 10) || [],
      };

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `User profile for ${args.username}`,
                user: formattedUser,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getComments",
    description: "Get comments for a specific item",
    inputSchema: {
      type: "object",
      properties: {
        id: {
          type: "number",
          description: "The item ID to fetch comments for",
        },
        depth: {
          type: "number",
          description: "Maximum depth of comments to fetch (default: 2)",
          default: 2,
        },
      },
      required: ["id"],
    },
    execute: async (args: any) => {
      const item = await fetchFromAPI<HackerNewsItem>(`/item/${args.id}`);

      if (!item || !item.kids) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "No comments found" }),
            },
          ],
        };
      }

      const depth = Math.min(args.depth || 2, 3);
      const comments = await fetchMultipleItems(item.kids, 20);

      const formattedComments = comments.map((comment) => ({
        id: comment.id,
        author: comment.by,
        time: comment.time ? formatTime(comment.time) : "unknown",
        text: comment.text,
        parent: comment.parent,
        kids: comment.kids?.length || 0,
        hnUrl: `https://news.ycombinator.com/item?id=${comment.id}`,
      }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: `Comments for item ${args.id}`,
                totalComments: item.descendants || 0,
                topLevelComments: formattedComments.length,
                comments: formattedComments,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getMaxItemId",
    description: "Get the current maximum item ID",
    inputSchema: { type: "object", properties: {} },
    execute: async (args: any) => {
      const maxId = await fetchFromAPI<number>("/maxitem");

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: "Current maximum item ID",
                maxItemId: maxId,
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
  {
    name: "getUpdates",
    description: "Get recently updated items and profiles",
    inputSchema: { type: "object", properties: {} },
    execute: async (args: any) => {
      const updates = await fetchFromAPI<HackerNewsUpdates>("/updates");

      if (!updates) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ error: "Failed to fetch updates" }),
            },
          ],
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                message: "Recent updates",
                recentlyUpdatedItems: updates.items.slice(0, 10),
                recentlyUpdatedProfiles: updates.profiles.slice(0, 10),
              },
              null,
              2
            ),
          },
        ],
      };
    },
  },
];
