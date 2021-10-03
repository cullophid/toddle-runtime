import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const COUNT: FunctionDeclaration = {
  template: {
    type: "function",
    name: "COUNT",
    arguments: [{ name: "List", formula: { type: "value", value: null } }],
  },
  resolver: (f: FunctionOperation, input: any) => {
    const list = applyFormula(f.arguments[0]?.formula, input);
    return Array.isArray(list) ? list.length : null;
  },
};
