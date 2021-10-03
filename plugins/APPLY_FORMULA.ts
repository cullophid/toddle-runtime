import { NodeData } from "../ComponentModel";
import { applyFormula, Formula, FunctionOperation } from "../formula/formula";

window.toddle.formulas.APPLY_FORMULA = {
  template: {
    type: "function",
    name: "APPLY_FORMULA",
    arguments: [
      { name: "Formula", formula: { type: "value", value: null } },
      {
        name: "Data",
        formula: { type: "value", value: null },
      },
    ],
  },
  resolver: (f, data) => {
    const [formula, formulaData] = f.arguments.map((arg) =>
      applyFormula(arg.formula, data)
    );
    if (
      formula?.hasOwnProperty("type") &&
      typeof formula.type === "string" &&
      formulaData?.hasOwnProperty("Props") &&
      typeof formulaData.Props === "object"
    ) {
      return applyFormula(formula as Formula, formulaData as NodeData);
    }
  },
};
