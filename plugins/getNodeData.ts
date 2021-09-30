import { NodeData } from "../ComponentModel";
import { applyFormula } from "../formula/formula";
import { NodeModel } from "../NodeModel";

window.toddle.formulas.getNodeData = (
  root: NodeModel | undefined,
  nodeId: string | undefined,
  data: NodeData | undefined
): NodeData | undefined => {
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
    typeof data?.Variables !== "object"
  ) {
    return data;
  }
  return visitNode(root, data, nodeId.split(".").map(Number).slice(1));
};
