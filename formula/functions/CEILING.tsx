import { applyFormula, FunctionDeclaration } from "../formula";

export const CEILING: FunctionDeclaration = {
  template: {
    type: "function",
    name: "CEILING",
    arguments: [
      {
        name: "Input",
        formula: { type: "value", value: 1 },
      },
      {
        name: "Decimals",
        formula: { type: "value", value: 0 },
      },
    ],
  },
  resolver: (f, input) => {
    const a = applyFormula(f.arguments[0]?.formula, input);
    const b = applyFormula(f.arguments[1]?.formula, input);

    if (isNaN(a) || isNaN(b)) {
      return null;
    }
    const multiplier = Math.max(1, Math.pow(10, Number(b)));
    return Math.ceil(Number(a) * multiplier) / multiplier;
  },
};
