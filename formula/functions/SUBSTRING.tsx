import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SUBSTRING",
  arguments: [
    { formula: { type: "value", value: "" } },
    { formula: { type: "value", value: 0 } },
    { formula: { type: "value", value: null } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [inputString, startIndex, endIndex] = f.arguments.map((arg) =>
    applyFormula(arg.formula, input)
  );
  return typeof inputString === "string"
    ? inputString.slice(startIndex, endIndex)
    : null;
};

export const SUBSTRING: FunctionDeclaration = { template, resolver };
