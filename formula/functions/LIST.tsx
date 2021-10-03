import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "LIST",
  arguments: [{ formula: { type: "value", value: "Item 1" } }],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  return f.arguments.map((arg) => applyFormula(arg.formula, input));
};

export const LIST: FunctionDeclaration = { template, resolver };
