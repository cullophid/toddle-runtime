import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formula } from "../../formula/formula";
import { clamp } from "lodash";
import { functions } from "../../formula/functions";

const functionOperations: Formula[] = Object.values(functions)
  .map((f) => f.template)
  .filter((f) => !(f.type === "function" && f.name === "ID"));

export type OperationSelectProps = {
  operation?: Formula;
  onChange: (operation: Formula) => void;
};

const getOperationName = (op: Formula): string => {
  switch (op.type) {
    case "boolean":
    case "number":
    case "string":
    case "null":
    case "record":
      return op.type;
    case "function":
      return op.name;
    case "path":
      return "data";
  }
};
const operations: Formula[] = [
  {
    type: "null",
  },
  {
    type: "path",
    path: [],
  },
  ...functionOperations,
];

export const OperationSelect = (props: OperationSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(
    props.operation?.type === "function" && props.operation.name === "ID"
  );

  useEffect(() => {
    if (props.operation?.type === "function" && props.operation.name === "ID") {
      setIsOpen(true);
    }
  }, [props.operation]);

  useEffect(() => {
    if (
      isOpen === false &&
      props.operation?.type === "function" &&
      props.operation.name === "ID"
    ) {
      props.onChange({
        type: "null",
      });
    }
  }, [isOpen]);

  const filteredOperations = operations.filter((op) => {
    switch (op.type) {
      case "boolean":
      case "number":
      case "string":
      case "null":
        return op.type.includes(inputValue.toLocaleLowerCase());
      case "function":
        return op.name.includes(inputValue.toLocaleUpperCase());
      case "path":
        return "data".includes(inputValue.toLocaleLowerCase());
    }
  });

  useEffect(() => setHighlightedIndex(0), [inputValue]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const onDocumentClick = () => {
      // isOpen && setIsOpen(false);
    };

    document.body.addEventListener("click", (e) => {
      onDocumentClick();
    });
    document.addEventListener("blur", () => {
      onDocumentClick();
    });
    return () => {
      document.body.removeEventListener("click", onDocumentClick);
      document.removeEventListener("blur", onDocumentClick);
    };
  }, [isOpen]);

  return (
    <div tabIndex={-1}>
      <button
        className="font-bold text-sm w-full text-left px-4 rounded-t h-10 border border-transparent focus:border-primary-300 focus:outline-none"
        ref={buttonRef}
        data-operation-type={props.operation?.type}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
          setInputValue("");
        }}
      >
        {props.operation ? getOperationName(props.operation) : ""}
      </button>

      {isOpen && (
        <div
          className="absolute z-20 translate-y-[-41px] w-full bg-grey-800 h-80 rounded grid grid-cols-1 grid-rows-[auto,1fr]"
          tabIndex={-1}
          onWheelCapture={(e: any) => {
            e.stopPropagation();
          }}
          onBlur={(e) => {
            setTimeout(() => setIsOpen(false), 100);
          }}
        >
          <input
            className="col-start-1 col-span-2 row-start-1 px-2 h-10 w-full text-bold text-sm text-grey-200 bg-transparent focus:outline-none border-none focus:border-boottom-1 border-primary-300"
            autoFocus={true}
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value ?? "")}
            onKeyDown={(e) => {
              switch (e.key) {
                case "ArrowDown":
                  return setHighlightedIndex((index) =>
                    clamp(index + 1, 0, filteredOperations.length - 1)
                  );
                case "ArrowUp":
                  return setHighlightedIndex((index) =>
                    clamp(index - 1, 0, filteredOperations.length - 1)
                  );
                case "Escape":
                case "Tab":
                  e.stopPropagation();
                  return setIsOpen(false);
                case "Enter": {
                  e.stopPropagation();
                  props.onChange(filteredOperations[highlightedIndex]);
                  setIsOpen(false);
                  setInputValue(
                    props.operation
                      ? getOperationName(props.operation) ?? ""
                      : ""
                  );
                  buttonRef.current?.focus();
                  return;
                }
              }
            }}
          />
          <ul className="grid auto-rows-[30px] overflow-auto">
            {filteredOperations.map((item, index) => (
              <li
                className="list-none w-full px-4 grid items-center cursor-pointer text-grey-300"
                key={getOperationName(item)}
                style={{
                  background:
                    highlightedIndex === index
                      ? "rgba(255 255 255 /10%)"
                      : "none",
                }}
                onMouseOver={() => setHighlightedIndex(index)}
                onClickCapture={(e) => {
                  props.onChange(item);
                  setIsOpen(false);
                  buttonRef.current?.focus();
                }}
              >
                {getOperationName(item)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
