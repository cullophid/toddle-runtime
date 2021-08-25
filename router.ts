import { signal } from "./signal";

export const parseQuery = (queryString: string) =>
  Object.fromEntries(
    queryString
      .replace("?", "")
      .split("&")
      .filter((pair) => pair !== "")
      .map((pair: string) => {
        return pair.split("=").map(decodeURIComponent);
      })
  );

export const stringifyQuery = (query: Record<string, unknown>) =>
  Object.entries(query)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    )
    .join("&");

export const locationSignal = signal({
  query: parseQuery(window.location.search),
  path: window.location.pathname,
});

const urlSignal = locationSignal.map(
  ({ query, path }) =>
    `${path}?${Object.entries(query)
      .map(([key, value]) => {
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          String(value)
        )}`;
      })
      .join("&")}`
);
urlSignal.subscribe((url) => {
  window.history.replaceState({}, "", url);
});
