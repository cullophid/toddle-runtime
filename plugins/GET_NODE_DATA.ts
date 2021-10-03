import { NodeData } from "../ComponentModel";
import { applyFormula, FunctionOperation } from "../formula/formula";
import { NodeModel } from "../NodeModel";

window.toddle.formulas.GET_NODE_DATA = {
  template: {
    type: "function",
    name: "GET_NODE_DATA",
    arguments: [
      {
        name: "Root",
        formula: {
          type: "value",
          value: null,
        },
      },
      {
        name: "NodeId",
        formula: {
          type: "value",
          value: "",
        },
      },
      {
        name: "Data",
        formula: {
          type: "value",
          value: null,
        },
      },
    ],
  },
  resolver: (f: FunctionOperation, data: NodeData): NodeData | undefined => {
    const [root, nodeId, formulaData] = f.arguments.map((arg) =>
      applyFormula(arg.formula, data)
    );
    const visitNode = (
      node: NodeModel,
      data: NodeData,
      [nextChild, ...path]: number[]
    ): NodeData => {
      switch (node.type) {
        case "element": {
          const repeat = applyFormula(node.repeat, data);
          const [ListItem] = Array.isArray(repeat) ? repeat : [];
          const newData = ListItem ? { ...data, ListItem } : data;
          if (path.length === 0) {
            return newData;
          }
          const child = node.children[nextChild];
          if (child) {
            return visitNode(child, newData, path);
          }
          return newData;
        }
        default: {
          return data;
        }
      }
    };
    if (
      typeof root?.type !== "string" ||
      typeof nodeId !== "string" ||
      typeof formulaData?.Variables !== "object"
    ) {
      debugger;
      return data;
    }
    const res = visitNode(
      root,
      formulaData,
      nodeId.split(".").map(Number).slice(1)
    );
    return res;
  },
};
