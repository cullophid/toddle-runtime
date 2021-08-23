import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "FROM_ENTRIES",
  arguments: [{ name: "List", formula: { type: "null", name: "Null" } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return Object.fromEntries(applyFormula(f.arguments[0]?.formula, input));
};
