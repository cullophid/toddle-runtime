import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const CONCAT: FunctionDeclaration = {
  template: {
    type: "function",
    name: "CONCAT",
    arguments: [
      { formula: { type: "value", value: "" } },
      { formula: { type: "value", value: "" } },
    ],
    varArgs: true,
  },
  resolver: (f: FunctionOperation, input: any) => {
    return f.arguments.reduce(
      (result, item) => result + applyFormula(item.formula, input),
      ""
    );
  },
};
