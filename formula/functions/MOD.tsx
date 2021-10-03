import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "MOD",
  arguments: [
    {
      name: "First",
      formula: { type: "value", value: 1 },
    },
    {
      name: "Second",
      formula: { type: "value", value: 1 },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const a = applyFormula(f.arguments[0]?.formula, input);
  const b = applyFormula(f.arguments[1]?.formula, input);

  if (isNaN(a) || isNaN(b)) {
    return null;
  }
  return Number(a) % Number(b);
};

export const MOD: FunctionDeclaration = { template, resolver };
