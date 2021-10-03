import { ComponentModel } from "ComponentModel";

export const EditorPage: ComponentModel = {
  id: "e97648a0-c53e-4742-9d23-bff84b55ea41",
  name: "/editor",
  props: [
    {
      name: "slug",
      initialValue: "toddle",
    },
    {
      name: "component",
      initialValue: "96db02b9-9df6-433d-8155-4029894471fe",
    },
    {
      name: "view",
      initialValue: "design",
    },
    {
      name: "panel",
      initialValue: "style",
    },
  ],
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  _featureFlag: null,
  root: {
    type: "component",
    name: "Editor",
    attrs: {
      project: {
        type: "path",
        path: ["Queries", "project", "data", "projects", "0"],
      },
      component: {
        path: ["Variables", "component"],
        type: "path",
      },
      components: {
        path: ["Queries", "components", "data", "components"],
        type: "path",
      },
      selectedNodeId: {
        type: "path",
        path: ["Variables", "selectedNodeId"],
      },
      selectedNode: {
        name: "GET_NODE",
        type: "function",
        arguments: [
          {
            name: "Root",
            formula: {
              path: ["Variables", "component", "root"],
              type: "path",
            },
          },
          {
            name: "nodeId",
            formula: {
              path: ["Variables", "selectedNodeId"],
              type: "path",
            },
          },
        ],
      },
      componentData: {
        type: "path",
        path: ["Variables", "componentData"],
      },
      highlightedNodeId: {
        path: ["Variables", "highlightedNode"],
        type: "path",
      },
      view: {
        type: "path",
        path: ["Props", "view"],
      },
    },
    children: [],
    events: [
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              path: ["Event"],
              type: "path",
            },
            variableName: "selectedNodeId",
          },
        ],
        trigger: "nodeSelected",
      },
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              path: ["Event"],
              type: "path",
            },
            variableName: "highlightedNode",
          },
        ],
        trigger: "nodeHighlighted",
      },
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              path: ["Event"],
              type: "path",
            },
            variableName: "component",
          },
          {
            type: "Trigger Mutation",
            onFailed: {
              type: "QueryEvent",
              actions: [],
              trigger: "Failed",
            },
            variables: {
              update_Component_by_pk___set__name: {
                path: ["Variables", "component", "name"],
                type: "path",
              },
              update_Component_by_pk___set__root: {
                path: ["Variables", "component", "root"],
                type: "path",
              },
              update_Component_by_pk___set__props: {
                path: ["Variables", "component", "props"],
                type: "path",
              },
              update_Component_by_pk___set__events: {
                path: ["Variables", "component", "events"],
                type: "path",
              },
              update_Component_by_pk__pk_columns__id: {
                path: ["Variables", "component", "id"],
                type: "path",
              },
              update_Component_by_pk___set__functions: {
                path: ["Variables", "component", "functions"],
                type: "path",
              },
              update_Component_by_pk___set__variables: {
                path: ["Variables", "component", "variables"],
                type: "path",
              },
            },
            onCompleted: {
              type: "QueryEvent",
              actions: [
                {
                  type: "Debug",
                  data: {
                    type: "value",
                    value: "SAVED",
                  },
                },
              ],
              trigger: "Completed",
            },
            mutationName: "updateComponent",
          },
          {
            data: {
              path: ["Event"],
              type: "path",
            },
            type: "Debug",
            label: "LeftPanel",
          },
        ],
        trigger: "componentChanged",
      },
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              path: ["Event"],
              type: "path",
            },
            variableName: "componentData",
          },
        ],
        trigger: "componentDataChanged",
      },
    ],
  },
  events: [],
  variables: [
    {
      name: "selectedNodeId",
      initialValue: "",
    },
    {
      name: "highlightedNode",
      initialValue: "",
    },
    {
      name: "component",
      initialValue: "",
    },
    {
      name: "componentData",
      initialValue: "",
    },
    {
      name: "showElementCatalog",
      initialValue: "",
    },
  ],
  functions: [],
  queries: [
    {
      id: "e0746313-0c59-44c0-b7b6-61ed3f67dbd8",
      _api: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
      name: "updateComponent",
      type: "mutation",
      debounce: 500,
      onFailed: null,
      throttle: null,
      variables: {
        update_Component_by_pk___set__name: {
          name: "update_Component_by_pk:_set:name",
          value: "",
        },
        update_Component_by_pk___set__root: {
          name: "update_Component_by_pk:_set:root",
          value: "",
        },
        update_Component_by_pk___set__props: {
          name: "update_Component_by_pk:_set:props",
          value: "",
        },
        update_Component_by_pk___set__events: {
          name: "update_Component_by_pk:_set:events",
          value: "",
        },
        update_Component_by_pk__pk_columns__id: {
          name: "update_Component_by_pk:pk_columns:id",
          value: "",
        },
        update_Component_by_pk___set__functions: {
          name: "update_Component_by_pk:_set:functions",
          value: "",
        },
        update_Component_by_pk___set__variables: {
          name: "update_Component_by_pk:_set:variables",
          value: "",
        },
      },
      onCompleted: {
        type: "QueryEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              path: ["Queries", "component", "data", "component"],
              type: "path",
            },
            variableName: "component",
          },
        ],
        trigger: "Completed",
      },
      documentNode: {
        kind: "Document",
        definitions: [
          {
            kind: "OperationDefinition",
            name: {
              kind: "Name",
              value: "updateComponent",
            },
            operation: "mutation",
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk",
                  },
                  arguments: [
                    {
                      kind: "Argument",
                      name: {
                        kind: "Name",
                        value: "pk_columns",
                      },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "id",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value: "update_Component_by_pk__pk_columns__id",
                              },
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: "Argument",
                      name: {
                        kind: "Name",
                        value: "_set",
                      },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "events",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value: "update_Component_by_pk___set__events",
                              },
                            },
                          },
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "functions",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value:
                                  "update_Component_by_pk___set__functions",
                              },
                            },
                          },
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "root",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value: "update_Component_by_pk___set__root",
                              },
                            },
                          },
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "props",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value: "update_Component_by_pk___set__props",
                              },
                            },
                          },
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "variables",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value:
                                  "update_Component_by_pk___set__variables",
                              },
                            },
                          },
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "name",
                            },
                            value: {
                              kind: "Variable",
                              name: {
                                kind: "Name",
                                value: "update_Component_by_pk___set__name",
                              },
                            },
                          },
                        ],
                      },
                    },
                  ],
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
                    ],
                  },
                },
              ],
            },
            variableDefinitions: [
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NonNullType",
                  type: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "uuid",
                    },
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk__pk_columns__id",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "jsonb",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__events",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "jsonb",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__functions",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "jsonb",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__root",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "jsonb",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__props",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "jsonb",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__variables",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "String",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "update_Component_by_pk___set__name",
                  },
                },
              },
            ],
          },
        ],
      },
    },
    {
      id: "cafad0a0-ee18-43ea-a0e9-492758fdd990",
      _api: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
      name: "project",
      type: "query",
      debounce: null,
      throttle: null,
      variables: {
        projects__where__slug___eq: {
          name: "projects:where:slug:_eq",
          value: {
            path: ["Props", "slug"],
            type: "path",
          },
        },
        projects__pages__where__path___eq: {
          name: "path",
          value: "/",
        },
      },
      onCompleted: null,
      onFailed: null,
      documentNode: {
        kind: "Document",
        definitions: [
          {
            kind: "OperationDefinition",
            name: {
              kind: "Name",
              value: "project",
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
                  arguments: [
                    {
                      kind: "Argument",
                      name: {
                        kind: "Name",
                        value: "where",
                      },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "slug",
                            },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "_eq",
                                  },
                                  value: {
                                    kind: "Variable",
                                    name: {
                                      kind: "Name",
                                      value: "projects__where__slug___eq",
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
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
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "apis",
                        },
                        arguments: [],
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
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "pages",
                        },
                        arguments: [
                          {
                            kind: "Argument",
                            name: {
                              kind: "Name",
                              value: "where",
                            },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "path",
                                  },
                                  value: {
                                    kind: "ObjectValue",
                                    fields: [
                                      {
                                        kind: "ObjectField",
                                        name: {
                                          kind: "Name",
                                          value: "_eq",
                                        },
                                        value: {
                                          kind: "Variable",
                                          name: {
                                            kind: "Name",
                                            value:
                                              "projects__pages__where__path___eq",
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              ],
                            },
                          },
                        ],
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
                                value: "path",
                              },
                            },
                            {
                              kind: "Field",
                              name: {
                                kind: "Name",
                                value: "component",
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
                      },
                    ],
                  },
                },
              ],
            },
            variableDefinitions: [
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "String",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "projects__where__slug___eq",
                  },
                },
              },
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "String",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "projects__pages__where__path___eq",
                  },
                },
              },
            ],
          },
        ],
      },
    },
    {
      id: "0ab5871a-4fae-4895-8d94-1f2f0149da13",
      _api: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
      name: "components",
      type: "query",
      debounce: null,
      onFailed: null,
      throttle: null,
      condition: {
        path: ["Queries", "project", "data", "projects", "0", "id"],
        type: "path",
      },
      variables: {
        components__where___project___eq: {
          name: "components:where:_project:_eq",
          value: {
            path: ["Queries", "project", "data", "projects", "0", "id"],
            type: "path",
          },
        },
      },
      onCompleted: {
        type: "QueryEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              name: "FIND",
              type: "function",
              arguments: [
                {
                  name: "List",
                  formula: {
                    path: ["Queries", "components", "data", "components"],
                    type: "path",
                  },
                },
                {
                  name: "Fx",
                  formula: {
                    name: "IF",
                    type: "function",
                    arguments: [
                      {
                        name: "If",
                        formula: {
                          path: ["Props", "component"],
                          type: "path",
                        },
                      },
                      {
                        name: "Then",
                        formula: {
                          name: "EQ",
                          type: "function",
                          arguments: [
                            {
                              name: "First",
                              formula: {
                                path: ["Args", "item", "id"],
                                type: "path",
                              },
                            },
                            {
                              name: "Second",
                              formula: {
                                path: ["Props", "component"],
                                type: "path",
                              },
                            },
                          ],
                        },
                      },
                      {
                        name: "Else",
                        formula: {
                          name: "EQ",
                          type: "function",
                          arguments: [
                            {
                              name: "First",
                              formula: {
                                path: ["Args", "item", "name"],
                                type: "path",
                              },
                            },
                            {
                              name: "Second",
                              formula: {
                                type: "value",
                                value: "/",
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
            variableName: "component",
          },
          {
            name: "editorLoaded",
            type: "Custom",
          },
        ],
        trigger: "Completed",
      },
      documentNode: {
        kind: "Document",
        definitions: [
          {
            kind: "OperationDefinition",
            name: {
              kind: "Name",
              value: "components",
            },
            operation: "query",
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: {
                    kind: "Name",
                    value: "components",
                  },
                  arguments: [
                    {
                      kind: "Argument",
                      name: {
                        kind: "Name",
                        value: "where",
                      },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: {
                              kind: "Name",
                              value: "_project",
                            },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: {
                                    kind: "Name",
                                    value: "_eq",
                                  },
                                  value: {
                                    kind: "Variable",
                                    name: {
                                      kind: "Name",
                                      value: "components__where___project___eq",
                                    },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
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
                          value: "functions",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "events",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "createdAt",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "_project",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "root",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "name",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "props",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "variables",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "updatedAt",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "queries",
                        },
                      },
                    ],
                  },
                },
              ],
            },
            variableDefinitions: [
              {
                kind: "VariableDefinition",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "uuid",
                  },
                },
                variable: {
                  kind: "Variable",
                  name: {
                    kind: "Name",
                    value: "components__where___project___eq",
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
};
