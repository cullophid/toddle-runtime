import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "REMOVE",
  arguments: [
    { name: "Object", formula: { type: "null", name: "Null" } },
    {
      name: "Key",
      formula: { type: "string", value: "Item" },
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
