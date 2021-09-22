import fetch from "node-fetch";
import fs from "fs";

const updateComponents = async (components) => {
  const res = await fetch("https://toddle.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "wj75DVgisfBanV4",
    },
    body: JSON.stringify({
      query: `
       mutation updateComponent($components: [Component_insert_input!]!) {
        insertComponent(
          on_conflict: {
            update_columns: [variables, name, props, functions, queries, root]
            constraint: components_pkey
          }
          objects: $components
        ) {
          returning {
            id
          }
        }
      }
  `,
      variables: {
        components,
      },
    }),
  });
  if (!res.ok) {
    return Promise.reject(res.text());
  }
  const data = await res.json();
  if (data.errors) {
    throw new Error(JSON.stringify(data.errors, null, 2));
  }
  return data.data?.insertComponent.returning;
};

const validateComponent = (component) => {
  if (typeof component.id !== "string") {
    throw new Error("Id is not a string");
  }
  if (typeof component.name !== "string") {
    throw new Error(`${component.id} has no name`);
  }
  if (typeof component._project !== "string") {
    throw new Error(`${component.id} has no _project`);
  }
  if (typeof component.root !== "object") {
    throw new Error(`invalid "root" on ${component.id}`);
  }
  if (typeof component.props !== "object") {
    throw new Error(`invalid "props" on ${component.id}`);
  }
  if (typeof component.variables !== "object") {
    throw new Error(`invalid "variables" on ${component.id}`);
  }
  if (typeof component.functions !== "object") {
    throw new Error(`invalid "functions" on ${component.id}`);
  }
  if (Array.isArray(component.queries) === false) {
    throw new Error(`invalid "queries" on ${component.id}`);
  }
  if (Array.isArray(component.events) === false) {
    throw new Error(`invalid "events" on ${component.id}`);
  }
  if (typeof component.onLoad !== "object") {
    throw new Error(`invalid "onLoad" on ${component.id}`);
  }
  return true;
};
export const save = async () => {
  const files = fs.readdirSync("data");
  const components = files.map((fileName) => {
    return JSON.parse(fs.readFileSync(`data/${fileName}`).toString("utf-8"));
  });

  components.forEach(validateComponent);
  const res = await updateComponents(components);
  console.log("Finished updating ", components.length, " components", res);
};
save();
