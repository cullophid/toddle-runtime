import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "CONCAT",
  arguments: [
    { formula: { type: "string", name: "String", value: "" } },
    { formula: { type: "string", name: "String", value: "" } },
  ],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  return f.arguments.reduce(
    (result, item) => result + applyFormula(item.formula, input),
    ""
  );
};
