import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";

const KeysContext = createContext<Set<string>>(new Set());

export const KeysProvider = (props: { children: ReactNode }) => {
  const [keys, setKeys] = useState<Set<string>>(new Set());
  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (e.repeat === false) {
        setKeys(new Set(keys).add(e.key));
      }
    };
    const keyUp = (e: KeyboardEvent) => {
      const newSet = new Set(keys);
      newSet.delete(e.key);
      setKeys(newSet);
    };
    document.addEventListener("keydown", keyDown, true);
    document.addEventListener("keyup", keyUp, true);
    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
    };
  }, []);

  return (
    <KeysContext.Provider value={keys}>{props.children}</KeysContext.Provider>
  );
};

export const useKey = (key: string) => {
  const keys = useContext(KeysContext);
  return keys.has(key);
};
