import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "EQ",
  arguments: [
    { name: "First", formula: { type: "string", value: "", name: "String" } },
    { name: "Second", formula: { type: "string", value: "", name: "String" } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return (
    applyFormula(f.arguments[0]?.formula, input) ===
    applyFormula(f.arguments[1]?.formula, input)
  );
};
