import { FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "ID",
  arguments: [{ formula: { type: "null", name: "Null" } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  return input;
};
