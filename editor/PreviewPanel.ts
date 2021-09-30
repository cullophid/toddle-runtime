import { ComponentModel } from "ComponentModel";

export const PreviewPanel: ComponentModel = {
  id: "6fdc9e83-545c-4747-a6b9-71790ed0982d",
  name: "PreviewPanel",
  props: [
    {
      name: "component",
      initialValue: {
        id: "ec39d879-fdfa-40fb-a9ce-8f382e19a944",
        name: "Dummy",
        nodes: {
          ROOT: {
            id: "ROOT",
            type: "fragment",
            children: ["7WQmOL7lsKF0CgR0LaMzc"],
          },
          "7WQmOL7lsKF0CgR0LaMzc": {
            id: "7WQmOL7lsKF0CgR0LaMzc",
            tag: "div",
            type: "element",
            attrs: {
              id: "someId",
              classList: [
                {
                  name: "MyClass",
                },
              ],
            },
            style: {
              width: "10",
              height: "10",
              background: "red",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [],
          },
        },
        props: [
          {
            id: "3d6128bd-a4c8-4d2b-bbc0-583b06bdac51",
            name: "id",
            initialValue: "1234",
          },
        ],
        events: [],
        queries: [
          {
            id: "20bd883d-6544-4695-9e92-7a3e0b310930",
            api: {
              id: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
              url: "https://toddle.onrender.com/v1/graphql",
              auth: null,
              name: "toddle (unsafe)",
              headers: {
                "x-hasura-admin-secret": "wj75DVgisfBanV4",
              },
              _project: "d41e9972-8714-4fed-af45-8407985afbe4",
            },
            name: "UnNamed",
            type: "query",
            onFailed: {},
            variables: {},
            onCompleted: {},
            documentNode: {
              kind: "Document",
              definitions: [
                {
                  kind: "OperationDefinition",
                  name: {
                    kind: "Name",
                    value: "NoName",
                  },
                  operation: "query",
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "projects",
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "id",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "name",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                  variableDefinitions: [],
                },
              ],
            },
          },
        ],
        _project: "d41e9972-8714-4fed-af45-8407985afbe4",
        functions: [],
        variables: [
          {
            id: "090b3716-1ca0-4e90-9dc3-837f106f10c6",
            name: "name",
            initialValue: "",
          },
        ],
      },
    },
    {
      name: "project",
      initialValue: {
        id: "d41e9972-8714-4fed-af45-8407985afbe4",
        apis: [
          {
            id: "1674a3d9-ec36-4ef9-a0e0-81e2ea3d89c5",
            name: "Toddle-dev",
          },
          {
            id: "6fd8e6a5-99f0-4989-a1f9-951e93a80297",
            name: "swapi",
          },
          {
            id: "674b3c7c-6afc-4725-8341-b31f95ed9847",
            name: "Toddle",
          },
          {
            id: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
            name: "toddle (unsafe)",
          },
        ],
        name: "toddle",
      },
    },
    {
      name: "componentData",
      initialValue: {
        Props: {
          id: "1234",
        },
        Functions: {},
        Variables: {
          name: "bob",
        },
      },
    },
  ],
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  _featureFlag: null,
  root: {
    tag: "div",
    type: "element",
    attrs: {},
    style: {},
    events: [],
    children: [
      {
        tag: "main",
        type: "element",
        attrs: {},
        style: {
          height: "100%",
          display: "flex",
          flexGrow: 1,
          position: "relative",
          alignItems: "stretch",
          flexShrink: 1,
          flexDirection: "row",
          backgroundColor: "var(--grey-600)",
        },
        events: [],
        children: [
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              width: "64",
              position: "relative",
              backgroundColor: "var(--grey-800)",
            },
            events: [],
            children: [
              {
                tag: "h2",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-100)",
                  width: "auto",
                  margin: "0px",
                  padding: "0px",
                  fontSize: "4",
                  position: "relative",
                  boxSizing: "border-box",
                  marginTop: "2",
                  marginLeft: "2",
                  fontWeight: "bolder",
                  marginRight: "2",
                  marginBottom: "2",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Props",
                    },
                  },
                ],
                classList: [],
              },
              {
                tag: "ul",
                type: "element",
                attrs: {},
                style: {
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "stretch",
                  flexDirection: "column",
                },
                events: [],
                children: [
                  {
                    tag: "li",
                    type: "element",
                    attrs: {},
                    style: {
                      gap: "2",
                      color: "var(--grey-300)",
                      height: "40px",
                      display: "flex",
                      padding: "8px",
                      position: "relative",
                      boxSizing: "border-box",
                      alignItems: "center",
                      paddingTop: "2",
                      paddingLeft: "2",
                      paddingRight: "2",
                      flexDirection: "row",
                      paddingBottom: "2",
                    },
                    events: [],
                    repeat: {
                      path: ["Props", "component", "props"],
                      type: "path",
                    },
                    children: [
                      {
                        type: "text",
                        value: {
                          type: "formula",
                          formula: {
                            path: ["ListItem", "Item", "name"],
                            type: "path",
                          },
                        },
                      },
                      {
                        tag: "span",
                        type: "element",
                        attrs: {},
                        style: {
                          color: "var(--grey-400)",
                          margin: "0px",
                          display: "inline",
                          padding: "0px",
                          position: "relative",
                          boxSizing: "border-box",
                        },
                        events: [],
                        children: [
                          {
                            type: "text",
                            value: {
                              type: "formula",
                              formula: {
                                name: "GET",
                                type: "function",
                                arguments: [
                                  {
                                    name: "Object",
                                    formula: {
                                      path: ["Props", "componentData", "Props"],
                                      type: "path",
                                    },
                                  },
                                  {
                                    name: "Item",
                                    formula: {
                                      path: ["ListItem", "Item", "name"],
                                      type: "path",
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        classList: [],
                      },
                    ],
                    classList: [],
                  },
                ],
                classList: [],
              },
              {
                tag: "h2",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-100)",
                  width: "auto",
                  margin: "0px",
                  padding: "0px",
                  fontSize: "4",
                  position: "relative",
                  boxSizing: "border-box",
                  marginTop: "2",
                  marginLeft: "2",
                  marginRight: "2",
                  marginBottom: "2",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Variables",
                    },
                  },
                ],
                classList: [],
              },
              {
                tag: "ul",
                type: "element",
                attrs: {},
                style: {
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "stretch",
                  flexDirection: "column",
                },
                events: [],
                children: [
                  {
                    tag: "li",
                    type: "element",
                    attrs: {},
                    style: {
                      gap: "2",
                      color: "var(--grey-300)",
                      height: "40px",
                      display: "flex",
                      padding: "8px",
                      position: "relative",
                      boxSizing: "border-box",
                      alignItems: "center",
                      paddingTop: "2",
                      paddingLeft: "2",
                      paddingRight: "2",
                      flexDirection: "row",
                      paddingBottom: "2",
                    },
                    events: [],
                    repeat: {
                      path: ["Props", "component", "variables"],
                      type: "path",
                    },
                    children: [
                      {
                        type: "text",
                        value: {
                          type: "formula",
                          formula: {
                            path: ["ListItem", "Item", "name"],
                            type: "path",
                          },
                        },
                      },
                      {
                        tag: "span",
                        type: "element",
                        attrs: {},
                        style: {
                          color: "var(--grey-400)",
                        },
                        events: [],
                        children: [
                          {
                            type: "text",
                            value: {
                              type: "formula",
                              formula: {
                                name: "GET",
                                type: "function",
                                arguments: [
                                  {
                                    name: "Object",
                                    formula: {
                                      path: [
                                        "Props",
                                        "componentData",
                                        "Variables",
                                      ],
                                      type: "path",
                                    },
                                  },
                                  {
                                    name: "Item",
                                    formula: {
                                      path: ["ListItem", "Item", "name"],
                                      type: "path",
                                    },
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        classList: [],
                      },
                    ],
                    classList: [],
                  },
                ],
                classList: [],
              },
              {
                tag: "h2",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-100)",
                  width: "auto",
                  margin: "0px",
                  padding: "0px",
                  fontSize: "4",
                  position: "relative",
                  boxSizing: "border-box",
                  marginTop: "2",
                  marginLeft: "2",
                  marginRight: "2",
                  marginBottom: "2",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Queries",
                    },
                  },
                ],
                classList: [],
              },
              {
                tag: "ul",
                type: "element",
                attrs: {},
                style: {
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "stretch",
                  flexDirection: "column",
                },
                events: [],
                children: [
                  {
                    tag: "li",
                    type: "element",
                    attrs: {},
                    style: {
                      color: "var(--grey-300)",
                      height: "40px",
                      display: "flex",
                      padding: "8px",
                      position: "relative",
                      boxSizing: "border-box",
                      alignItems: "center",
                      paddingTop: "2",
                      paddingLeft: "2",
                      paddingRight: "2",
                      flexDirection: "row",
                      paddingBottom: "2",
                    },
                    events: [],
                    repeat: {
                      path: ["Props", "component", "queries"],
                      type: "path",
                    },
                    children: [
                      {
                        type: "text",
                        value: {
                          type: "formula",
                          formula: {
                            path: ["ListItem", "Item", "name"],
                            type: "path",
                          },
                        },
                      },
                    ],
                    classList: [],
                  },
                ],
                classList: [],
              },
            ],
            classList: [],
          },
        ],
        classList: [],
      },
    ],
    classList: [],
  },
  events: [],
  variables: [],
  functions: [],
  queries: [],
};
