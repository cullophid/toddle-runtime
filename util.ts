export const isObject = (input: any): input is Record<string, any> =>
  typeof input === "object" && input !== null;

export const mapObject = <T, T2>(
  object: Record<string, T>,
  f: (kv: [string, T]) => [string, T2]
): Record<string, T2> => Object.fromEntries(Object.entries(object).map(f));

export const mapValues = <T, T2>(
  object: Record<string, T>,
  f: (value: T) => T2
): Record<string, T2> => mapObject(object, ([key, value]) => [key, f(value)]);

export const omit = (object: Object, keys: string[]) =>
  Object.fromEntries(
    Object.entries(object).filter(([k]) => keys.includes(k) === false)
  );

export const groupBy = <T>(items: T[], f: (t: T) => string) =>
  items.reduce<Record<string, T[]>>((acc, item) => {
    const key = f(item);
    acc[key] = acc[key] ?? [];
    acc[key].push(item);
    return acc;
  }, {});

export const last = <T>(items: T[]) => items[items.length - 1];
