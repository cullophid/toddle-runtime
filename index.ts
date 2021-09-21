import {
  ComponentContext,
  createMutation,
  createQuery,
  renderComponent,
} from "./runtime";
import {
  ComponentData,
  ComponentModel,
  NodeData,
  Project,
} from "./ComponentModel";
import { ComponentNodeModel, getPath, NodeModel } from "./NodeModel";

import { locationSignal } from "./router";
import { insertTheme } from "./theme";
import { Canvas } from "./components/canvas-iframe";
import { applyFormula } from "./formula/formula";
import { insertFonts, insertStyles } from "./style";
import { StyleEditor } from "./components/style-editor";
import { ElementCatalog } from "./components/element-catalog/element-catalog";
import { ElementAttributes } from "./components/element-attributes";
import { ElementEvents } from "./components/element-events";
import { FormulaEditor } from "./components/formula-editor";
import { editorLoaded } from "./customActions/editorLoaded";

declare global {
  interface Window {
    TODDLE_FUNCTIONS: Record<string, Function>;
    toddle: {
      formulas: Record<string, Function>;
      actions: Record<string, (data: unknown, ctx: ComponentContext) => void>;
      components: ComponentModel[];
      project?: Project;
      data: Record<string, unknown>;
    };
  }
}
window.toddle = {
  formulas: {},
  actions: {},
  components: [],
  data: {},
};
window.TODDLE_FUNCTIONS = window.toddle.formulas;

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
          queries
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
          project {
            id
            name
            slug
            apis {
              id
              name
              auth
              headers
              url
            }
             components {
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
              queries
            }
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
      return {
        page,
        components: page.project.components as ComponentModel[],
      };
    });
};

const main = () => {
  customElements.define("element-attributes", ElementAttributes, {});
  customElements.define("element-events", ElementEvents, {});
  customElements.define("style-editor", StyleEditor, {});
  customElements.define("element-catalog", ElementCatalog, {});
  customElements.define("canvas-iframe", Canvas, {});
  customElements.define("formula-editor", FormulaEditor, {});

  const [, subDomain] = /(.*)\.toddle.dev/.exec(window.location.hostname) ?? [];
  const slug = subDomain ? subDomain : DEFAULT_SLUG;
  const root = document.getElementById("App");
  if (!root) {
    throw new Error("Cant find node with id 'App'");
  }
  fetchPage(slug, window.location.pathname).then(({ components, page }) => {
    const rootComponent = components.find(
      (comp) => comp.name === page.component.name
    );
    if (!rootComponent) {
      throw new Error(`Could not render component ${page.component.name}`);
    }

    (window as any).toddlePage = page;
    (window as any).toddleComponents = components;

    insertTheme(document.head);
    insertStyles(document.head, components);
    insertFonts(document.head, components);

    window.toddle.components = components;
    window.toddle.project = page.project;
    renderComponent({
      parent: root,
      component: rootComponent,
      isRootComponent: true,
      attributesSignal: locationSignal.map(({ query }) =>
        Object.fromEntries(
          rootComponent.props.map((p) => [
            p.name,
            query[p.name] ?? p.initialValue,
          ])
        )
      ),
      onEvent: (event: string, data: unknown) =>
        console.info("EVENT FIRED", event, data),
    });
  });
};

main();

window.toddle.formulas.getInitialComponentData = (
  component: ComponentModel
) => {
  const Props = Object.fromEntries(
    component.props.map((prop) => [prop.name, prop.initialValue])
  );
  const Functions = Object.fromEntries(
    component.functions?.map((f) => [f.name, f.value]) ?? []
  );
  const Variables = Object.fromEntries(
    component.variables.map((variable) => [
      variable.name,
      applyFormula(variable.initialValue, { Props, Functions }),
    ])
  );
  return {
    Props,
    Variables,
    Functions,
  };
};

window.toddle.formulas.getNodeData = (
  nodeId: string,
  nodes: Record<string, NodeModel>,
  data: NodeData
): NodeData => {
  const path = getPath(nodes, nodeId) ?? [];
  return path.reduce(
    (acc, nodeId) => {
      const node = nodes[nodeId];
      const repeat = applyFormula(node.repeat, acc);
      const [listItem] = Array.isArray(repeat) ? repeat : [];

      if (listItem) {
        acc.ListItem = { Item: listItem, Index: 0 };
      }
      return acc;
    },
    { ...data }
  );
};
window.toddle.actions.editorLoaded = editorLoaded;
