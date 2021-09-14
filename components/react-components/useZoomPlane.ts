import { RefObject, useEffect, useState } from "react";
import { useKey } from "./useKey";

export type ZoomPlaneConfig = {
  ref: RefObject<HTMLElement>;
  onPan: (pan: { x: number; y: number }) => void;
  onZoom?: (zoom: number, event: WheelEvent) => void;
};
export const useZoomPlane = (config: ZoomPlaneConfig) => {
  const { ref, onZoom, onPan } = config;
  const spaceKey = useKey(" ");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const mouseup = () => {
      setDragging(false);
    };

    const mousedown = (e: MouseEvent) => {
      if (spaceKey) {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
      }
    };

    const mousemove = (e: MouseEvent) => {
      if (!dragging) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      onPan({
        x: e.movementX,
        y: e.movementY,
      });
    };
    const mousewheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        onZoom?.(-e.deltaY * 0.005, e);
      } else {
        onPan({
          x: -e.deltaX,
          y: -e.deltaY,
        });
      }
    };
    ref.current.addEventListener("mousemove", mousemove);
    ref.current.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);

    ref.current.addEventListener("wheel", mousewheel, {
      passive: false,
    });
    return () => {
      ref.current?.removeEventListener("mousemove", mousemove);
      ref.current?.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);

      ref.current?.removeEventListener("wheel", mousewheel);
    };
  }, [ref.current, spaceKey, dragging, onZoom, onPan]);
};
