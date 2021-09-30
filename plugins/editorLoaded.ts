import { applyFormula } from "../formula/formula";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { ComponentContext, createMutation, createQuery } from "../runtime";
import { locationSignal } from "../router";
import { parseHtml } from "./parseHtml";
import { getNode, insertNode, removeNode } from "../NodeModel";

window.toddle.actions.editorLoaded = (data: unknown, ctx: ComponentContext) => {
  const component = ctx.dataSignal.get().Variables?.component as ComponentModel;
  if (!component) {
    console.error("Editor Loaded Action: Could not find component");
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

  ctx.dataSignal.set({
    ...ctx.dataSignal.get(),
    Variables: {
      ...ctx.dataSignal.get().Variables,
      componentData: {
        Props,
        Variables,
        Functions,
      },
    },
  });

  const componentDataSignal = ctx.dataSignal.map<ComponentData>(
    (data) => data.Variables.componentData as ComponentData
  );
  const mutations: Record<string, Function> = {};
  component.queries.forEach((query) => {
    if (query.type === "mutation") {
      mutations[query.name] = createMutation(query, {
        component,
        dataSignal: componentDataSignal,
        mutations,
        isRootComponent: true,
        onEvent: console.info,
      });
    } else {
      createQuery(query, {
        component,
        dataSignal: componentDataSignal,
        isRootComponent: false,
        mutations,
        onEvent: console.info,
      });
    }
  });

  componentDataSignal.subscribe((componentData) => {
    const data = ctx.dataSignal.get();

    ctx.dataSignal.set({
      ...data,
      Variables: {
        ...data.Variables,
        componentData: {
          ...(typeof data.Variables.componentData === "object"
            ? data.Variables.componentData
            : {}),
          Queries: componentData.Queries ?? {},
          Mutations: componentData.Mutations ?? {},
        },
      },
    });
  });
  const updateComponent = (component: ComponentModel) => {
    ctx.dataSignal.set({
      ...ctx.dataSignal.get(),
      Variables: {
        ...ctx.dataSignal.get().Variables,
        component,
      },
    });
    // ctx.mutations.updateComponent?.({
    //   update_Component_by_pk___set__name: component.name,
    //   update_Component_by_pk___set__nodes: component.root,
    //   update_Component_by_pk___set__props: component.props,
    //   update_Component_by_pk___set__events: component.events,
    //   update_Component_by_pk__pk_columns__id: component.id,
    //   update_Component_by_pk___set__functions: component.functions,
    //   update_Component_by_pk___set__variables: component.variables,
    // });
  };

  document.addEventListener("keydown", (event) => {
    const data = ctx.dataSignal.get();
    const { selectedNodeId } = data.Variables;
    switch (event.key) {
      case "Backspace": {
        const component = data.Variables.component as
          | ComponentModel
          | undefined;
        const selectedNodeId = data.Variables.selectedNodeId;
        if (!component || typeof selectedNodeId !== "string") {
          return;
        }
        const updatedComponent = {
          ...component,
          root: removeNode(component.root, selectedNodeId),
        };
        updateComponent(updatedComponent);
        break;
      }
      case "Escape": {
        ctx.dataSignal.set({
          ...data,
          Variables: {
            ...data.Variables,
            selectedNodeId: undefined,
          },
        });
        break;
      }
      case "a": {
        break;
      }
      case "1": {
        locationSignal.set({
          ...locationSignal.get(),
          query: {
            ...locationSignal.get().query,
            view: "design",
          },
        });
        break;
      }
      case "2": {
        locationSignal.set({
          ...locationSignal.get(),
          query: {
            ...locationSignal.get().query,
            view: "data",
          },
        });
        break;
      }
      case "3": {
        locationSignal.set({
          ...locationSignal.get(),
          query: {
            ...locationSignal.get().query,
            view: "preview",
          },
        });
        break;
      }
    }
  });

  const pasteHandler = (event: ClipboardEvent) => {
    const paste = event.clipboardData?.getData("text");
    if (!paste) {
      return;
    }
    const selectedNodeId = ctx.dataSignal.get().Variables.selectedNodeId;
    const component = ctx.dataSignal.get().Variables.component as
      | ComponentModel
      | undefined;

    if (typeof selectedNodeId !== "string" || !component) {
      return;
    }
    const selectedNode = getNode(component.root, selectedNodeId);
    if (
      !selectedNode ||
      ["component", "element"].includes(selectedNode.type) === false
    ) {
      return;
    }
    try {
      const node = JSON.parse(paste);
      switch (selectedNode?.type) {
        case "component":
        case "element": {
          const id = selectedNodeId + "." + selectedNode.children.length;
          const root = insertNode(component.root, id, node);

          updateComponent({
            ...component,
            root,
          });
        }
      }
    } catch (e) {
      const nodes = parseHtml(paste);
      if (nodes.length === 0) {
        return;
      }
      switch (selectedNode?.type) {
        case "component":
        case "element": {
          const root = nodes.reduce((root, node, i) =>
            insertNode(
              root,
              selectedNodeId + "." + (selectedNode.children.length + i),
              node
            )
          );

          updateComponent({
            ...component,
            root,
          });
        }
      }
    }
  };

  const copyHandler = (event: ClipboardEvent) => {
    event.preventDefault();
    const selectedNodeId = ctx.dataSignal.get().Variables.selectedNodeId;
    const component = ctx.dataSignal.get().Variables.component as
      | ComponentModel
      | undefined;

    if (typeof selectedNodeId !== "string" || !component) {
      return;
    }
    const node = getNode(component.root, selectedNodeId);
    navigator.clipboard.writeText(JSON.stringify(node));
  };
  const cutHandler = (event: ClipboardEvent) => {
    event.preventDefault();
    const selectedNodeId = ctx.dataSignal.get().Variables.selectedNodeId;
    const component = ctx.dataSignal.get().Variables.component as
      | ComponentModel
      | undefined;

    if (typeof selectedNodeId !== "string" || !component) {
      return;
    }
    const subTree = getNode(component.root, selectedNodeId);
    navigator.clipboard.writeText(JSON.stringify(subTree));

    updateComponent({
      ...component,
      root: removeNode(component.root, selectedNodeId),
    });
  };

  document.addEventListener("paste", pasteHandler);
  document.addEventListener("copy", copyHandler);
  document.addEventListener("cut", cutHandler);
};
