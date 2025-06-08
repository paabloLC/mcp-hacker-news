import { fetchFromAPI, fetchMultipleItems } from "./fetch-actions.js";

// *****************************************************
// *********** Hacker News MCP Resources ***********
// *****************************************************

export const resources = [
  {
    uri: "hackernews://top",
    name: "top-stories",
    get: async () => {
      const topIds = await fetchFromAPI<number[]>("/topstories");
      if (!topIds)
        return { contents: [{ uri: "hackernews://top", text: "[]" }] };

      const stories = await fetchMultipleItems(topIds, 30);
      return {
        contents: [
          {
            uri: "hackernews://top",
            text: JSON.stringify(stories, null, 2),
          },
        ],
      };
    },
  },
  {
    uri: "hackernews://new",
    name: "new-stories",
    get: async () => {
      const newIds = await fetchFromAPI<number[]>("/newstories");
      if (!newIds)
        return { contents: [{ uri: "hackernews://new", text: "[]" }] };

      const stories = await fetchMultipleItems(newIds, 30);
      return {
        contents: [
          {
            uri: "hackernews://new",
            text: JSON.stringify(stories, null, 2),
          },
        ],
      };
    },
  },
  {
    uri: "hackernews://best",
    name: "best-stories",
    get: async () => {
      const bestIds = await fetchFromAPI<number[]>("/beststories");
      if (!bestIds)
        return { contents: [{ uri: "hackernews://best", text: "[]" }] };

      const stories = await fetchMultipleItems(bestIds, 30);
      return {
        contents: [
          {
            uri: "hackernews://best",
            text: JSON.stringify(stories, null, 2),
          },
        ],
      };
    },
  },
];
