import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "STRING",
  arguments: [{ formula: { type: "null", name: "NULL" } }],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  return String(applyFormula(f.arguments[0]?.formula, input));
};
