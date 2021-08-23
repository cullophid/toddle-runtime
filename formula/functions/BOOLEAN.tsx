import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "BOOLEAN",
  arguments: [
    {
      name: "Input",
      formula: { type: "string", name: "String", value: "1" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return Boolean(applyFormula(f.arguments[0]?.formula, input));
};
