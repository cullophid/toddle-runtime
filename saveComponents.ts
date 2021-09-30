import { ComponentModel } from "ComponentModel";

const updateComponents = async (components: ComponentModel[]) => {
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

(window as any).save = async () => {
  const components = window.toddle.components;
  if (Array.isArray(components)) {
    const res = await updateComponents(components);
    console.log(res);
  }
};
