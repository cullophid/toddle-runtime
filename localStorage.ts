export const getItem = <T>(key: string): T | undefined => {
  try {
    return JSON.parse(localStorage.getItem(key)!);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const setItem = (key: string, item: any) =>
  localStorage.setItem(key, JSON.stringify(item));
