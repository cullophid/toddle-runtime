import { ComponentModel } from "../ComponentModel";
import { applyFormula } from "../formula/formula";

window.toddle.formulas.getInitialComponentData = (
  component: ComponentModel
) => {
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
};
