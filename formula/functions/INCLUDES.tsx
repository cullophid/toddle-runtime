import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "INCLUDES",
  arguments: [
    { name: "String", formula: { type: "string", name: "String", value: "" } },
    {
      name: "Sub String",
      formula: { type: "string", name: "String", value: "" },
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
