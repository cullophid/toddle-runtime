import { ComponentModel, NodeData } from "ComponentModel";
import { applyFormula, isFormula } from "../formula/formula";
import { ElementNodeModel } from "NodeModel";
import React from "react";
import ReactDom from "react-dom";
import { FormulaEditButton } from "./react-components/FormulaEditor";
import InputGroup from "./react-components/InputGroup";
import InputLabel from "./react-components/InputLabel";
import Input from "./react-components/Input";
import { SectionHeader, SectionTitle } from "./react-components/PanelSection";
import { AttributeSection } from "./react-components/AttributesSection";

type AttributePanelProps = {
  node: ElementNodeModel;
  component: ComponentModel;
  onChange: (node: ElementNodeModel) => void;
  nodeData: NodeData;
};
const AttributePanel = (props: AttributePanelProps) => {
  const { node, onChange, nodeData } = props;
  const repeatList =
    node?.type === "element" && node.repeat
      ? applyFormula(node.repeat, nodeData)
      : undefined;
  const listItem = Array.isArray(repeatList) ? repeatList[0] : undefined;
  return (
    <div className="p-2">
      <div className="flex flex-col gap-2">
        <InputGroup className="!justify-between">
          <InputLabel>Show</InputLabel>
          <FormulaEditButton
            key="visibility"
            input={
              node.repeat
                ? {
                    ...nodeData,
                    ListItem: { Item: listItem, Index: 0 },
                  }
                : nodeData
            }
            title="Edit display condition"
            size={16}
            formula={node.condition}
            onChange={(formula) =>
              onChange({
                ...node,
                condition: formula?.type !== "null" ? formula : undefined,
              })
            }
          />
        </InputGroup>
        <InputGroup className="!justify-between">
          <InputLabel>Repeat</InputLabel>
          <FormulaEditButton
            input={nodeData}
            key="repeat"
            title="Edit repeat condition"
            size={18}
            formula={node.repeat}
            onChange={(formula) =>
              onChange({
                ...node,
                repeat: formula?.type !== "null" ? formula : undefined,
              })
            }
          />
        </InputGroup>

        <InputGroup className="!justify-between">
          <InputLabel>Tag</InputLabel>
          <Input
            value={node.tag}
            onChange={(tag) => onChange({ ...node, tag })}
          />
        </InputGroup>
      </div>

      <AttributeSection
        node={node}
        component={props.component}
        updateNode={onChange}
        nodeData={nodeData}
      />
    </div>
  );
};

export class ElementAttributes extends HTMLElement {
  _node?: ElementNodeModel;
  _nodeData?: NodeData;
  _component?: ComponentModel;
  constructor() {
    super();
    this.render();
  }
  get node() {
    return this._node;
  }
  set node(node: ElementNodeModel | undefined) {
    this._node = node;
    this.render();
  }
  get nodeData() {
    return this._nodeData;
  }
  set nodeData(nodeData: NodeData | undefined) {
    this._nodeData = nodeData;
    this.render();
  }
  get component() {
    return this._component;
  }
  set component(component) {
    this._component = component;
    this.render();
  }

  render() {
    if (this.component && this.node && this.nodeData) {
      ReactDom.render(
        <AttributePanel
          nodeData={this.nodeData}
          node={this.node}
          component={this.component}
          onChange={(node) => {
            this.dispatchEvent(new CustomEvent("update", { detail: node }));
          }}
        />,
        this
      );
    }
  }
}
