import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const EQ: FunctionDeclaration = {
  template: {
    type: "function",
    name: "EQ",
    arguments: [
      { name: "First", formula: { type: "value", value: "" } },
      { name: "Second", formula: { type: "value", value: "" } },
    ],
  },
  resolver: (f: FunctionOperation, input: any) => {
    return (
      applyFormula(f.arguments[0]?.formula, input) ===
      applyFormula(f.arguments[1]?.formula, input)
    );
  },
};
