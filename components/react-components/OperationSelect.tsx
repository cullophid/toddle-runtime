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

export const OperationSelect = (props: OperationSelectProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(
    props.operation?.type === "function" && props.operation.name === "ID"
  );

  const operations: Formula[] = [
    {
      type: "null",
      name: "None",
    },
    {
      type: "path",
      name: "Data",
      path: [],
    },
    ...functionOperations,
  ];

  useEffect(() => {
    if (props.operation?.name === "ID") {
      setIsOpen(true);
    }
  }, [props.operation?.name]);
  useEffect(() => {
    if (isOpen === false && props.operation?.name === "ID") {
      props.onChange({
        type: "null",
        name: "null",
      });
    }
  }, [isOpen]);

  const filteredOperations = useMemo(
    () =>
      operations.filter((op) =>
        op.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
      ),
    [operations, inputValue]
  );

  useEffect(() => setHighlightedIndex(0), [filteredOperations]);

  const highlightedOperation = filteredOperations[highlightedIndex];

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
        {props.operation?.name ?? ""}
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
            onChange={(e) => setInputValue(e.target.value)}
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
                  setInputValue(props.operation?.name ?? "");
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
                key={item.name}
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
                {item.name}
              </li>
            ))}
          </ul>
          {highlightedOperation?.description && (
            <div
              className={`
              absolute right-0 top-0 
              h-full w-80 p-4 
              overflow-auto 
              bg-grey-800 text-grey-200
              rounded-r 
              shadow-md 
              translate-x-full 
              border-0
              border-l-2
              border-grey-700
              documentation
            `}
            >
              {highlightedOperation.description}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
