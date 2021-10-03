import fs from "fs";
const updateComponent = (component) => {
  const convertNode = (node) => {
    switch (node.type) {
      case "text":
      case "component":
        return node;
      case "element":
        return {
          ...node,
          children: node.children.map(convertNode),
        };
      case "fragment": {
        return {
          type: "element",
          tag: "div",
          classList: [],
          attrs: {},
          style: {},
          children: node.children.map(convertNode),
          events: [],
        };
      }
    }
  };
  return {
    ...component,
    root: convertNode(component.root),
  };
};

export const map = async () => {
  const files = fs.readdirSync("data");
  const components = files.map((fileName) => {
    return JSON.parse(fs.readFileSync(`data/${fileName}`).toString("utf-8"));
  });

  const updates = components.map(updateComponent);

  for (let component of updates) {
    if (!component.id && !component.queries) {
      throw new Error(`INVALID COMPONENT ${component.id}`);
    }

    const fileName = `data/${encodeURIComponent(component.name)}.json`;
    fs.rmSync(fileName);
    fs.writeFileSync(fileName, JSON.stringify(component, null, 2));
  }
  console.log("Finished updating ", components.length, " components");
};
map();
