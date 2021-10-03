import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "OR",
  arguments: [
    {
      name: "First",
      formula: { type: "value", value: true },
    },
    {
      name: "Second",
      formula: { type: "value", value: true },
    },
  ],
};
export const resolver = (f: FunctionOperation, input: any) => {
  return (
    isTruthy(applyFormula(f.arguments[0]?.formula, input)) ||
    isTruthy(applyFormula(f.arguments[0]?.formula, input))
  );
};

const isTruthy = (value: any) => {
  return value !== false && value !== undefined && value !== null;
};

export const OR: FunctionDeclaration = { template, resolver };
