import "./plugins";
import "./formula/functions/index";
import { ComponentContext, renderComponent } from "./runtime";
import { ComponentModel, Project } from "./ComponentModel";

import { locationSignal } from "./router";
import { insertTheme } from "./theme";
import { FunctionDeclaration } from "./formula/formula";
import { insertFonts, insertStyles } from "./style";

declare global {
  interface Window {
    toddle: {
      formulas: Record<string, FunctionDeclaration>;
      actions: Record<string, (data: unknown, ctx: ComponentContext) => void>;
      components: ComponentModel[];
      project?: Project;
      data: Record<string, unknown>;
    };
  }
}

const DEFAULT_SLUG = "toddle";

const fetchPage = (slug: string, path: string) => {
  return fetch("https://toddle.onrender.com/v1/graphql", {
    method: "POST",
    headers: {
      "x-hasura-admin-secret": "wj75DVgisfBanV4",
    },
    body: JSON.stringify({
      query: `
     query FetchPage($slug: String!, $path: String!) {
      pages(where: {project: {slug: {_eq: $slug}}, path: {_eq: $path}}) {
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
          components(where: {_or: [{_featureFlag: {_is_null: true}}, {featureFlag: {active: {_eq: true}}}]}) {
            id
            name
            _project
            variables
            props
            functions
            events
            root
            _featureFlag
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
      const components: ComponentModel[] = Object.values(
        page.project.components.reduce(
          (
            componentMap: Record<
              string,
              ComponentModel & {
                featureFlag: { name: string; created_at: string };
              }
            >,
            component: ComponentModel & {
              featureFlag: { name: string; created_at: string };
            }
          ) => {
            const current = componentMap[component.id];

            if (
              (!current || component._featureFlag) ??
              "" > (current?._featureFlag ?? "")
            ) {
              componentMap[component.id] = component;
            }
            return componentMap;
          },
          {}
        )
      );
      return {
        page,
        components,
      };
    });
};

const main = () => {
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
    if (!rootComponent || !rootComponent.root) {
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
