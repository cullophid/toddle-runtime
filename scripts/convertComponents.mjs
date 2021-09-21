import fetch from "node-fetch";
import fs from "fs";
// import fs from "fs";
const fetchProjectComponents = async (slug) => {
  const res = await fetch("https://toddle.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "wj75DVgisfBanV4",
    },
    body: JSON.stringify({
      query: `
        query fetchProjectComponents($slug:String) {
            components(where:{ project: {
            name:{
            _eq:$slug
            }}
        }) { 
            id
            name
            props
            _project
            nodes
            events
            variables
            functions
            queries
            onLoad
        }
            
        }
  `,
      variables: {
        slug,
      },
    }),
  });
  if (!res.ok) {
    return Promise.reject(res.text());
  }
  const data = await res.json();
  return data.data.components;
};

export const updateComponents = async (projectSlug, func) => {
  fs.rmdirSync("data/backup", { recursive: true });
  fs.rmdirSync("data/update", { recursive: true });
  fs.mkdirSync("data/backup");
  fs.mkdirSync("data/update");
  const components = await fetchProjectComponents(projectSlug);

  for (let component of components) {
    if (!component.id && !component.queries) {
      throw new Error(`INVALID COMPONENT ${component.id}`);
    }
    fs.writeFileSync(
      `data/backup/${component.id}.json`,
      JSON.stringify(component, null, 2)
    );
    const update = func(component);
    fs.writeFileSync(
      `data/update/${component.id}.json`,
      JSON.stringify(update, null, 2)
    );
  }
  console.log("done");
};

const mapObject = (object, func) =>
  Object.fromEntries(Object.entries(object).map(func));

const mapValues = (object, func) =>
  mapObject(object, ([key, value]) => [key, func(value)]);

const omit = (object, keys) =>
  Object.fromEntries(
    Object.entries(object).filter(([key]) => keys.includes(key) === false)
  );

updateComponents("toddle", (component) => {
  return component;
});
