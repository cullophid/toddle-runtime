import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "COUNT",
  arguments: [{ name: "List", formula: { type: "null", name: "Null" } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const list = applyFormula(f.arguments[0]?.formula, input);
  return Array.isArray(list) ? list.length : null;
};
