import "./plugins";
import "./formula/functions/index";
import "./saveComponents";

import { renderComponent } from "./runtime";
import { Project } from "./ComponentModel";

import { locationSignal } from "./router";
import { insertTheme } from "./theme";

import { insertFonts, insertStyles } from "./style";

import { components } from "./editor/index";

const page = {
  id: "a7c8ee64-0dbf-45a1-b62a-9417d5d565ee",
  path: "/editor",
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  requireAuth: false,
  component: {
    id: "e97648a0-c53e-4742-9d23-bff84b55ea41",
    name: "/editor",
  },
  project: {
    id: "d41e9972-8714-4fed-af45-8407985afbe4",
    name: "toddle",
    slug: "toddle",
    apis: [
      {
        id: "1674a3d9-ec36-4ef9-a0e0-81e2ea3d89c5",
        name: "Toddle-dev",
        auth: {},
        headers: {},
        url: "https://toddle-dev.hasura.app/v1/graphql",
      },
      {
        id: "6fd8e6a5-99f0-4989-a1f9-951e93a80297",
        name: "swapi",
        auth: {},
        headers: {},
        url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
      },
      {
        id: "674b3c7c-6afc-4725-8341-b31f95ed9847",
        name: "Toddle",
        auth: {
          type: "Bearer",
          value: {
            name: "Data",
            path: ["Auth", "token"],
            type: "path",
          },
        },
        headers: {},
        url: "/api/graphql",
      },
      {
        id: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
        name: "toddle (unsafe)",
        auth: null,
        headers: {
          "x-hasura-admin-secret": "wj75DVgisfBanV4",
        },
        url: "https://toddle.onrender.com/v1/graphql",
      },
    ],
  },
};

const DEFAULT_SLUG = "toddle";

const main = () => {
  const [, subDomain] = /(.*)\.toddle.dev/.exec(window.location.hostname) ?? [];
  const slug = subDomain ? subDomain : DEFAULT_SLUG;
  const root = document.getElementById("App");
  if (!root) {
    throw new Error("Cant find node with id 'App'");
  }

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
  window.toddle.project = page.project as Project;
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
};

main();
