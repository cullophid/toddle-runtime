import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "NEQ",
  arguments: [
    { name: "First", formula: { type: "value", value: "" } },
    { name: "Second", formula: { type: "value", value: "" } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return (
    applyFormula(f.arguments[0]?.formula, input) !==
    applyFormula(f.arguments[1]?.formula, input)
  );
};

export const NEQ: FunctionDeclaration = { template, resolver };
