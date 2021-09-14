import React, { useMemo, useRef, useState } from "react";
import { NodeData } from "../../ComponentModel";
import {
  applyFormula,
  BooleanOperation,
  Formula,
  NumberOperation,
  StringOperation,
  valueToString,
} from "../../formula/formula";
import { useEffect } from "react";

type Props = {
  index: number;
  name: string;
  formula: Formula;
  onChange: (formula: Formula) => void;
  data: NodeData;
};

const getItems = (
  input: string
): Array<StringOperation | NumberOperation | BooleanOperation> => {
  const items: Array<StringOperation | NumberOperation | BooleanOperation> = [];
  if ("true".includes(input.toLocaleLowerCase())) {
    items.push({
      type: "boolean",
      name: "Boolean",
      value: true,
    });
  }
  if ("false".includes(input.toLocaleLowerCase())) {
    items.push({
      type: "boolean",
      name: "Boolean",
      value: false,
    });
  }
  if (input !== "" && Number.isNaN(Number(input)) === false) {
    items.push({
      type: "number",
      name: "Number",
      value: Number(input),
    });
  }
  items.push({
    type: "string",
    name: "String",
    value: input,
  });
  return items;
};

export const OperationArgInput = (props: Props) => {
  const isTouched = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(
    valueToString(applyFormula(props.formula, props.data))
  );
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  useEffect(() => {
    isTouched.current = false;
    setInputValue(valueToString(applyFormula(props.formula, props.data)));
  }, [props.formula]);

  const inputRef = useRef<HTMLInputElement>(null);
  const inputItems = useMemo(() => getItems(inputValue ?? ""), [inputValue]);
  const highlightedOperation = inputItems[highlightedIndex];
  return (
    <div className="relative">
      <label>{props.name}</label>
      <div>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => {
            isTouched.current = true;
            setInputValue(e.target.value);
          }}
          onClick={(e) => {
            e.nativeEvent.stopPropagation();
          }}
          onBlur={() => {
            if (highlightedOperation) {
              props.onChange(highlightedOperation);
            }
            setTimeout(() => setIsOpen(false), 100);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            switch (e.key) {
              case "ArrowDown":
                isTouched.current = true;
                setHighlightedIndex((highlightedIndex) =>
                  Math.min(inputItems.length - 1, highlightedIndex + 1)
                );
                break;
              case "ArrowUp":
                isTouched.current = true;
                setHighlightedIndex((highlightedIndex) =>
                  Math.max(0, highlightedIndex - 1)
                );
                break;
              case "Enter":
                if (highlightedOperation) {
                  props.onChange(highlightedOperation);
                }
                inputRef.current?.blur();
                break;
              case "Tab": {
                if (highlightedOperation && isTouched.current) {
                  props.onChange(highlightedOperation);
                }
                inputRef.current?.blur();
                break;
              }
              case "Escape": {
                setIsOpen(false);
                break;
              }
            }
          }}
          className="w-full bg-grey-700 px-2 rounded text-grey-200 border border-solid border-transparent focus:border-primary-300"
        />
      </div>
      <ul
        data-open={isOpen}
        onClick={(e) => e.stopPropagation()}
        className="absolute w-full bg-grey-700 shadow-sm z-10"
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              data-red
              key={`${item}${index}`}
              aria-selected={highlightedIndex === index}
              onClick={() => props.onChange(item)}
              className={`
                h-[50px] px-2 grid content-center text-grey-400
                ${
                  highlightedIndex === index
                    ? "text-grey-100 bg-grey-600 text-lg"
                    : "text-grey-400"
                }
              `}
            >
              <div className="text-grey-400 text-xs">{item.name}</div>
              {String(item.value)}
            </li>
          ))}
      </ul>
    </div>
  );
};
