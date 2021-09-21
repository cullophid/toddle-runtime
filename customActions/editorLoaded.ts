import { applyFormula } from "../formula/formula";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { ComponentContext, createMutation, createQuery } from "../runtime";
import { locationSignal } from "../router";
import { cloneNode, deleteNode, insertNodeTree } from "../NodeModel";
import { parseHtml } from "./parseHtml";

export const editorLoaded = (data: unknown, ctx: ComponentContext) => {
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
  console.log("VARIABLES", { Props, Functions, Variables });

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
    console.log({ componentData });

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
    ctx.mutations.updateComponent?.({
      update_Component_by_pk___set__name: component.name,
      update_Component_by_pk___set__nodes: component.nodes,
      update_Component_by_pk___set__props: component.props,
      update_Component_by_pk___set__events: component.events,
      update_Component_by_pk__pk_columns__id: component.id,
      update_Component_by_pk___set__functions: component.functions,
      update_Component_by_pk___set__variables: component.variables,
    });
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
          nodes: deleteNode(component.nodes, selectedNodeId),
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
        console.log("ADD", selectedNodeId);
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
    try {
      const nodeTree = JSON.parse(paste);

      if (
        Object.values(nodeTree).every((node: any) =>
          ["component", "element", "fragment", "text"].includes(node?.type)
        )
      ) {
        const nodes = insertNodeTree(component.nodes, nodeTree, selectedNodeId);
        updateComponent({
          ...component,
          nodes,
        });
      }
    } catch (e) {
      const newNodes = parseHtml(paste);
      if (newNodes.length === 0) {
        return;
      }
      const nodes = newNodes.reduce((acc, nodeTree) => {
        return insertNodeTree(acc, nodeTree, selectedNodeId);
      }, component.nodes);
      updateComponent({
        ...component,
        nodes,
      });
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
    const subTree = cloneNode(component.nodes, selectedNodeId);
    const text = navigator.clipboard.writeText(JSON.stringify(subTree));
  };
  const cutHandler = (event: ClipboardEvent) => {
    event.preventDefault();
    console.log("CUT");
    const selectedNodeId = ctx.dataSignal.get().Variables.selectedNodeId;
    const component = ctx.dataSignal.get().Variables.component as
      | ComponentModel
      | undefined;

    if (typeof selectedNodeId !== "string" || !component) {
      return;
    }
    const subTree = cloneNode(component.nodes, selectedNodeId);
    const text = navigator.clipboard.writeText(JSON.stringify(subTree));

    const nodes = deleteNode(component.nodes, selectedNodeId);
    updateComponent({ ...component, nodes });
  };

  document.addEventListener("paste", pasteHandler);
  document.addEventListener("copy", copyHandler);
  document.addEventListener("cut", cutHandler);
};
