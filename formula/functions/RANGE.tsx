import { applyFormula, FunctionOperation } from "../formula";

export const template: FunctionOperation = {
  type: "function",
  name: "RANGE",
  arguments: [
    { formula: { type: "number", name: "Number", value: 0 } },
    { formula: { type: "number", name: "Number", value: 10 } },
  ],
  varArgs: false,
};

export const resolver = (f: FunctionOperation, input: any) => {
  const [first, last] = f.arguments.map((arg) =>
    Number(applyFormula(arg.formula, input))
  );
  const list = [];
  if (
    Number.isNaN(first) === false &&
    Number.isNaN(last) === false &&
    first <= last
  ) {
    for (let i = first; i <= last; i++) {
      list.push(i);
    }
  }
  return list;
};
