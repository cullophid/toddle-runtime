import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "INCLUDES",
  arguments: [
    { name: "String", formula: { type: "value", value: "" } },
    {
      name: "Sub String",
      formula: { type: "value", value: "" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const baseString = applyFormula(f.arguments[0]?.formula, input);
  const subString = applyFormula(f.arguments[1]?.formula, input);
  return typeof baseString === "string" && typeof subString === "string"
    ? baseString.includes(subString)
    : null;
};

export const INCLUDES: FunctionDeclaration = { template, resolver };
