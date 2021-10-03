import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";
export const ENTRIES: FunctionDeclaration = {
  template: {
    type: "function",
    name: "ENTRIES",
    arguments: [{ name: "Object", formula: { type: "value", value: null } }],
  },
  resolver: (f: FunctionOperation, input: any) => {
    const object = applyFormula(f.arguments[0]?.formula, input);
    if (typeof object === "object" && object !== null) {
      return Object.entries(object).map(([key, value]) => ({ key, value }));
    }
    return null;
  },
};
