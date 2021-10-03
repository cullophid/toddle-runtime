import { NodeData } from "../ComponentModel";
import { applyFormula, FunctionOperation } from "../formula/formula";
import { getNode, NodeModel } from "../NodeModel";

window.toddle.formulas.GET_NODE = {
  template: {
    type: "function",
    name: "GET_NODE",
    arguments: [
      {
        name: "Root",
        formula: {
          type: "value",
          value: null,
        },
      },
      {
        name: "Id",
        formula: {
          type: "value",
          value: "",
        },
      },
    ],
  },
  resolver: (f: FunctionOperation, data: NodeData) => {
    const [root, id] = f.arguments.map((arg) =>
      applyFormula(arg.formula, data)
    );
    if (
      typeof root === "object" &&
      root?.hasOwnProperty("type") &&
      typeof id === "string"
    ) {
      return getNode(root as NodeModel, id);
    }
  },
};
