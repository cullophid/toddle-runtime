import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const AND: FunctionDeclaration = {
  template: {
    type: "function",
    name: "AND",
    arguments: [
      {
        name: "First",
        formula: { type: "value", value: true },
      },
      {
        name: "Second",
        formula: { type: "value", value: true },
      },
    ],
  },
  resolver: (f, data) => {
    return (
      isTruthy(applyFormula(f.arguments[0]?.formula, data)) &&
      isTruthy(applyFormula(f.arguments[0]?.formula, data))
    );
  },
};

const isTruthy = (value: any) => {
  return value !== false && value !== undefined && value !== null;
};
