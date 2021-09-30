import { updateNode, NodeModel } from "../NodeModel";

window.toddle.formulas.updateNode = (
  root: unknown,
  id: unknown,
  node: NodeModel
) => {
  if (
    typeof root === "object" &&
    root?.hasOwnProperty("type") &&
    typeof node === "object" &&
    node?.hasOwnProperty("type") &&
    typeof id === "string"
  ) {
    return updateNode(root as NodeModel, id, () => node);
  }
};
