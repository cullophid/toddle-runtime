import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "AND",
  arguments: [
    {
      name: "First",
      formula: { type: "boolean", name: "Boolean", value: true },
    },
    {
      name: "Second",
      formula: { type: "boolean", name: "Boolean", value: true },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return (
    isTruthy(applyFormula(f.arguments[0]?.formula, input)) &&
    isTruthy(applyFormula(f.arguments[0]?.formula, input))
  );
};

const isTruthy = (value: any) => {
  return value !== false && value !== undefined && value !== null;
};
