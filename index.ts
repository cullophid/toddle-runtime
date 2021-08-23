import { renderComponent } from "./runtime";
import { ComponentModel } from "./ComponentModel";
import { ComponentNodeModel } from "./NodeModel";
import { colors, spacing } from "./theme";
import { parseQuery } from "./util";
import { signal } from "./signal";

const DEFAULT_SLUG = "demo";
const fetchSubComponents = async (
  projectId: string,
  names: string[],
  componentMap: Record<string, ComponentModel>
): Promise<Record<string, ComponentModel>> => {
  if (names.length === 0) {
    return componentMap;
  }
  const result = await fetch("https://toddle.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "wj75DVgisfBanV4",
    },
    body: JSON.stringify({
      query: `
    query getComponentsByName($names: [String!]!, $project: uuid!) {
        components(where: { name: { _in: $names }, _project: { _eq: $project } }) {
          id
          name
          _project
          variables
          props
          functions
          events
          nodes
          page {
            id
            path
            requireAuth
          }
          queries {
            id
            type
            documentNode
            name
            variables
            api {
              id
              headers
              auth
              name
              url
              _project
            }
          }
        }
      }
    `,
      variables: {
        project: projectId,
        names,
      },
    }),
  });

  const { data } = await result.json();

  const components = data.components as ComponentModel[];

  const subComponents: string[] = components
    .flatMap((component) => Object.values(component.nodes))
    .filter(
      (node): node is ComponentNodeModel =>
        node.type === "component" && componentMap[node.name] === undefined
    )
    .map((node) => node.name);

  return fetchSubComponents(
    projectId,
    subComponents,
    components.reduce((acc, c) => ({ ...acc, [c.name]: c }), componentMap)
  );
};

const fetchPage = async (slug: string, path: string) => {
  const res = await fetch("https://toddle.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "wj75DVgisfBanV4",
    },
    body: JSON.stringify({
      query: `
        query FetchPage($slug:String!, $path:String!) {
        pages(where:{
          project: {
            slug: {_eq: $slug }
          },
          path: {_eq:$path}
        }) {
          id
          path
          _project
          requireAuth
          component {
            id
            name
          }
        }
      }
  `,
      variables: {
        slug,
        path,
      },
    }),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  const { data, errors } = await res.json();
  if (errors) {
    throw new Error(errors);
  }
  const [page] = data.pages;
  const components = await fetchSubComponents(
    page._project,
    [page.component.name],
    {}
  );

  return {
    page,
    components,
  };
};

const main = async () => {
  insertTheme();
  const [, subDomain] = /(.*)\.toddle.dev/.exec(window.location.hostname) ?? [];
  const slug = subDomain ? subDomain : DEFAULT_SLUG;
  const root = document.getElementById("App");
  if (!root) {
    throw new Error("Cant find node with id 'App'");
  }
  const { components, page } = await fetchPage(slug, window.location.pathname);
  const attributeSignal = signal(parseQuery(window.location.search));

  const queryStringSignal = attributeSignal.map(
    (query) =>
      "?" +
      Object.entries(query)
        .map(([key, value]) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(
            String(value)
          )}`;
        })
        .join("&")
  );
  queryStringSignal.subscribe((queryString) => {
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}${queryString}`
    );
  });

  renderComponent(
    root,
    page.component.name,
    components as any,
    attributeSignal
  );
};

const insertTheme = () => {
  const colorVars = Object.entries(colors).flatMap(([color, variants]) =>
    Object.entries(variants).map(
      ([variant, value]) => `--${color}-${variant}:${value}`
    )
  );
  const styleElem = document.createElement("style");
  styleElem.setAttribute("type", "text/css");
  styleElem.innerText = `
      body {
        margin:0;
        height:100%;
        --spacing:${spacing};
        ${colorVars.join(";\n")};
        font-family:sans-serif;
      }
      button {
        border:none;
      }
      #App, html {
        height:100%;
      }
      ul, li {
        margin:0;
        padding:0;
        list-style-type:none;
      }
      * {
        box-sizing:border-box;
        position:relative;
      }
  `;
  document.head.appendChild(styleElem);
};

main();
