import { applyFormula, FunctionDeclaration } from "../formula";

export const BOOLEAN: FunctionDeclaration = {
  template: {
    type: "function",
    name: "BOOLEAN",
    arguments: [
      {
        name: "Input",
        formula: { type: "value", value: "1" },
      },
    ],
  },
  resolver: (f, data) => {
    return Boolean(applyFormula(f.arguments[0]?.formula, data));
  },
};
