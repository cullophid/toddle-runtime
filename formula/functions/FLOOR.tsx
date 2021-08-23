import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "FLOOR",
  arguments: [
    {
      name: "Input",
      formula: { type: "number", name: "Number", value: 1 },
    },
    {
      name: "Decimals",
      formula: { type: "number", name: "Number", value: 0 },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const a = applyFormula(f.arguments[0]?.formula, input);
  const b = applyFormula(f.arguments[1]?.formula, input);

  if (isNaN(a) || isNaN(b)) {
    return null;
  }
  const multiplier = Math.max(1, Math.pow(10, Number(b)));
  return Math.floor(Number(a) * multiplier) / multiplier;
};
