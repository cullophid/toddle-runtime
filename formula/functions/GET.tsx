import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "GET",
  arguments: [
    {
      name: "Collection",
      formula: { type: "null", name: "Null" },
    },
    {
      name: "Item",
      formula: { type: "string", name: "String", value: "Item" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [object, item] = f.arguments.map((arg) =>
    applyFormula(arg.formula, input)
  );

  if (typeof object === "object" && object !== null) {
    return object[item];
  }
};
