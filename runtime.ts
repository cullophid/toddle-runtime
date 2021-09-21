import { mapObject, mapValues } from "./util";
import {
  ComponentData,
  ComponentModel,
  ComponentQuery,
  NodeData,
} from "./ComponentModel";
import { ActionModel } from "./EventModel";
import { applyFormula, isFormula } from "./formula/formula";
import {
  ComponentNodeModel,
  ElementNodeModel,
  FragmentNodeModel,
  NodeModel,
  TextNodeModel,
} from "./NodeModel";
import { print as printQuery } from "graphql/language/printer";
import { signal, Signal } from "./signal";
import { locationSignal, stringifyQuery } from "./router";
import { debounce, throttle } from "lodash";

export const createQuery = (
  query: ComponentQuery,
  ctx: ComponentContext
): (() => void) => {
  const variablesSignal = ctx.dataSignal.map((data) => {
    return mapValues(query.variables, (value) =>
      applyFormula(value.value, data)
    );
  });
  const execute = (variables: Record<string, unknown>) => {
    ctx.dataSignal.set({
      ...ctx.dataSignal.value,
      Queries: {
        ...ctx.dataSignal.value.Queries,
        [query.name]: {
          data: ctx.dataSignal.value.Queries?.[query.name]?.data ?? null,
          isLoading: true,
          error: null,
        },
      },
    });
    const api = window.toddle.project?.apis.find(
      (api) => api.id === query._api
    );
    if (!api) {
      console.error("Error: could not find api for query ", query.name);
      return;
    }

    fetch(api.url, {
      method: "POST",
      headers: mapObject(api.headers, ([header, value]) => [
        header,
        applyFormula(value, ctx.dataSignal.value),
      ]),
      body: JSON.stringify({
        query: printQuery(query.documentNode as any),
        variables,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Error");
      })
      .then((res) => {
        ctx.dataSignal.set({
          ...ctx.dataSignal.value,
          Queries: {
            ...ctx.dataSignal.value.Queries,
            [query.name]: {
              data: res.data,
              isLoading: false,
              error: res.error,
            },
          },
        });
        query.onCompleted?.actions?.forEach((action) => {
          handleAction(action, ctx.dataSignal.value, ctx);
        });
      })
      .catch((error) => {
        console.error("Error", query.name, error);
        query.onFailed?.actions?.forEach((action) => {
          handleAction(action, ctx.dataSignal.value, ctx);
        });
      });
  };
  const trigger =
    typeof query.debounce === "number"
      ? debounce(execute, query.debounce)
      : typeof query.throttle === "number"
      ? throttle(execute, query.throttle)
      : execute;

  variablesSignal.subscribe((variables) => {
    if (
      !query.condition ||
      applyFormula(query.condition, ctx.dataSignal.get())
    ) {
      trigger(variables);
    }
  });
  return () => variablesSignal.destroy();
};
export const createMutation = (
  query: ComponentQuery,
  ctx: ComponentContext
) => {
  const triggerFunction = (variables: Record<string, any>) => {
    ctx.dataSignal.set({
      ...ctx.dataSignal.value,
      Mutations: {
        ...ctx.dataSignal.value.Mutations,
        [query.name]: {
          ...(ctx.dataSignal.value.Mutations?.[query.name] ?? {
            data: null,
            __trigger,
            error: null,
          }),
          isLoading: true,
        },
      },
    });
    const api = window.toddle.project?.apis.find(
      (api) => api.id === query._api
    );
    if (!api) {
      console.error("Error: could not find api for query ", query.name);
      return;
    }

    return fetch(api.url, {
      method: "POST",
      headers: mapObject(api.headers, ([header, value]) => [
        header,
        applyFormula(value, ctx.dataSignal.value),
      ]),
      body: JSON.stringify({
        query: printQuery(query.documentNode as any),
        variables,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else throw new Error("Error");
      })
      .then((res) => {
        ctx.dataSignal.set({
          ...ctx.dataSignal.value,
          Mutations: {
            ...ctx.dataSignal.value.Mutations,
            [query.name]: {
              data: res.data,
              isLoading: false,
              error: res.error,
            },
          },
        });
      });
  };
  const __trigger =
    typeof query.debounce === "number"
      ? debounce(triggerFunction, query.debounce)
      : typeof query.throttle === "number"
      ? throttle(triggerFunction, query.throttle)
      : triggerFunction;

  ctx.dataSignal.set({
    ...ctx.dataSignal.value,
    Mutations: {
      ...ctx.dataSignal.value.Mutations,
      [query.name]: {
        data: null,
        isLoading: false,
        error: null,
      },
    },
  });
  return __trigger;
};

export type ComponentContext = {
  component: ComponentModel;
  isRootComponent: boolean;
  dataSignal: Signal<ComponentData>;
  onEvent: (event: string, data: unknown) => void;
  mutations: Record<string, Function>;
};

export type ActionContext = {
  dataSignal: Signal<NodeData>;
  updateVariables: (
    update: (variables: Record<string, unknown>) => Record<string, unknown>
  ) => void;
  mutations: Record<string, Function>;
};

type RenderComponentProps = {
  parent: Element;
  component: ComponentModel;
  attributesSignal: Signal<Record<string, any>>;
  onEvent: (event: string, data: unknown) => void;
  isRootComponent: boolean;
};
export const renderComponent = ({
  parent,
  component,
  attributesSignal,
  onEvent,
  isRootComponent,
}: RenderComponentProps): (() => void) => {
  const cleanUp: Function[] = [];

  const dataSignal = signal<ComponentData>({
    Variables: Object.fromEntries(
      component.variables.map((variable) => [
        variable.name,
        applyFormula(variable.initialValue, { Props: attributesSignal.get() }),
      ])
    ),
    Props: attributesSignal.value,
    Queries: Object.fromEntries(
      component.queries
        .filter((q) => q.type === "query")
        .map((q) => [q.name, { data: null, isLoading: false, error: null }])
    ),
    Mutations: Object.fromEntries(
      component.queries
        .filter((q) => q.type === "mutation")
        .map((q) => [
          q.name,
          {
            data: null,
            isLoading: false,
            error: null,
            __trigger: () => {},
          },
        ])
    ),
    Functions: Object.fromEntries(
      component.functions?.map((f) => [f.name, f.value]) ?? []
    ),
  });
  attributesSignal.subscribe((Attributes) =>
    dataSignal.set({
      ...dataSignal.get(),
      Props: Attributes,
    })
  );

  const ctx: ComponentContext = {
    onEvent,
    component,
    dataSignal,
    isRootComponent,
    mutations: {},
  };

  component.queries.forEach((q) => {
    if (q.type === "query") {
      cleanUp.push(createQuery(q, ctx));
    } else {
      ctx.mutations[q.name] = createMutation(q, ctx);
    }
  });

  const root = component.nodes.ROOT;
  const destroyRoot = createNode({ node: root, dataSignal, parent, ctx });
  return () => {
    destroyRoot();
    dataSignal.destroy();
    attributesSignal.destroy();
    cleanUp.forEach((f) => f());
  };
};

type NodeRenderer<NodeType> = {
  node: NodeType;
  dataSignal: Signal<NodeData>;
  parent: Element;
  ctx: ComponentContext;
};

const createGenericNode = ({
  node,
  parent,
  dataSignal,
  ctx,
}: NodeRenderer<NodeModel>): (() => void) => {
  switch (node.type) {
    case "element":
      return createElement({
        parent,
        node,
        dataSignal,
        ctx,
      });
    case "component":
      return createComponent({
        parent,
        node,
        dataSignal,
        ctx,
      });
    case "text":
      return createText({
        ctx,
        dataSignal,
        node,
        parent,
      });
    case "fragment":
      return createFragment({
        ctx,
        dataSignal,
        node,
        parent,
      });
  }
};

const repeatNode = ({
  node,
  dataSignal,
  parent,
  ctx,
}: NodeRenderer<NodeModel>) => {
  let cleanUp: Function[] = [];
  const listSignal = dataSignal.map((data) => applyFormula(node.repeat, data));
  listSignal.subscribe((list) => {
    list?.forEach?.((item: any, index: number) => {
      if (index >= cleanUp.length) {
        const args = {
          node,
          dataSignal: dataSignal.map(
            (data): NodeData => ({
              ...data,
              ListItem: {
                Item: applyFormula(node.repeat, data)?.[index],
                Index: index,
              },
            })
          ),
          ctx,
          parent,
        };
        const destroy = node.condition
          ? conditionalNode(args)
          : createGenericNode(args);
        cleanUp.push(destroy);
      }
    });
    cleanUp.slice(list?.length ?? 0).forEach((f) => {
      f();
      cleanUp.splice(cleanUp.indexOf(f), 1);
    });
  });

  return () => {
    cleanUp.forEach((f) => f());
    listSignal.destroy();
  };
};

const conditionalNode = ({
  node,
  parent,
  dataSignal,
  ctx,
}: NodeRenderer<NodeModel>) => {
  let destroy: Function | undefined;
  const showSignal = dataSignal.map((data) => {
    const show = Boolean(applyFormula(node.condition, data));
    if (ctx.component.name === "TreeNode") {
      console.log(node.id, show, data);
    }
    return show;
  });
  showSignal.subscribe((show) => {
    if (show) {
      destroy = createGenericNode({ node, dataSignal, ctx, parent });
      return destroy;
    }
    destroy?.();
  });
  return () => {
    destroy?.();
    showSignal.destroy();
  };
};

export const createNode = ({
  node,
  dataSignal,
  parent,
  ctx,
}: NodeRenderer<NodeModel>): (() => void) => {
  if (node.repeat) {
    return repeatNode({ node, dataSignal, parent, ctx });
  }
  if (node.condition) {
    return conditionalNode({ node, dataSignal, ctx, parent });
  }
  return createGenericNode({ node, dataSignal, ctx, parent });
};

type RenderTextProps = {
  parent: Element;
  node: TextNodeModel;
  dataSignal: Signal<NodeData>;
  ctx: ComponentContext;
};

const createText = ({ parent, node, dataSignal, ctx }: RenderTextProps) => {
  const { value } = node;
  const elem = document.createElement("span");
  elem.setAttribute("data-id", node.id);
  elem.setAttribute("data-node-type", "text");
  const cleanUp: Function[] = [];
  if (value.type === "formula") {
    const sig = dataSignal.map((data) =>
      String(applyFormula(value.formula, data))
    );
    sig.subscribe((value) => (elem.innerText = value));
    cleanUp.push(() => sig.destroy());
  } else {
    elem.innerText = String(value.value);
  }
  parent.appendChild(elem);
  return () => {
    cleanUp.forEach((f) => f());
    elem.remove();
  };
};
type RenderFragmentProps = {
  parent: Element;
  node: FragmentNodeModel;
  dataSignal: Signal<NodeData>;
  ctx: ComponentContext;
};

const createFragment = ({
  parent,
  node,
  dataSignal,
  ctx,
}: RenderFragmentProps) => {
  const cleanUp = node.children.map((childId) => {
    const child = ctx.component.nodes[childId];
    if (child) {
      return createNode({ node: child, dataSignal, parent, ctx });
    }
    return () => {};
  });
  const destroy = () => {
    cleanUp.forEach((f) => f());
  };
  return destroy;
};

type RenderComponentNodeProps = {
  parent: Element;
  node: ComponentNodeModel;
  dataSignal: Signal<NodeData>;
  ctx: ComponentContext;
};

const createComponent = ({
  parent,
  node,
  dataSignal,
  ctx,
}: RenderComponentNodeProps) => {
  const component = window.toddle.components?.find(
    (comp) => comp.name === node.name
  );
  if (!component) {
    console.error(`Could not find a component with the name ${node.name}`);
    return () => {};
  }
  const attributesSignal = dataSignal.map((data) => {
    return mapObject(node.attrs, ([attr, value]) => [
      attr,
      value.type === "formula"
        ? applyFormula(value.formula, data)
        : value.value,
    ]);
  });
  return renderComponent({
    attributesSignal,
    parent,
    component,
    isRootComponent: false,
    onEvent: (eventTrigger, data) => {
      const eventHandler = node.events.find((e) => e.trigger === eventTrigger);
      if (eventHandler) {
        eventHandler.actions.forEach((action) =>
          handleAction(action, { ...dataSignal.value, Event: data }, ctx)
        );
      }
    },
  });
};
const createDocumentElement = (tag: string) => {
  switch (tag) {
    case "svg":
    case "path":
    case "rect":
    case "circle":
    case "polyline":
    case "line":
      return document.createElementNS("http://www.w3.org/2000/svg", tag);

    default:
      return document.createElement(tag);
  }
};

const createElement = ({
  node,
  parent,
  dataSignal,
  ctx,
}: NodeRenderer<ElementNodeModel>): (() => void) => {
  const cleanUp: Function[] = [];
  const elem = createDocumentElement(node.tag);
  elem.setAttribute("data-id", node.id);
  if (node.classList) {
    node.classList?.forEach((elemClass) => {
      if (elemClass.formula) {
        const classSignal = dataSignal.map((data) =>
          Boolean(applyFormula(elemClass.formula, data))
        );
        classSignal.subscribe((show) =>
          show
            ? elem.classList.add(elemClass.name)
            : elem.classList.remove(elemClass.name)
        );
        cleanUp.push(() => classSignal.destroy());
      } else {
        elem.classList.add(elemClass.name);
      }
    });
  }
  if (node.href) {
    if (
      Object.values(node.href.queryParams ?? {}).some(isFormula) ||
      isFormula(node.href?.url)
    ) {
      const urlSignal = dataSignal.map((data) => {
        return `${
          node.href?.page?.path ?? applyFormula(node.href?.url, data) ?? "#"
        }${
          node.href?.queryParams
            ? "?" +
              stringifyQuery(
                mapValues(node.href.queryParams ?? {}, (value) =>
                  applyFormula(value, data)
                )
              )
            : ""
        }`;
      });
      urlSignal.subscribe((url) => elem.setAttribute("href", url));
    } else {
      elem.setAttribute(
        "href",
        `${node.href.page?.path ?? node.href?.url ?? "#"}${
          node.href.queryParams
            ? "?" + stringifyQuery(node.href.queryParams ?? {})
            : ""
        }`
      );
    }
  }
  Object.entries(node.attrs).forEach(([attr, value]) => {
    switch (attr) {
      case "value":
      case "src":
      case "type": {
        if (value?.type === "formula") {
          const o = dataSignal.map((data) =>
            String(applyFormula(value.formula, data))
          );
          o.subscribe((val) => {
            (elem as HTMLInputElement)[attr] = val;
          });
          cleanUp.push(() => o.destroy());
        } else {
          (elem as any)[attr] = value?.value;
        }
        break;
      }
      default: {
        if (value?.type === "formula") {
          const o = dataSignal.map((data) => applyFormula(value.formula, data));
          o.subscribe((val) => {
            if (node.tag.indexOf("-") === -1) {
              elem.setAttribute(attr, val);
            } else {
              (elem as any)[attr] = val;
            }
          });
          cleanUp.push(() => o.destroy());
        } else {
          if (node.tag.indexOf("-") === -1) {
            elem.setAttribute(attr, String(value?.value));
          } else {
            (elem as any)[attr] = value?.value;
          }
        }
      }
    }
  });
  node.styleVariables?.forEach((styleVariable) => {
    if (isFormula(styleVariable.value)) {
      const sig = dataSignal.map((data) =>
        applyFormula(styleVariable.value, data)
      );
      cleanUp.push(
        sig.subscribe((value) =>
          elem.style.setProperty(`--${styleVariable.name}`, value)
        )
      );
    } else {
      elem.style.setProperty(`--${styleVariable.name}`, styleVariable.value);
    }
  });
  node.events.forEach((event) => {
    const handler = (e: Event) => {
      if (event.preventDefault) {
        e.preventDefault();
      }
      if (event.stopPropagation) {
        e.stopPropagation();
      }
      event.actions.forEach((action) =>
        handleAction(action, { ...dataSignal.value, Event: e }, ctx)
      );
    };
    elem.addEventListener(event.trigger, handler);
  });
  node.children.forEach((childId) => {
    const child = ctx.component.nodes[childId];
    if (child) {
      createNode({
        node: child,
        dataSignal,
        parent: elem,
        ctx,
      });
    }
  });
  parent.appendChild(elem);
  return () => {
    cleanUp.forEach((f) => f());
    elem.remove();
  };
};

export const handleAction = (
  action: ActionModel,
  data: NodeData,
  ctx: ComponentContext
) => {
  switch (action.type) {
    case "Update Variable": {
      ctx.dataSignal.set({
        ...ctx.dataSignal.value,
        Variables: {
          ...ctx.dataSignal.value.Variables,
          [action.variableName]: applyFormula(action.value, data),
        },
      });
      break;
    }
    case "Custom": {
      const handler = window.toddle.actions[action.name];
      try {
        handler?.(applyFormula(action.data, data), ctx);
      } catch (err) {
        console.error("Error in Custom Action", err);
      }
      break;
    }
    case "Trigger Mutation": {
      const trigger = ctx.mutations[action.mutationName];
      if (!trigger) {
        console.error("Could not trigger the mutation ", action.mutationName);
        return;
      }
      const vars = mapValues(action.variables, (variable) =>
        applyFormula(variable, data)
      );
      trigger(vars)?.then(
        (data: any) => {
          action.onCompleted.actions.forEach((a) =>
            handleAction(a, ctx.dataSignal.value, ctx)
          );
        },
        (err: any) => {
          action.onFailed.actions.forEach((a) =>
            handleAction(a, ctx.dataSignal.value, ctx)
          );
        }
      );
      break;
    }
    case "Update Query": {
      locationSignal.set({
        ...locationSignal.value,
        query: {
          ...locationSignal.value.query,
          [action.paramName]: applyFormula(action.value, data),
        },
      });
      break;
    }
    case "Trigger Event": {
      ctx.onEvent(action.event, applyFormula(action.data, data));
      break;
    }
    case "Debug":
      console.info(action.label, applyFormula(action.data, data));
      break;

    default: {
      console.error("UNSUPPORTED ACTION", action, data);
    }
  }
};
