import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "IF",
  arguments: [
    { name: "If", formula: { type: "value", value: null } },
    { name: "Then", formula: { type: "value", value: "" } },
    { name: "Else", formula: { type: "value", value: "" } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return applyFormula(f.arguments[0]?.formula, input)
    ? applyFormula(f.arguments[1]?.formula, input)
    : applyFormula(f.arguments[2]?.formula, input);
};

export const IF: FunctionDeclaration = { template, resolver };
