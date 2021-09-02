import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "DEFAULT",
  arguments: [
    { name: "Value", formula: { type: "null", name: "Null" } },
    {
      name: "Default",
      formula: { type: "string", name: "String", value: "default" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [value, defaultValue] = f.arguments.map((arg) =>
    applyFormula(arg?.formula, input)
  );
  return value ?? defaultValue;
};
