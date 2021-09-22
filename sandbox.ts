import { Formula } from "formula/formula";
import { DocumentNode } from "graphql";

const formula: Formula = {
  name: "CUSTOM_FUNCTION",
  type: "function",
  arguments: [
    {
      name: "Fucntion",
      formula: {
        name: "String",
        value: "getNode",
        type: "string",
      },
    },
    {
      name: "Item",
      formula: {
        name: "Data",
        path: ["Variables", "component", "root"],
        type: "path",
      },
    },
    {
      name: "Item",
      formula: {
        name: "Data",
        path: ["Variables", "selectedNodeId"],
        type: "path",
      },
    },
  ],
};
const doc: DocumentNode = {
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
};
