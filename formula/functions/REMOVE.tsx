import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "REMOVE",
  arguments: [
    { name: "Object", formula: { type: "value", value: null } },
    {
      name: "Key",
      formula: { type: "value", value: "Item" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [object, key, value] = f.arguments.map((arg) =>
    applyFormula(arg?.formula, input)
  );
  if (
    typeof object === "object" &&
    object !== null &&
    typeof key === "string"
  ) {
    return Object.fromEntries(
      Object.entries(object).filter(([k, v]) => k !== key)
    );
  }
  return null;
};

export const REMOVE: FunctionDeclaration = { template, resolver };
