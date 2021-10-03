import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "NUMBER",
  arguments: [
    {
      name: "Input",
      formula: { type: "value", value: "1" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return Number(applyFormula(f.arguments[0]?.formula, input));
};

export const NUMBER: FunctionDeclaration = { template, resolver };
