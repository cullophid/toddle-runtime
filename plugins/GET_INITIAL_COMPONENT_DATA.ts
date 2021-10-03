import { ComponentModel, NodeData } from "../ComponentModel";
import { applyFormula, FunctionOperation } from "../formula/formula";

window.toddle.formulas.GET_INITIAL_COMPONENT_DATA = {
  template: {
    type: "function",
    name: "GET_INITIAL_COMPONENT_DATA",
    arguments: [
      {
        name: "Component",
        formula: { type: "value", value: null },
      },
    ],
  },
  resolver: (f, data) => {
    const component: ComponentModel = applyFormula(
      f.arguments[0]?.formula,
      data
    );
    if (!component.id || !component.name || !component.root) {
      return;
    }
    const Props = Object.fromEntries(
      component.props.map((prop) => [prop.name, prop.initialValue])
    );
    const Functions = Object.fromEntries(
      component.functions?.map((f) => [f.name, f.value]) ?? []
    );
    const Variables = Object.fromEntries(
      component.variables.map((variable) => [
        variable.name,
        applyFormula(variable.initialValue, { Props, Functions }),
      ])
    );
    return {
      Props,
      Variables,
      Functions,
    };
  },
};
