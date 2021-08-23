import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SUBSTRING",
  arguments: [
    { formula: { type: "string", name: "String", value: "" } },
    { formula: { type: "number", name: "Number", value: 0 } },
    { formula: { type: "null", name: "Null" } },
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
