import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "CUSTOM_FUNCTION",
  arguments: [
    {
      name: "Function",
      formula: { type: "string", value: "" },
    },
    { name: "Input", formula: { type: "null", name: "Null" } },
  ],
  varArgs: true,
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [functionName, ...args] = f.arguments.map((arg) =>
    applyFormula(arg.formula, input)
  );
  const func = window.toddle.formulas?.[functionName];
  if (typeof func === "function") {
    return func(...args);
  }
  console.error("COULD NOT FIND CUSTOM FUNCTION ", functionName);
  return null;
};
