import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const DEFAULT: FunctionDeclaration = {
  template: {
    type: "function",
    name: "DEFAULT",
    arguments: [
      { name: "Value", formula: { type: "value", value: null } },
      {
        name: "Default",
        formula: { type: "value", value: "default" },
      },
    ],
  },
  resolver: (f: FunctionOperation, input: any) => {
    const [value, defaultValue] = f.arguments.map((arg) =>
      applyFormula(arg?.formula, input)
    );
    return value ?? defaultValue;
  },
};
