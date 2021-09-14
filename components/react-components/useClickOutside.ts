import { useEffect, useRef } from "react";

export const useClickOutside = (f: (e: Event) => void) => {
  const ref = useRef<(e: Event) => void>(f);
  useEffect(() => {
    ref.current = f;
  }, [f]);

  useEffect(() => {
    const handler = (e: Event) => {
      ref.current?.(e);
    };
    document.body.addEventListener("click", handler);
    document.addEventListener("blur", handler);
    return () => {
      document.body.removeEventListener("click", handler);
      document.removeEventListener("blur", handler);
    };
  }, []);
};
