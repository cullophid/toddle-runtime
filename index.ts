import { renderComponent } from "./runtime";
import { ComponentModel } from "./ComponentModel";
import { ComponentNodeModel } from "./NodeModel";

import { locationSignal } from "./router";
import { insertTheme } from "./theme";
import { Canvas } from "./components/canvas";
import { applyFormula } from "./formula/formula";
import { insertFonts, insertStyles } from "./style";
import { StyleEditor } from "./components/style-editor";
import { ElementCatalog } from "./components/element-catalog/element-catalog";

declare global {
  interface Window {
    TODDLE_FUNCTIONS: Record<string, Function>;
  }
}

window.TODDLE_FUNCTIONS = window.TODDLE_FUNCTIONS || {};

const DEFAULT_SLUG = "toddle";
const fetchSubComponents = (
  projectId: string,
  names: string[],
  componentMap: Record<string, ComponentModel>
): Promise<Record<string, ComponentModel>> => {
  if (names.length === 0) {
    return Promise.resolve(componentMap);
  }

  return fetch("https://toddle.onrender.com/v1/graphql", {
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
            onCompleted
            onFailed
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
  })
    .then((result) => result.json())
    .then(({ data }) => {
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
    });
};

const fetchPage = (slug: string, path: string) => {
  return fetch("https://toddle.onrender.com/v1/graphql", {
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
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res.text());
      }
      return res.json();
    })
    .then(({ errors, data }) => {
      if (errors) {
        throw new Error(errors);
      }
      const [page] = data.pages;
      return fetchSubComponents(page._project, [page.component.name], {}).then(
        (components) => ({
          page,
          components,
        })
      );
    });
};

const main = () => {
  customElements.define("canvas-iframe", Canvas, {});
  customElements.define("style-editor", StyleEditor, {});
  customElements.define("element-catalog", ElementCatalog, {});

  const [, subDomain] = /(.*)\.toddle.dev/.exec(window.location.hostname) ?? [];
  const slug = subDomain ? subDomain : DEFAULT_SLUG;
  const root = document.getElementById("App");
  if (!root) {
    throw new Error("Cant find node with id 'App'");
  }
  fetchPage(slug, window.location.pathname).then(({ components, page }) => {
    const rootComponent = components[page.component.name];
    if (!rootComponent) {
      throw new Error(`Could not render component ${page.component.name}`);
    }

    (window as any).toddlePage = page;
    (window as any).toddleComponents = components;

    insertTheme(document.head);
    insertStyles(document.head, Object.values(components));
    insertFonts(document.head, Object.values(components));

    renderComponent({
      parent: root,
      components,
      name: page.component.name,
      attributesSignal: locationSignal.map(({ query }) =>
        Object.fromEntries(
          rootComponent.props.map((p) => [
            p.name,
            query[p.name] ?? p.initialValue,
          ])
        )
      ),
      onEvent: (event: string, data: unknown) =>
        console.log("EVENT FIRED", event, data),
    });
  });
};

main();

(window as any).TODDLE_FUNCTIONS.getInitialComponentData = (
  component: ComponentModel
) => {
  const Props = Object.fromEntries(
    component.props.map((prop) => [prop.name, prop.initialValue])
  );
  const Variables = Object.fromEntries(
    component.variables.map((variable) => [
      variable.name,
      applyFormula(variable.initialValue, { Props }),
    ])
  );
  return {
    Props,
    Variables,
  };
};
