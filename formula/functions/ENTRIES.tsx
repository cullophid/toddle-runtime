import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "ENTRIES",
  arguments: [{ name: "Object", formula: { type: "null", name: "Null" } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const object = applyFormula(f.arguments[0]?.formula, input);
  if (typeof object === "object" && object !== null) {
    return Object.entries(object);
  }
  return null;
};
