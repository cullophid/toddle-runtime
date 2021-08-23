import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "REDUCE",
  arguments: [
    { name: "List", formula: { type: "null", name: "Null" } },
    { name: "Fx", formula: { type: "null", name: "Null" } },
    { name: "Init", formula: { type: "null", name: "Null" } },
  ],
};

export const resolver = (f: FunctionOperation, input: any) => {
  const items = applyFormula(f.arguments[0]?.formula, input);
  return Array.isArray(items)
    ? items.reduce(
        (result, item, index) =>
          applyFormula(f.arguments[1]?.formula, {
            ...input,
            Args: {
              result,
              item,
              index,
            },
          }),
        applyFormula(f.arguments[2]?.formula, input)
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
    ? {
        ...input,
        Args: {
          item: items[0],
          index: 0,
          result: applyFormula(f.arguments[2].formula, input),
        },
      }
    : input;
};
