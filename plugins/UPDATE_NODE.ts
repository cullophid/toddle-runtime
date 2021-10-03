import { NodeData } from "ComponentModel";
import { applyFormula, FunctionOperation } from "../formula/formula";
import { updateNode, NodeModel } from "../NodeModel";

window.toddle.formulas.UPDATE_NODE = {
  template: {
    type: "function",
    name: "UPDATE_NODE",
    arguments: [
      {
        name: "Root",
        formula: { type: "value", value: null },
      },
      {
        name: "Id",
        formula: { type: "value", value: null },
      },
      {
        name: "Node",
        formula: { type: "value", value: null },
      },
    ],
  },
  resolver: (f: FunctionOperation, data: NodeData) => {
    const [root, id, node] = f.arguments.map((arg) =>
      applyFormula(arg.formula, data)
    );
    if (
      typeof root === "object" &&
      root?.hasOwnProperty("type") &&
      typeof node === "object" &&
      node?.hasOwnProperty("type") &&
      typeof id === "string"
    ) {
      return updateNode(root as NodeModel, id, () => node);
    }
  },
};
