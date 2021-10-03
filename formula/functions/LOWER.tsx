import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "LOWER",
  arguments: [
    {
      name: "String",
      formula: { type: "value", value: "string" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return String(
    applyFormula(f.arguments[0]?.formula, input)
  ).toLocaleLowerCase();
};

export const LOWER: FunctionDeclaration = { template, resolver };
