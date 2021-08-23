import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SQRT",
  arguments: [
    {
      name: "Number",
      formula: { type: "number", name: "Number", value: 1 },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const n = applyFormula(f.arguments[0]?.formula, input);

  if (isNaN(n)) {
    return null;
  }
  return Math.sqrt(Number(n));
};
