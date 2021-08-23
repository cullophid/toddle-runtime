import { ReactNode } from "react";
import { functions } from "./functions";

export type PathOperation = {
  type: "path";
  name: string;
  path: string[];
  description?: ReactNode;
};

export type FunctionArgument = {
  name?: string;
  formula: Formula;
};

export type FunctionOperation = {
  type: "function";
  name: string;
  arguments: FunctionArgument[];
  varArgs?: boolean;
  description?: ReactNode;
};

export type ApplyFunctionOperation = {
  type: "apply_function";
  functionId: string;
  name: string;
  description?: ReactNode;
};

export type NumberOperation = {
  type: "number";
  name: "Number";
  value: number;
  description?: ReactNode;
};

export type StringOperation = {
  type: "string";
  name: "String";
  value: string;
  description?: ReactNode;
};

export type BooleanOperation = {
  type: "boolean";
  name: "Boolean";
  value: boolean;
  description?: ReactNode;
};

export type NullOperation = {
  type: "null";
  name: string;
  description?: ReactNode;
};

export type Formula =
  | FunctionOperation
  | PathOperation
  | NumberOperation
  | StringOperation
  | BooleanOperation
  | NullOperation
  | ApplyFunctionOperation;

export const isFormula = (f: any): f is Formula => {
  return typeof f === "object" && f.type;
};

export const applyFormula = (
  formula: Formula | string | number | undefined | boolean,
  input: any
): any => {
  if (!isFormula(formula)) {
    return formula;
  }
  switch (formula.type) {
    case "number":
    case "string":
    case "boolean":
      return formula.value;
    case "path":
      return formula.path.reduce(
        (input, key) =>
          input && typeof input === "object" ? input[key] : null,
        input
      );
    case "function":
      return functions[formula.name]?.resolver(formula, input);
    case "null":
      return null;
  }
};

export const valueToString = (item: any): string => {
  if (item === null || item === undefined) {
    return "Null";
  }
  if (Array.isArray(item)) {
    return `[ ${item.slice(0, 1).map(valueToString)}${
      item.length > 1 ? ", ..." : ""
    } ]`;
  }
  if (typeof item === "object") {
    const keys = Object.keys(item).filter((k) => k.indexOf("__") !== 0);
    return `{ ${keys.slice(0, 3).join(", ")}${
      keys.length > 3 ? ", ..." : ""
    } }`;
  }
  return String(item);
};
