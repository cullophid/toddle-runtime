import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "GET",
  arguments: [
    {
      name: "Collection",
      formula: { type: "value", value: null },
    },
    {
      name: "Item",
      formula: { type: "value", value: "Item" },
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

export const GET: FunctionDeclaration = { template, resolver };
