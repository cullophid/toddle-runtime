import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SUM",
  arguments: [{ name: "List", formula: { type: "value", value: null } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const items = applyFormula(f.arguments[0]?.formula, input);
  return Array.isArray(items)
    ? items.reduce((result, item, index) => result + item)
    : null;
};

export const SUM: FunctionDeclaration = { template, resolver };
