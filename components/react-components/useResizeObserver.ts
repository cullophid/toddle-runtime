import { RefObject, useEffect, useRef, useState } from "react";

type Rect = {
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  bottom?: number;
  right?: number;
};
export default function useResizeObserver(elRef: RefObject<Element>) {
  const [rect, setRect] = useState<Rect>(
    elRef.current?.getBoundingClientRect() ?? {}
  );
  const observer = useRef(
    //@ts-ignore
    new ResizeObserver(([elem]) => {
      // Only care about the first element, we expect one element ot be watched

      setRect(elem.contentRect);
    })
  );
  useEffect(() => {
    if (elRef.current) {
      observer.current.observe(elRef.current);
    }
    return () => {
      elRef.current && observer.current?.unobserve(elRef.current);
    };
  }, [elRef, observer]);
  return rect;
}
