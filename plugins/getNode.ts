import { getNode, NodeModel } from "../NodeModel";

window.toddle.formulas.getNode = (root: unknown, id: unknown) => {
  if (
    typeof root === "object" &&
    root?.hasOwnProperty("type") &&
    typeof id === "string"
  ) {
    return getNode(root as NodeModel, id);
  }
};
