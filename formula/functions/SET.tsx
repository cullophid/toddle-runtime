import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SET",
  arguments: [
    { name: "Object", formula: { type: "value", value: null } },
    {
      name: "Key",
      formula: { type: "value", value: "Item" },
    },
    {
      name: "Value",
      formula: { type: "value", value: "Item" },
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
export const SET: FunctionDeclaration = { template, resolver };
