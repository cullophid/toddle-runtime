import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Formula } from "../../formula/formula";

import { ResultNode } from "./Operation";
import { ComponentModel, NodeData } from "../../ComponentModel";
import { useZoomPlane } from "./useZoomPlane";
import { useKey } from "./useKey";
import useResizeObserver from "./useResizeObserver";

import * as Dialog from "@radix-ui/react-dialog";

const moveExpression = (
  formula: Formula | undefined,
  oldId: string,
  newId: string
) => {
  if (!formula) {
    return;
  }
  const oldPath = oldId.split(".").map(Number).slice(1);
  const newPath = newId.split(".").map(Number).slice(1);
  const findExp = (
    formula: Formula,
    [current, ...path]: number[]
  ): Formula | undefined => {
    if (formula.type !== "function") {
      return;
    }
    if (path.length === 0) {
      return formula.arguments[current]?.formula;
    }
    if (formula.arguments[current]?.formula) {
      return findExp(formula.arguments[current].formula, path);
    } else {
      return undefined;
    }
  };
  const removeExp = (
    formula: Formula,
    [current, ...path]: number[]
  ): Formula => {
    if (formula.type !== "function") {
      return formula;
    }
    if (path.length === 0) {
      return {
        ...formula,
        arguments: [
          ...formula.arguments.slice(0, current),
          {
            ...formula.arguments[current],
            formula: { type: "null", name: "Null" },
          },
          ...formula.arguments.slice(current + 1),
        ],
      };
    }
    return {
      ...formula,
      arguments: formula.arguments.map((a, i) =>
        i === current ? { ...a, formula: removeExp(a.formula, path) } : a
      ),
    };
  };

  const insertExp = (
    formula: Formula,
    [current, ...path]: number[],
    expression: Formula
  ): Formula => {
    if (formula.type !== "function") {
      return formula;
    }
    if (path.length === 0) {
      return {
        ...formula,
        arguments: [
          ...formula.arguments.slice(0, current),
          {
            ...formula.arguments[current],
            formula: expression,
          },
          ...formula.arguments.slice(current + 1),
        ],
      };
    }
    return {
      ...formula,
      arguments: formula.arguments.map((a, i) =>
        i === current
          ? { ...a, formula: insertExp(a.formula, path, expression) }
          : a
      ),
    };
  };

  const exp = findExp(formula, oldPath);
  if (exp) {
    return insertExp(removeExp(formula, oldPath), newPath, exp);
  } else {
    return formula;
  }
};

type FormulaEditButtonProps = {
  formula?: Formula;
  component: ComponentModel;
  input: any;
  onChange: (formula?: Formula) => void;
  disabled?: boolean;
  size?: number;
  title?: string;
  style?: CSSProperties;
  className?: string;
};

export const FormulaEditButton = (props: FormulaEditButtonProps) => {
  const { title = "Edit Formula" } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
          setIsOpen(false);
        }
        if (e.key !== "z") {
          e.stopPropagation();
        }
      }}
      className={props.className}
      style={props.style}
    >
      <Dialog.Root open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
        <Dialog.Trigger
          onClick={(e) => e.stopPropagation()}
          className="border border-transparent rounded focus:border-primary-300 text-grey-200 text-xs"
        >
          Fx
        </Dialog.Trigger>
        <Dialog.Overlay />
        <Dialog.Content
          className={`
            w-full h-full flex-1 
            fixed 
            rounded-none 
            grid grid-rows-[auto,1fr] grid-cols-1
            bg-grey-700 
          `}
        >
          <header className="h-10 bg-grey-800 flex justify-between items-center px-4 text-grey-200">
            {title}
            <Dialog.Close>Close</Dialog.Close>
          </header>
          <FormulaEditor
            component={props.component}
            formula={props.formula}
            onChange={props.onChange}
            data={props.input}
          />
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

type Props = {
  formula: Formula | undefined;
  component: ComponentModel;
  onChange: (formula: Formula | undefined) => void;
  onHide: () => void;
  data: NodeData;
};

export const FormulaEditor = (props: Omit<Props, "onHide">) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const spaceKey = useKey(" ");
  useEffect(() => {
    setTimeout(() => ref.current?.focus(), 100);
  }, []);
  useZoomPlane({
    ref,
    onPan: useCallback(
      ({ x, y }) => {
        setOffset((offset) => ({
          x: offset.x + x,
          y: offset.y + y,
        }));
      },
      [setOffset]
    ),
  });

  return (
    <div
      className="relative overflow-hidden border-t-2 border-grey-800"
      ref={ref}
      tabIndex={-1}
      id="container"
      style={{
        cursor: spaceKey ? "grab" : "default",
      }}
    >
      <div
        className="p-8 min-h-full min-w-full left-0 top-0 absolute origin-center font-sans grid place-content-center bg-grey-700"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        <Lines check={props.formula} />

        <ResultNode
          component={props.component}
          operation={props.formula ?? { type: "path", name: "Data", path: [] }}
          path="0"
          onChange={props.onChange}
          data={props.data}
        />
      </div>
    </div>
  );
};

export type Point = { path: string; x: number; y: number };

export const Line = (props: { from: Point; to: Point }) => {
  const { from, to } = props;
  const curve = Math.max(
    Math.abs(from.x - to.x) * 0.5,
    Math.abs(from.y - to.y) / 5
  );

  return (
    <path
      className="stroke-current text-grey-500 stroke-2"
      fill="none"
      shapeRendering="optimizeQuality"
      d={`M ${from.x} ${from.y} C ${from.x + curve} ${from.y}, ${
        to.x - curve
      } ${to.y}, ${to.x} ${to.y}`}
    />
  );
};

export const Lines = (props: { check: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver(ref);
  const [lines, setLines] = useState<{ from: Point; to: Point }[]>([]);

  useLayoutEffect(() => {
    setLines([]);
    document.querySelectorAll("[data-node-output]").forEach((elem) => {
      const path = elem.getAttribute("data-node-output");
      const parentRect = ref.current?.getBoundingClientRect();
      const rect = elem.getBoundingClientRect();
      const targetRect = document
        .querySelector(`[data-node-input="${path}"]`)
        ?.getBoundingClientRect();
      if (!path || !rect || !targetRect || !parentRect) {
        return;
      }
      setLines((lines) => [
        ...lines,
        {
          from: {
            path,
            x: rect.left + rect.width / 2 - parentRect.left,
            y: rect.top + rect.height / 2 - parentRect.top,
          },
          to: {
            path,
            x:
              targetRect.left +
              targetRect.width / 2 -
              targetRect.width / 2 -
              parentRect.left,
            y: targetRect.top + targetRect.height / 2 - parentRect.top,
          },
        },
      ]);
    });
  }, [props.check, width, height]);

  return (
    <div ref={ref} className="absolute w-full h-full">
      <svg
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {lines.map((line, i) => (
          <Line key={i} {...line} />
        ))}
      </svg>
    </div>
  );
};
