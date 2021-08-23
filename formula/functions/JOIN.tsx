import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "JOIN",
  arguments: [
    { name: "List", formula: { type: "null", name: "Null" } },
    {
      name: "Separator",
      formula: { type: "string", name: "String", value: ", " },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const list = applyFormula(f.arguments[0]?.formula, input);
  return Array.isArray(list)
    ? list.join(String(applyFormula(f.arguments[1]?.formula, input)))
    : "";
};
