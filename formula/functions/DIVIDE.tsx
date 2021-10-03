import { applyFormula, FunctionDeclaration } from "../formula";
export const DIVIDE: FunctionDeclaration = {
  template: {
    type: "function",
    name: "DIVIDE",
    arguments: [
      {
        name: "First",
        formula: { type: "value", value: 1 },
      },
      {
        name: "Second",
        formula: { type: "value", value: 1 },
      },
    ],
  },
  resolver: (f, input) => {
    const a = applyFormula(f.arguments[0]?.formula, input);
    const b = applyFormula(f.arguments[1]?.formula, input);

    if (isNaN(a) || isNaN(b)) {
      return null;
    }
    return Number(a) / Number(b);
  },
};
