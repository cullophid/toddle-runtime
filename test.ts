import { ComponentModel } from "./ComponentModel";

import { Canvas } from "./components/canvas";
import { applyFormula } from "./formula/formula";
import { StyleEditor } from "./components/style-editor";
import { ElementCatalog } from "./components/element-catalog/element-catalog";
import { exampleComponent } from "./components/element-catalog/exampleComponent";

declare global {
  interface Window {
    TODDLE_FUNCTIONS: Record<string, Function>;
  }
}

window.TODDLE_FUNCTIONS = window.TODDLE_FUNCTIONS || {};

const main = () => {
  customElements.define("canvas-iframe", Canvas, {});
  customElements.define("style-editor", StyleEditor, {});
  customElements.define("element-catalog", ElementCatalog, {});

  const catalog = document.createElement("element-catalog");
  (catalog as any).selectedNodeId = "ROOT";
  (catalog as any).component = exampleComponent;
  document.body.appendChild(catalog);
};

main();

(window as any).TODDLE_FUNCTIONS.getInitialComponentData = (
  component: ComponentModel
) => {
  const Props = Object.fromEntries(
    component.props.map((prop) => [prop.name, prop.initialValue])
  );
  const Variables = Object.fromEntries(
    component.variables.map((variable) => [
      variable.name,
      applyFormula(variable.initialValue, { Props }),
    ])
  );
  return {
    Props,
    Variables,
  };
};
