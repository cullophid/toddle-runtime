import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "SPLIT",
  arguments: [
    { name: "Input", formula: { type: "value", value: "" } },
    {
      name: "Delimiter",
      formula: { type: "value", value: "" },
    },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [inputString, delimiter] = f.arguments.map((arg) =>
    applyFormula(arg.formula, input)
  );
  if (typeof inputString === "string") {
    return inputString.split(String(delimiter));
  }
  return inputString;
};
export const SPLIT: FunctionDeclaration = { template, resolver };
