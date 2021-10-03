import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "FROM_ENTRIES",
  arguments: [{ name: "List", formula: { type: "value", value: null } }],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const list = applyFormula(f.arguments[0]?.formula, input);
  if (Array.isArray(list) && list.every(Array.isArray)) {
    return Object.fromEntries(applyFormula(f.arguments[0]?.formula, input));
  } else {
    return null;
  }
};

export const FROM_ENTRIES: FunctionDeclaration = { template, resolver };
