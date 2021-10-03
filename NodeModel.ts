import { Formula } from "./formula/formula";
import { ComponentEventModel, NodeEventModel } from "./EventModel";
import { groupBy } from "./util";
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

export type StyleVariable = {
  name: string;
  value: Formula | string;
};

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

export type NodeModel = ElementNodeModel | TextNodeModel | ComponentNodeModel;

export const elementNodeType: "element" = "element";
export const componentNodeType: "component" = "component";
export const textNodeType: "text" = "text";
export type ElementNodeModel = {
  type: "element";
  condition?: Formula;
  repeat?: Formula;
  tag: string;
  classList: NodeClass[];
  href?: LinkDestination;
  attrs: Record<string, Formula>;
  style: NodeStyleModel;
  styleVariables?: StyleVariable[];
  children: NodeModel[];
  events: NodeEventModel[];
};

export type ComponentNodeModel = {
  type: "component";
  name: string;
  condition?: Formula;
  repeat?: Formula;
  style?: undefined;
  attrs: Record<string, Formula>;
  children: NodeModel[];
  events: ComponentEventModel[];
};

export type TextNodeModel = {
  type: "text";
  condition?: Formula;
  repeat?: Formula;
  value: Formula;
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

export const forEachNode = (
  node: NodeModel,
  f: (node: NodeModel, path: number[]) => void,
  path?: number[]
) => {
  const p = path ?? [0];
  if (!node) {
    return;
  }
  f(node, p);
  switch (node.type) {
    case "component":
    case "element":
      node.children.forEach((child, i) => forEachNode(child, f, [...p, i]));
      break;
  }
};

export const getFonts = (root: NodeModel): FontStyle[] => {
  const fonts = new Map<string, FontStyle>();
  forEachNode(root, (node) => {
    if (node.type === "element") {
      const { fontStyle, fontFamily, fontWeight } = node.style ?? {};
      if (fontFamily) {
        fonts.set(`${fontFamily}:${fontStyle}:${fontWeight}}`, {
          fontFamily,
          fontStyle,
          fontWeight,
        });
      }
    }
  });
  return Array.from(fonts.values());
};

export const getFontUrls = (root: NodeModel): string[] => {
  const fonts = getFonts(root);
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

export const getColors = (root: NodeModel): Set<string> => {
  const colors = new Set<string>();
  forEachNode(root, (node) => {
    if (node.type !== "element") {
      return;
    }
    if (node.style?.color) {
      colors.add(node.style.color);
    }
    if (node.style?.backgroundColor) {
      colors.add(node.style.backgroundColor);
    }
  });
  return colors;
};

export const updateNode = (
  root: NodeModel,
  id: string,
  f: (update: NodeModel) => NodeModel
) => {
  const path = id.split(".").map(Number);
  const run = (node: NodeModel, path: number[]): NodeModel => {
    const [childIndex, ...rest] = path;
    if (childIndex === undefined) {
      return f(node);
    }
    switch (node.type) {
      case "component":
      case "element": {
        return {
          ...node,
          children: node.children.map((child, i) =>
            i === childIndex ? run(child, rest) : child
          ),
        };
      }
      default: {
        return node;
      }
    }
  };
  return run(root, path.slice(1));
};

export const removeNode = (root: NodeModel, id: string) => {
  const path = id.split(".").map(Number);
  return updateNode(
    root,
    path.slice(0, path.length - 1).join("."),
    (node: NodeModel) => {
      switch (node.type) {
        case "component":
        case "element": {
          const children = [...node.children];
          children.splice(path[path.length - 1], 1);
          return { ...node, children };
        }
        default: {
          return node;
        }
      }
    }
  );
};

export const insertNode = (root: NodeModel, id: string, newNode: NodeModel) => {
  const path = id.split(".").map(Number);
  return updateNode(
    root,
    path.slice(0, path.length - 1).join("."),
    (node: NodeModel) => {
      switch (node.type) {
        case "component":
        case "element": {
          const children = [...node.children];
          children.splice(path[path.length - 1], 0, newNode);
          return { ...node, children };
        }
        default: {
          return node;
        }
      }
    }
  );
};

export const getNode = (root: NodeModel, id: string) => {
  if (id.length === 0) {
    return undefined;
  }
  const path = id.split(".").map(Number);
  return path.slice(1).reduce((node: NodeModel | undefined, childIndex) => {
    switch (node?.type) {
      case "element":
      case "component":
        return node.children[childIndex];
      default:
        return undefined;
    }
  }, root);
};

export const moveNode = (
  root: NodeModel,
  oldId: string,
  newId: string
): NodeModel => {
  const node = getNode(root, oldId);
  if (!node) {
    return root;
  }
  return insertNode(removeNode(root, oldId), newId, node);
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
    variant.className && `.${variant.className}`,
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
