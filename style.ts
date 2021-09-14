import { ComponentModel } from "./ComponentModel";
import { groupBy, kebabCase } from "lodash";
import {
  ElementNodeModel,
  getFonts,
  NodeModel,
  StyleDeclarationBlock,
  variantSelector,
} from "./NodeModel";

const SIZE_PROPERTIES = new Set([
  "width",
  "min-width",
  "max-width",
  "height",
  "min-height",
  "max-height",
  "margin",
  "margin-top",
  "margin-left",
  "margin-bottom",
  "margin-right",
  "padding",
  "padding-top",
  "padding-left",
  "padding-bottom",
  "padding-right",
  "gap",
  "gap-x",
  "gap-y",
  "border-radius",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-width",
  "border-top-width",
  "border-left-width",
  "border-bottom-width",
  "border-right-width",
  "font-size",
]);

const styleToCss = (style: StyleDeclarationBlock) => {
  return Object.entries(style)
    .map(([property, value]) => {
      const propertyName = kebabCase(property);
      const propertyValue =
        String(Number(value)) === value && SIZE_PROPERTIES.has(propertyName)
          ? `calc(${value} * var(--spacing))`
          : value;
      return `${propertyName}:${propertyValue};`;
    })
    .join("\n");
};

const getNodeStyles = (node: ElementNodeModel) => {
  const { variants, breakpoints, ...rest } = node.style;
  const styleElem = document.createElement("style");
  styleElem.type = "text/css";
  styleElem.setAttribute("data-node-id", node.id);
  styleElem.appendChild(
    document.createTextNode(`
    [data-id="${node.id}"] {
        ${styleToCss(rest)}
    }
    ${
      variants
        ? variants
            .map(
              (variant) => `
    [data-id="${node.id}"]${variantSelector(variant)} {
        ${styleToCss(variant.style)}
    }
    `
            )
            .join("\n")
        : ""
    }
  `)
  );
  return styleElem;
};

export const insertStyles = (
  parent: HTMLElement,
  components: ComponentModel[]
) => {
  const fragment = document.createDocumentFragment();
  components.forEach((component) =>
    Object.values(component.nodes).forEach((node) => {
      if (node.type !== "element") {
        return;
      }

      fragment.appendChild(getNodeStyles(node));
    })
  );
  parent.appendChild(fragment);
};

export const insertFonts = (
  parent: HTMLElement,
  components: ComponentModel[]
) => {
  const styleElem = document.createElement("style");
  styleElem.appendChild(
    document.createTextNode(
      components
        .flatMap((comp) => getFontUrls(comp.nodes))
        .map((url) => `@import url(${url});`)
        .join("\n")
    )
  );
  parent.appendChild(styleElem);
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
