import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "UPPER",
  arguments: [
    {
      name: "String",
      formula: { type: "string", name: "String", value: "string" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return String(
    applyFormula(f.arguments[0]?.formula, input)
  ).toLocaleUpperCase();
};
