import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "IF",
  arguments: [
    { name: "If", formula: { type: "null", name: "Null" } },
    { name: "Then", formula: { type: "string", name: "String", value: "" } },
    { name: "Else", formula: { type: "string", name: "String", value: "" } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return applyFormula(f.arguments[0]?.formula, input)
    ? applyFormula(f.arguments[1]?.formula, input)
    : applyFormula(f.arguments[2]?.formula, input);
};
