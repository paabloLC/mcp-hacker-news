// *****************************************************
// *********** Hacker News API Types ***********
// *****************************************************

export interface HackerNewsItem {
  id: number;
  deleted?: boolean;
  type?: "job" | "story" | "comment" | "poll" | "pollopt";
  by?: string;
  time?: number;
  text?: string;
  dead?: boolean;
  parent?: number;
  poll?: number;
  kids?: number[];
  url?: string;
  score?: number;
  title?: string;
  parts?: number[];
  descendants?: number;
}

export interface HackerNewsUser {
  id: string;
  created?: number;
  karma?: number;
  about?: string;
  submitted?: number[];
}

export interface HackerNewsUpdates {
  items: number[];
  profiles: string[];
}
