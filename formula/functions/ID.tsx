import { FunctionDeclaration, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "ID",
  arguments: [{ formula: { type: "value", value: null } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return input;
};

export const ID: FunctionDeclaration = { template, resolver };
