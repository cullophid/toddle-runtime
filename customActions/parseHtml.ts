import { nanoid } from "nanoid/non-secure";
import { NodeModel } from "../NodeModel";

export const parseHtml = (htmlString: string): NodeModel[] => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(htmlString, "text/html");
  if (htmlDoc.body.children.length > 0) {
    return Array.from(htmlDoc.body.children).map(elementToNode);
  }

  if (htmlDoc.body.textContent) {
    return [
      {
        type: "text",
        value: { type: "value", value: htmlDoc.body.textContent },
      },
    ];
  }
  return [];
};

const elementToNode = (element: Element): NodeModel => {
  const visitElem = (element: Element, id: string): NodeModel => {
    let children =
      element.children.length !== 0
        ? Array.from(element.children)
        : element.textContent
        ? [element.textContent]
        : [];

    Array.from(element.children);
    return {
      type: "element",
      tag: element.tagName,
      classList: element.className
        ? element.className.split(/\s/g).map((name) => ({
            name: name,
          }))
        : [],
      attrs: Object.fromEntries(
        Array.from(element.attributes)
          .filter((attr) => attr.name !== "class")
          .map((attr) => [attr.name, { type: "value", value: attr.value }])
      ),
      style: {},
      events: [],
      children: children.map((child) => {
        if (typeof child === "string") {
          return {
            type: "text",
            value: { type: "value", value: child },
          };
        } else {
          return visitElem(child, id);
        }
      }),
    };
  };
  return visitElem(element, "0");
};
