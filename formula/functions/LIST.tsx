import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "LIST",
  arguments: [{ formula: { type: "string", name: "String", value: "Item 1" } }],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  return f.arguments.map((arg) => applyFormula(arg.formula, input));
};
