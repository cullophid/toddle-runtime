import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "NOT",
  arguments: [
    {
      name: "Input",
      formula: { type: "value", value: true },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return !applyFormula(f.arguments[0]?.formula, input);
};

export const NOT: FunctionDeclaration = { template, resolver };
