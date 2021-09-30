import { NodeData } from "ComponentModel";
import { Formula } from "../formula/formula";
import React from "react";
import ReactDom from "react-dom";
import { FormulaEditButton } from "./react-components/FormulaEditor";

export class FormulaEditor extends HTMLElement {
  _formula?: Formula;
  _nodeData?: NodeData;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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

  render() {
    ReactDom.render(
      <FormulaEditButton
        input={this.data}
        formula={this.formula}
        onChange={(formula) => {
          this.dispatchEvent(new CustomEvent("update", { detail: formula }));
        }}
      />,
      this.shadowRoot
    );
  }
}
