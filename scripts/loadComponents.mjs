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
            _featureFlag
            root
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

export const loadComponents = async (projectSlug) => {
  fs.rmdirSync("data", { recursive: true });
  fs.mkdirSync("data");
  const components = await fetchProjectComponents(projectSlug);

  for (let component of components) {
    if (!component.id && !component.queries) {
      throw new Error(`INVALID COMPONENT ${component.id}`);
    }

    const fileName = `data/${encodeURIComponent(component.name)}.json`;
    fs.writeFileSync(fileName, JSON.stringify(component, null, 2));
  }
  console.log("done");
};

loadComponents("toddle");
