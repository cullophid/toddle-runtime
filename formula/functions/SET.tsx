import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SET",
  arguments: [
    { name: "Object", formula: { type: "null", name: "Null" } },
    {
      name: "Key",
      formula: { type: "string", name: "String", value: "Item" },
    },
    {
      name: "Value",
      formula: { type: "string", name: "String", value: "Item" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [object, key, value] = f.arguments.map((arg) =>
    applyFormula(arg?.formula, input)
  );
  if (typeof object === "object" && object !== null) {
    return { ...object, [key]: value };
  }
  return null;
};
