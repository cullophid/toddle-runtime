import { CSSProperties } from "react";
import { mapObject, omit } from "./util";
import {
  ComponentData,
  ComponentModel,
  ComponentQuery,
  NodeData,
} from "./ComponentModel";
import { ActionModel } from "./EventModel";
import { applyFormula, isFormula } from "./formula/formula";
import {
  NodeModel,
  NodeStyleModel,
  resolveStyleBlock,
  StyleVariant,
  variantSelector,
} from "./NodeModel";
import { print as printQuery } from "graphql/language/printer";
import { css } from "./stitches";
import { Signal, signal } from "./signal";

export const renderComponent = (
  parent: HTMLElement,
  name: string,
  components: Record<string, ComponentModel>
) => {
  const attributesSignal = signal<Record<string, any>>({});
  const { elem } = createComponent(name, components, attributesSignal);
  parent.appendChild(elem);
};

const createQuery = (
  query: ComponentQuery,
  dataSignal: Signal<ComponentData>
): (() => void) => {
  const variablesSignal = dataSignal.map((data) => {
    return mapObject(query.variables, ([key, value]) => [
      key,
      applyFormula(value.value, data),
    ]);
  });

  variablesSignal.subscribe((variables) => {
    dataSignal.set({
      ...dataSignal.value,
      Queries: {
        ...dataSignal.value.Queries,
        [query.name]: { data: null, isLoading: true, error: null },
      },
    });
    fetch(query.api.url, {
      method: "POST",
      headers: mapObject(query.api.headers, ([header, value]) => [
        header,
        applyFormula(value, dataSignal.value),
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
      .then(({ data, error }) => {
        dataSignal.set({
          ...dataSignal.value,
          Queries: {
            ...dataSignal.value.Queries,
            [query.name]: { data, isLoading: false, error },
          },
        });
      });
  });
  return () => variablesSignal.destroy();
};
const createMutation = (
  query: ComponentQuery,
  dataSignal: Signal<ComponentData>
) => {
  const __trigger = (variables: Record<string, any>) => {
    dataSignal.set({
      ...dataSignal.value,
      Mutations: {
        ...dataSignal.value.Mutations,
        [query.name]: {
          ...(dataSignal.value.Mutations?.[query.name] ?? {
            data: null,
            __trigger,
            error: null,
          }),
          isLoading: true,
        },
      },
    });
    fetch(query.api.url, {
      method: "POST",
      headers: mapObject(query.api.headers, ([header, value]) => [
        header,
        applyFormula(value, dataSignal.value),
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
      .then(({ data, error }) => {
        dataSignal.set({
          ...dataSignal.value,
          Mutations: {
            ...dataSignal.value.Mutations,
            [query.name]: { data, isLoading: false, error, __trigger },
          },
        });
      });
  };
  dataSignal.set({
    ...dataSignal.value,
    Mutations: {
      ...dataSignal.value.Mutations,
      [query.name]: { data: null, isLoading: false, error: null, __trigger },
    },
  });
};

const createComponent = (
  name: string,
  components: Record<string, ComponentModel>,
  attributesSignal: Signal<Record<string, any>>
): { elem: DocumentFragment; destroy: () => void } => {
  const component = components[name];
  const fragment = document.createDocumentFragment();

  if (!component) {
    return { elem: fragment, destroy: () => {} };
  }

  const cleanUp: Function[] = [];

  const dataSignal: Signal<NodeData> = attributesSignal.map(
    (Attributes): NodeData => {
      return {
        Variables: Object.fromEntries(
          component.variables.map((variable) => [
            variable.name,
            applyFormula(variable.initialValue, {}),
          ])
        ),
        Props: Attributes,
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
      };
    }
  );

  component.queries.forEach((q) => {
    if (q.type === "query") {
      cleanUp.push(createQuery(q, dataSignal));
    } else {
      createMutation(q, dataSignal);
    }
  });

  const handleAction = (action: ActionModel, data: NodeData) => {
    switch (action.type) {
      case "Update Variable": {
        dataSignal.set({
          ...dataSignal.value,
          Variables: {
            ...dataSignal.value.Variables,
            [action.variableName]: applyFormula(action.value, data),
          },
        });
      }
    }
  };

  const createNode = (
    node: NodeModel,
    dataSignal: Signal<NodeData>
  ): { elem: Element | DocumentFragment; destroy: () => void } => {
    const cleanUp: Array<() => void> = [];
    switch (node.type) {
      case "element": {
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
            case "type": {
              if (isFormula(value)) {
                const o = dataSignal.map((data) =>
                  String(applyFormula(value, data))
                );
                o.subscribe((val) => {
                  (elem as HTMLInputElement)[attr] = val;
                });
                cleanUp.push(() => o.destroy());
              } else {
                (elem as HTMLInputElement)[attr] = value;
              }
            }
            case "href":
            default: {
              if (isFormula(value)) {
                const o = dataSignal.map((data) =>
                  String(applyFormula(value, data))
                );
                o.subscribe((val) => {
                  elem.setAttribute(attr, val);
                });
                cleanUp.push(() => o.destroy());
              }
            }
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
              handleAction(action, { ...dataSignal.value, Event: e })
            );
          };
          elem.addEventListener(
            event.trigger === "Change" ? "input" : event.trigger.toLowerCase(),
            handler
          );
        });
        node.children.forEach((childId) =>
          renderNode(childId, dataSignal, elem)
        );
        const destroy = () => {
          cleanUp.forEach((f) => f());
          elem.remove();
        };
        return { elem, destroy };
      }
      case "text": {
        const elem = document.createElement("span");
        elem.classList.add((css as any)(resolveStyle(node.style))());
        if (isFormula(node.value)) {
          const sig = dataSignal.map((data) =>
            String(applyFormula(node.value, data))
          );
          sig.subscribe((value) => (elem.innerText = value));
          cleanUp.push(() => sig.destroy());
        } else {
          elem.innerText = String(node.value);
        }
        const destroy = () => {
          cleanUp.forEach((f) => f());
          elem.remove();
        };
        return { elem, destroy };
      }
      case "fragment": {
        const elem = document.createDocumentFragment();
        const cleanUp = node.children.map((childId) =>
          renderNode(childId, dataSignal, elem)
        );
        const destroy = () => {
          cleanUp.forEach((f) => f());
        };
        return { elem, destroy };
      }
      case "component": {
        const attributesSignal = dataSignal.map((data) => {
          return mapObject(node.attrs, ([attr, value]) => [
            attr,
            applyFormula(value, data),
          ]);
        });
        return createComponent(node.name, components, attributesSignal);
      }
    }
  };

  const renderNode = (
    id: string,
    dataSignal: Signal<NodeData>,
    parent: Element | DocumentFragment
  ): (() => void) => {
    const node = component.nodes[id];
    if (!node) {
      return () => {};
    }
    if (node.repeat) {
      let cleanUp: Function[] = [];
      const listSignal = dataSignal.map((data) =>
        applyFormula(node.repeat, data)
      );

      listSignal.subscribe((list) => {
        list?.forEach?.((item: any, index: number) => {
          if (index >= cleanUp.length) {
            const { elem, destroy } = createNode(
              node,
              dataSignal.map(
                (data): NodeData => ({
                  ...data,
                  ListItem: applyFormula(node.repeat, data)?.[index],
                })
              )
            );
            cleanUp.push(destroy);
            parent.appendChild(elem);
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
    } else {
      const { elem, destroy } = createNode(node, dataSignal);
      if (node.condition) {
        const showSignal = dataSignal.map((data) =>
          Boolean(applyFormula(node.condition, data))
        );
        showSignal.subscribe((show) => {
          if (show) {
            return parent.appendChild(elem);
          }
          if (elem.parentNode === parent) {
            parent.removeChild(elem);
          }
        });
      } else {
        parent.appendChild(elem);
      }
      return destroy;
    }
  };

  const destroyRoot = renderNode("ROOT", dataSignal, fragment);
  const destroy = () => {
    destroyRoot();
    dataSignal.destroy();
    attributesSignal.destroy();
    cleanUp.forEach((f) => f());
  };
  return { elem: fragment, destroy };
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
