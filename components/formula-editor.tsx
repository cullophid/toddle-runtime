import { ComponentModel, NodeData } from "ComponentModel";
import { Formula } from "../formula/formula";
import React from "react";
import ReactDom from "react-dom";
import { FormulaEditButton } from "./react-components/FormulaEditor";

export class FormulaEditor extends HTMLElement {
  _formula?: Formula;
  _nodeData?: NodeData;
  _component?: ComponentModel;
  constructor() {
    super();
    this.render();
  }
  get formula() {
    return this._formula;
  }
  set formula(formula: Formula | undefined) {
    console.log("SET FORMULA", formula);
    this._formula = formula;
    this.render();
  }
  get data() {
    return this._nodeData;
  }
  set data(nodeData: NodeData | undefined) {
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
    console.log("FORMULA", this.formula);
    if (this.component && this.data) {
      ReactDom.render(
        <FormulaEditButton
          input={this.data}
          formula={this.formula}
          component={this.component}
          onChange={(formula) => {
            this.dispatchEvent(new CustomEvent("update", { detail: formula }));
          }}
        />,
        this
      );
    }
  }
}
