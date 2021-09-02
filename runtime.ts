import { CSSProperties } from "react";
import { mapObject, mapValues, omit } from "./util";
import {
  ComponentData,
  ComponentFunction,
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
  NodeStyleModel,
  resolveStyleBlock,
  StyleVariant,
  TextNodeModel,
  variantSelector,
} from "./NodeModel";
import { print as printQuery } from "graphql/language/printer";
import { css } from "./stitches";
import { signal, Signal } from "./signal";
import { locationSignal, stringifyQuery } from "./router";

const createQuery = (
  query: ComponentQuery,
  ctx: ComponentContext
): (() => void) => {
  const variablesSignal = ctx.dataSignal.map((data) => {
    return mapValues(query.variables, (value) =>
      applyFormula(value.value, data)
    );
  });

  variablesSignal.subscribe((variables) => {
    ctx.dataSignal.set({
      ...ctx.dataSignal.value,
      Queries: {
        ...ctx.dataSignal.value.Queries,
        [query.name]: { data: null, isLoading: true, error: null },
      },
    });

    fetch(query.api.url, {
      method: "POST",
      headers: mapObject(query.api.headers, ([header, value]) => [
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
        console.log(query.name, { query });
        query.onCompleted?.actions?.forEach((action) =>
          handleAction(action, ctx.dataSignal.value, ctx)
        );
      })
      .catch((error) => {
        console.log("Error", query.name, error);
        query.onFailed?.actions?.forEach((action) =>
          handleAction(action, ctx.dataSignal.value, ctx)
        );
      });
  });
  return () => variablesSignal.destroy();
};
const createMutation = (query: ComponentQuery, ctx: ComponentContext) => {
  const __trigger = (variables: Record<string, any>) => {
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

    return fetch(query.api.url, {
      method: "POST",
      headers: mapObject(query.api.headers, ([header, value]) => [
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
              __trigger,
            },
          },
        });
      });
  };
  ctx.dataSignal.set({
    ...ctx.dataSignal.value,
    Mutations: {
      ...ctx.dataSignal.value.Mutations,
      [query.name]: { data: null, isLoading: false, error: null, __trigger },
    },
  });
};

type ComponentContext = {
  components: Record<string, ComponentModel>;
  componentName: string;
  functions?: ComponentFunction[];
  nodes: Record<string, NodeModel>;
  dataSignal: Signal<ComponentData>;
  onEvent: (event: string, data: unknown) => void;
};

type RenderComponentProps = {
  parent: HTMLElement;
  name: string;
  components: Record<string, ComponentModel>;
  attributesSignal: Signal<Record<string, any>>;
  onEvent: (event: string, data: unknown) => void;
};
export const renderComponent = ({
  parent,
  name,
  components,
  attributesSignal,
  onEvent,
}: RenderComponentProps): (() => void) => {
  const component = components[name];

  if (!component) {
    return () => {};
  }

  const cleanUp: Function[] = [];

  const dataSignal = signal<ComponentData>({
    Variables: Object.fromEntries(
      component.variables.map((variable) => [
        variable.name,
        applyFormula(variable.initialValue, {}),
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

  if (component.name === "TreeNode") {
    const expandedSignal = dataSignal.map((data) => data.Variables.expanded);
    expandedSignal.subscribe((expanded) => console.log("Expanded", expanded));
  }

  const updateData = (f: (data: ComponentData) => ComponentData) => {
    dataSignal.set(f(dataSignal.value));
  };

  attributesSignal.subscribe((Attributes) =>
    updateData((data) => ({ ...data, Props: Attributes }))
  );

  const ctx = {
    onEvent,
    nodes: component.nodes,
    components,
    functions: component.functions,
    componentName: component.name,
    dataSignal,
    updateData,
  };

  component.queries.forEach((q) => {
    if (q.type === "query") {
      cleanUp.push(createQuery(q, ctx));
    } else {
      createMutation(q, ctx);
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
  parent: HTMLElement;
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
  const showSignal = dataSignal.map((data) =>
    Boolean(applyFormula(node.condition, data))
  );
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

const createNode = ({
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
  parent: HTMLElement;
  node: TextNodeModel;
  dataSignal: Signal<NodeData>;
  ctx: ComponentContext;
};

const createText = ({ parent, node, dataSignal, ctx }: RenderTextProps) => {
  const elem = document.createElement("span");
  const cleanUp: Function[] = [];
  if (isFormula(node.value)) {
    const sig = dataSignal.map((data) =>
      String(applyFormula(node.value, data))
    );
    sig.subscribe((value) => (elem.innerText = value));
    cleanUp.push(() => sig.destroy());
  } else {
    elem.innerText = String(node.value);
  }
  parent.appendChild(elem);
  return () => {
    cleanUp.forEach((f) => f());
    elem.remove();
  };
};
type RenderFragmentProps = {
  parent: HTMLElement;
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
    const child = ctx.nodes[childId];
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
  parent: HTMLElement;
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
  const attributesSignal = dataSignal.map((data) => {
    return mapObject(node.attrs, ([attr, value]) => [
      attr,
      applyFormula(value, data),
    ]);
  });
  return renderComponent({
    attributesSignal,
    parent,
    components: ctx.components,
    name: node.name,
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

const createElement = ({
  node,
  parent,
  dataSignal,
  ctx,
}: NodeRenderer<ElementNodeModel>): (() => void) => {
  const cleanUp: Function[] = [];
  const elem = document.createElement(node.tag);
  elem.setAttribute("data-id", node.id);
  elem.classList.add((css as any)(resolveStyle(node.style))());
  Object.entries(node.attrs).forEach(([attr, value]) => {
    switch (attr) {
      case "classList":
        node.attrs.classList?.forEach((elemClass) => {
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
        break;
      case "value":
      case "min":
      case "max":
      case "src":
      case "type": {
        if (isFormula(value)) {
          const o = dataSignal.map((data) => String(applyFormula(value, data)));
          o.subscribe((val) => {
            (elem as HTMLInputElement)[attr] = val;
          });
          cleanUp.push(() => o.destroy());
        } else {
          (elem as HTMLInputElement)[attr] = value;
        }
      }
      case "href": {
        const href = node.attrs.href;
        if (!href) {
          return;
        }
        if (
          Object.values(href.queryParams ?? {}).some(isFormula) ||
          isFormula(href?.url)
        ) {
          const urlSignal = dataSignal.map((data) => {
            return `${href.page?.path ?? applyFormula(href?.url, data) ?? "#"}${
              href.queryParams
                ? "?" +
                  stringifyQuery(
                    mapValues(href.queryParams ?? {}, (value) =>
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
            `${href.page?.path ?? href?.url ?? "#"}${
              href.queryParams
                ? "?" + stringifyQuery(href.queryParams ?? {})
                : ""
            }`
          );
        }
      }
      default: {
        if (isFormula(value)) {
          const o = dataSignal.map((data) => String(applyFormula(value, data)));
          o.subscribe((val) => {
            elem.setAttribute(attr, val);
          });
          cleanUp.push(() => o.destroy());
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
    elem.addEventListener(
      event.trigger === "Change" ? "input" : event.trigger.toLowerCase(),
      handler
    );
  });
  node.children.forEach((childId) => {
    const child = ctx.nodes[childId];
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

const handleAction = (
  action: ActionModel,
  data: NodeData,
  ctx: ComponentContext
) => {
  if (action.condition && !applyFormula(action.condition, data)) {
    return;
  }
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
    case "Trigger Mutation": {
      const trigger = data.Mutations?.[action.mutationName]?.__trigger;
      if (!trigger) {
        console.log("Could not trigger the mutation ", action.mutationName);
        return;
      }
      const vars = mapValues(action.variables, (variable) =>
        applyFormula(variable, data)
      );
      console.log("VARS", vars);
      trigger(vars).then(
        (data: any) => {
          console.log("COMPLETED", action.mutationName, data);
          action.onCompleted.actions.forEach((a) =>
            handleAction(a, ctx.dataSignal.value, ctx)
          );
        },
        (err: any) => {
          console.log("COMPLETED", action.mutationName, err);
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
      console.log(action.event, applyFormula(action.data, data));
      ctx.onEvent(action.event, applyFormula(action.data, data));
      break;
    }
  }
};

const resolveStyle = (style: NodeStyleModel): CSSProperties => {
  const { variants, breakpoints, ...rest } = style;

  const getVariantStyles = (vaariants: StyleVariant[] | undefined) =>
    variants?.reduce((acc: Record<string, NodeStyleModel>, variant) => {
      acc[variantSelector(variant)] = resolveStyleBlock(variant.style);
      return acc;
    }, {});
  return {
    position: "relative",
    ...resolveStyleBlock(rest),
    ...getVariantStyles(variants),
    ...(breakpoints?.["@large"]
      ? {
          "@large": {
            ...resolveStyleBlock(omit(breakpoints["@large"], ["variants"])),
            ...getVariantStyles(breakpoints["@large"].variants),
          },
        }
      : {}),
    ...(breakpoints?.["@medium"]
      ? {
          "@medium": {
            ...resolveStyleBlock(omit(breakpoints["@medium"], ["variants"])),
            ...getVariantStyles(breakpoints["@medium"].variants),
          },
        }
      : {}),
    ...(breakpoints?.["@small"]
      ? {
          "@small": {
            ...resolveStyleBlock(omit(breakpoints["@small"], ["variants"])),
            ...getVariantStyles(breakpoints["@small"].variants),
          },
        }
      : {}),
  };
};
