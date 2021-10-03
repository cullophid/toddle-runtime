import {
  applyFormula,
  FunctionDeclaration,
  FunctionOperation,
} from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "FILTER",
  arguments: [
    { name: "List", formula: { type: "value", value: null } },
    { name: "Fx", formula: { type: "value", value: null } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const items = applyFormula(f.arguments[0]?.formula, input);
  return Array.isArray(items)
    ? items.filter((item, index) =>
        applyFormula(f.arguments[1]?.formula, {
          ...input,
          Args: {
            item,
            index,
          },
        })
      )
    : null;
};

export const getArgumentInputData = (
  f: FunctionOperation,
  argIndex: number,
  input: any
) => {
  if (argIndex === 0) {
    return input;
  }
  const items = applyFormula(f.arguments[0].formula, input);

  return Array.isArray(items)
    ? { ...input, Args: { item: items[0], index: 0 } }
    : input;
};

export const FILTER: FunctionDeclaration = {
  template,
  resolver,
  getArgumentInputData,
};
