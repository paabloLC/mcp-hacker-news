import { getCached, setCache } from "./helpers.js";
import { HackerNewsItem } from "./types-hn.js";

// *****************************************************
// *********** Hacker News MCP fetch actions ***********
// *****************************************************

// Function to fetch from API
export async function fetchFromAPI<T>(endpoint: string): Promise<T | null> {
  const cacheKey = endpoint;
  const cached = getCached<T>(cacheKey);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0${endpoint}.json`
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data = await response.json();
    setCache(cacheKey, data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

// Function to fetch multiple items
export async function fetchMultipleItems(
  ids: number[],
  maxItems = 30
): Promise<HackerNewsItem[]> {
  const limitedIds = ids.slice(0, maxItems);
  const promises = limitedIds.map((id) =>
    fetchFromAPI<HackerNewsItem>(`/item/${id}`)
  );
  const results = await Promise.all(promises);

  return results.filter(
    (item): item is HackerNewsItem =>
      item !== null && !item.deleted && !item.dead
  );
}
