import { nanoid } from "nanoid/non-secure";
import { NodeModel } from "../NodeModel";

export const parseHtml = (htmlString: string): Record<string, NodeModel>[] => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(htmlString, "text/html");
  if (htmlDoc.body.children.length > 0) {
    return Array.from(htmlDoc.body.children).map(elementToNodes);
  }

  if (htmlDoc.body.textContent) {
    return [
      {
        ROOT: {
          id: "ROOT",
          type: "text",
          value: { type: "value", value: htmlDoc.body.textContent },
        },
      },
    ];
  }
  return [];
};

const elementToNodes = (element: Element): Record<string, NodeModel> => {
  const nodes: Record<string, NodeModel> = {};

  const visitElem = (element: Element, id: string) => {
    let children =
      element.children.length !== 0
        ? Array.from(element.children)
        : element.textContent
        ? [element.textContent]
        : [];

    Array.from(element.children);
    nodes[id] = {
      id,
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
        const id = nanoid();
        if (typeof child === "string") {
          nodes[id] = {
            id,
            type: "text",
            value: { type: "value", value: child },
          };
        } else {
          visitElem(child, id);
        }
        return id;
      }),
    };
  };
  visitElem(element, "ROOT");
  return nodes;
};
