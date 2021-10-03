import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "STRING",
  arguments: [{ formula: { type: "value", value: null } }],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  return String(applyFormula(f.arguments[0]?.formula, input));
};

export const STRING: FunctionDeclaration = { template, resolver };
