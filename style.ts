import { ComponentModel } from "./ComponentModel";
import { groupBy, kebabCase } from "lodash";
import {
  forEachNode,
  getFonts,
  NodeModel,
  NodeStyleModel,
  StyleDeclarationBlock,
  variantSelector,
} from "./NodeModel";
import { getClassName } from "./hash";

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

const getNodeStyles = (style: NodeStyleModel, classHash: string) => {
  const { variants, breakpoints, ...rest } = style;
  const styleElem = document.createElement("style");

  styleElem.type = "text/css";
  styleElem.appendChild(
    document.createTextNode(`
    .${classHash} {
        ${styleToCss(rest)}
    }
 
    ${
      variants
        ? variants
            .map(
              (variant) => `
      .${classHash}${variantSelector(variant)} {
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
  const hashes = new Set<string>();
  components.forEach(
    (component) =>
      component.root &&
      forEachNode(component.root, (node, path) => {
        if (node.type !== "element") {
          return;
        }
        const classHash = getClassName(node.style);
        if (hashes.has(classHash)) {
          return;
        }
        hashes.add(classHash);
        fragment.appendChild(getNodeStyles(node.style, classHash));
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
        .flatMap((comp) => getFontUrls(comp.root))
        .map((url) => `@import url(${url});`)
        .join("\n")
    )
  );
  parent.appendChild(styleElem);
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
