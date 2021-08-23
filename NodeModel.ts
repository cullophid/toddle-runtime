import { Formula } from "./formula/formula";
import { ComponentEventModel, NodeEventModel } from "./EventModel";
import { groupBy, last, mapValues } from "./util";
import { nanoid } from "nanoid/non-secure";
import { CSSProperties } from "react";

export enum ContainerNodeTag {
  div = "div",
  main = "main",
  article = "article",
  section = "section",
  header = "header",
  footer = "footer",
  ul = "ul",
  ol = "ol",
  li = "li",
  menu = "menu",
  nav = "nav",
  form = "form",
  a = "a",
  button = "button",
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  span = "span",
  label = "label",
  p = "p",
  svg = "svg",
}

export enum SVGNodeTag {
  circle = "circle",
  path = "path",
  g = "g",
  rect = "rect",
  ellipse = "ellipse",
  line = "line",
  polygon = "polygon",
  polyline = "polyline",
  text = "text",
}

export enum VoidNodeTag {
  input = "input",
  img = "img",
  iframe = "iframe",
}

export type Shadow = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  inset: boolean;
};

export type Filter =
  | {
      name: "Blur";
      radius: number;
    }
  | {
      name: "Opacity";
      percent: number;
    };

export interface StyleDeclarationBlock extends CSSProperties {
  filters?: Filter[];
  shadows?: Shadow[];
}

export interface StyleVariant {
  className?: string;
  hover?: boolean;
  focus?: boolean;
  focusWithin?: boolean;
  active?: boolean;
  disabled?: boolean;
  firstChild?: boolean;
  lastChild?: boolean;
  evenChild?: boolean;
  style: StyleDeclarationBlock;
}

export interface NodeStyleModel extends StyleDeclarationBlock {
  variants?: StyleVariant[];
  breakpoints?: {
    "@small"?: NodeStyleModel;
    "@medium"?: NodeStyleModel;
    "@large"?: NodeStyleModel;
  };
}

export type NodeClass = {
  name: string;
  formula?: Formula;
};
export type NodeAttrs = {
  [key: string]: any;
  classList?: NodeClass[];
  id?: string;
  value?: Formula | string | number;
  href?: LinkDestination;
};

export type NodeModel =
  | FragmentNodeModel
  | ElementNodeModel
  | TextNodeModel
  | ComponentNodeModel;

export const elementNodeType: "element" = "element";
export const componentNodeType: "component" = "component";
export const textNodeType: "text" = "text";
export type ElementNodeModel = {
  id: string;
  type: "element";
  condition?: Formula;
  repeat?: Formula;
  tag: string;
  attrs: NodeAttrs;
  style: NodeStyleModel;
  children: string[];
  events: NodeEventModel[];
};

export type FragmentNodeModel = {
  id: string;
  type: "fragment";
  condition?: Formula;
  repeat?: Formula;
  attrs: undefined;
  style: undefined;
  children: string[];
  events: undefined;
};

export type ComponentNodeModel = {
  id: string;
  type: "component";
  name: string;
  condition?: Formula;
  repeat?: Formula;
  style?: undefined;
  attrs: NodeAttrs;
  children: string[];
  events: ComponentEventModel[];
};

export type TextNodeModel = {
  id: string;
  type: "text";
  style: NodeStyleModel;
  condition?: Formula;
  repeat?: Formula;
  value: string | Formula;
  children?: undefined;
};

export type LinkDestination = {
  page?: {
    id: string;
    path: string;
  };
  url?: string | Formula;
  queryParams?: Record<string, string | number | Formula>;
};

type FontStyle = {
  fontFamily: string;
  fontStyle?: string;
  fontWeight?: number | string;
};

export const getFonts = (nodes: Record<string, NodeModel>): FontStyle[] => {
  const fonts = new Map<string, FontStyle>();
  Object.values(nodes).forEach((node) => {
    const { fontStyle, fontFamily, fontWeight } = node.style ?? {};
    if (fontFamily) {
      fonts.set(`${fontFamily}:${fontStyle}:${fontWeight}}`, {
        fontFamily,
        fontStyle,
        fontWeight,
      });
    }
  });
  return Array.from(fonts.values());
};

export const getFontUrls = (nodes: Record<string, NodeModel>): string[] => {
  const fonts = getFonts(nodes);
  return Object.entries(groupBy(fonts, (font) => font.fontFamily)).map(
    ([fontFamily, variants]) => {
      const fontName = fontFamily
        .split(",")[0]
        ?.trim()
        .replace(/\s/g, "+")
        .replace(/\'/g, "");

      return `https://fonts.googleapis.com/css?family=${fontName}:ital,wght@${variants
        .map(
          (variant) =>
            `${variant.fontStyle === "italic" ? 1 : 0},${variant.fontWeight}`
        )
        .join(";")}&display=swap`;
    }
  );
};

export const getColors = (nodes: Record<string, NodeModel>): Set<string> => {
  const colors = new Set<string>();
  Object.values(nodes).forEach((node) => {
    if (node.style?.color) {
      colors.add(node.style.color);
    }
    if (node.style?.backgroundColor) {
      colors.add(node.style.backgroundColor);
    }
  });
  return colors;
};

export const moveNode = (
  nodes: Record<string, NodeModel>,
  nodeId: string,
  parentId: string,
  index?: number
): Record<string, NodeModel> => {
  return mapValues(nodes, (node) => {
    if (node.type === "text") {
      return node;
    }

    return {
      ...node,
      children:
        node.id === parentId
          ? insert(node.children, nodeId, index).filter(
              (child, i) => child !== nodeId || i === index
            )
          : node.children?.filter((child) => child !== nodeId),
    };
  });
};

export const deleteNode = (
  nodes: Record<string, NodeModel>,
  nodeId: string
): Record<string, NodeModel> => {
  const nodesToDelete = new Set<string>();
  const findNodes = (nodeId: string) => {
    nodesToDelete.add(nodeId);
    const node = nodes[nodeId];
    node?.children?.forEach(findNodes);
  };
  findNodes(nodeId);
  return Object.entries(nodes).reduce<Record<string, NodeModel>>(
    (nodes, [id, node]) => {
      if (nodesToDelete.has(id) === false) {
        nodes[id] =
          node.type === "element" || node.type === "component"
            ? {
                ...node,
                children: node.children.filter(
                  (child) => nodesToDelete.has(child) === false
                ),
              }
            : node;
      }
      return nodes;
    },
    {}
  );
};

export const getSubTree = (
  nodes: Record<string, NodeModel>,
  nodeId: string
) => {
  const subTree: Record<string, NodeModel> = {};
  const run = (id: string) => {
    const node = nodes[id];
    if (id === nodeId) {
      subTree["ROOT"] = { ...node, id: "ROOT" };
    } else {
      subTree[id] = node;
    }
    node.children?.forEach(run);
  };
  run(nodeId);
  return cloneNodeTree(subTree);
};

export const cloneNodeTree = (
  nodes: Record<string, NodeModel>
): Record<string, NodeModel> => {
  const idMap = Object.fromEntries(
    Object.keys(nodes).map((key) => [key, key === "ROOT" ? "ROOT" : nanoid()])
  );
  return Object.fromEntries(
    Object.entries(nodes).map(([key, node]) => [
      idMap[key],
      node.type === "text"
        ? {
            ...node,
            id: idMap[key],
          }
        : {
            ...node,
            id: idMap[key],
            children: node.children.map((childId) => idMap[childId]),
          },
    ])
  );
};

export const copyNode = (
  nodes: Record<string, NodeModel>,
  nodeId: string,
  parentId: string,
  index: number
): Record<string, NodeModel> => {
  const clones: Record<string, NodeModel> = {};
  const parent = nodes[parentId];
  if (parent.type === "text") {
    return nodes;
  }
  const newNodeId = nanoid();

  const copy = (nodeId: string, newId: string) => {
    const node = nodes[nodeId];
    if (node.type === "text") {
      return (clones[newId] = { ...node, id: newId });
    }
    const children = node.children.map(() => nanoid());
    clones[newId] = { ...node, id: newId, children };

    node.children?.forEach((child, i) => copy(child, children[i]));
  };
  copy(nodeId, newNodeId);
  return {
    ...nodes,
    [parentId]: {
      ...parent,
      children: insert(parent.children, newNodeId, index),
    },
    ...clones,
  };
};

const mapEntries = <A, B>(
  object: Record<string, A>,
  f: (tuple: [string, A]) => [string, B]
): Record<string, B> => Object.fromEntries(Object.entries(object).map(f));

export const insertNodeTree = (
  nodes: Record<string, NodeModel>,
  subTree: Record<string, NodeModel>,
  parentId: string,
  index?: number
): Record<string, NodeModel> => {
  const parent = nodes[parentId];
  const childId = nanoid();
  const childIndex = index ?? parent.children?.length ?? 0;
  if (parent?.type === "text") {
    return nodes;
  }

  return {
    ...nodes,
    [parentId]: {
      ...parent,
      children: insert(parent.children, childId, childIndex),
    },
    ...mapEntries(subTree, ([key, node]) =>
      node.id === "ROOT" ? [childId, { ...node, id: childId }] : [key, node]
    ),
  };
};

export const getPath = (nodes: Record<string, NodeModel>, nodeId: string) => {
  const run = (path: string[]): string[] | undefined => {
    const id = last(path);
    if (id === nodeId) {
      return path;
    }
    const node = id ? nodes[id] : undefined;
    if (node?.children !== undefined) {
      for (let child of node.children) {
        const childPath = run([...path, child]);
        if (childPath) {
          return childPath;
        }
      }
    }
  };
  return run(["ROOT"]);
};

export type DropType = "container" | "link" | "list" | "text" | "input";

export const fontUrl = (style: {
  fontFamily: string;
  fontWeight?: string | number;
  fontStyle?: string;
}) => {
  const { fontFamily, fontWeight = 400, fontStyle } = style;
  const fontName = fontFamily
    .split(",")[0]
    ?.trim()
    .replace(/\s/g, "+")
    .replace(/\'/g, "");
  return `https://fonts.googleapis.com/css?family=${fontName}:ital,wght@${
    fontStyle === "italic" ? "1" : "0"
  },${fontWeight}&display=swap`;
};

export const variantSelector = (variant: StyleVariant) =>
  [
    variant.className && `&.${variant.className}`,
    variant.active && ":active",
    variant.focus && ":focus",
    variant.focusWithin && ":focus-within",
    variant.disabled && ":disabled",
    variant.firstChild && ":first-child",
    variant.lastChild && ":last-child",
    variant.evenChild && ":nth-child(even)",
    variant.hover && ":hover",
  ]
    .filter(Boolean)
    .join("");

export const resolveStyleUnits = (style: NodeStyleModel): CSSProperties => {
  return Object.fromEntries(
    Object.entries(style).map(([key, value]) => {
      if (
        ["zIndex", "flexGrow", "flex", "flexShrink"].includes(key) ||
        Number.isNaN(Number(value))
      ) {
        return [key, value];
      }
      return [key, `calc(var(--spacing) * ${value})`];
    })
  );
};
export const resolveStyleBlock = (style: NodeStyleModel): CSSProperties => {
  const { shadows, backgroundImage, filters, variants, breakpoints, ...rest } =
    style;
  const boxShadow =
    shadows
      ?.map(
        (shadow) =>
          `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`
      )
      .join(",") ?? "none";

  const filter =
    filters
      ?.map((filter) => {
        switch (filter.name) {
          case "Blur":
            return `blur(${filter.radius}px)`;
          case "Opacity":
            return `opacity(${filter.percent})`;
        }
      })
      .join(",") ?? "none";

  return {
    ...resolveStyleUnits(rest),
    boxShadow,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    filter,
  };
};
const insert = function <T>(list: T[], item: T, index?: number) {
  return [
    ...list.slice(0, index ?? list.length - 1),
    item,
    ...list.slice(index ?? list.length - 1),
  ];
};
