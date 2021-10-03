import { NodeData } from "ComponentModel";
import "./functions/index";

export type PathOperation = {
  type: "path";
  path: string[];
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
};

export type RecordEntry = {
  name: string;
  value: Formula;
};

export type RecordOperation = {
  type: "record";
  entries: FunctionArgument[];
};

export type ValueOperation = {
  type: "value";
  value: string | number | boolean | null | object;
};

export type Formula =
  | FunctionOperation
  | RecordOperation
  | PathOperation
  | ValueOperation;

export type FunctionDeclaration = {
  template: FunctionOperation;
  resolver: (f: FunctionOperation, data: NodeData) => unknown;
  getArgumentInputData?: (
    f: FunctionOperation,
    argIndex: number,
    input: any
  ) => NodeData;
};

export const isFormula = (f: any): f is Formula => {
  return f && typeof f === "object" && f.type;
};

export const applyFormula = (
  formula: Formula | string | number | undefined | boolean,
  input: any
): any => {
  if (!isFormula(formula)) {
    return formula;
  }
  switch (formula.type) {
    case "value":
      return formula.value;
    case "path": {
      if (formula.path[0] === "Functions") {
        const [, functionName, ...rest] = formula.path;
        const f = input.Functions[functionName];
        return rest.reduce(
          (input, key) =>
            input && typeof input === "object" ? input[key] : null,
          applyFormula(f, input)
        );
      }
      return formula.path.reduce(
        (input, key) =>
          input && typeof input === "object" ? input[key] : null,
        input
      );
    }
    case "function": {
      const func = window.toddle.formulas[formula.name];
      if (func) {
        return func?.resolver(formula, input);
      }
      return;
    }
    case "record":
      return Object.fromEntries(
        formula.entries.map((entry) => [
          entry.name,
          applyFormula(entry.formula, input),
        ])
      );
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
