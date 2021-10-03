import { ComponentModel } from "ComponentModel";

export const AddressBar: ComponentModel = {
  id: "caf37a88-4086-4e75-8da9-103e3d0568bd",
  name: "AddressBar",
  props: [
    {
      name: "component",
      initialValue: "",
    },
    {
      name: "projectId",
      initialValue: "d41e9972-8714-4fed-af45-8407985afbe4",
    },
  ],
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  _featureFlag: null,
  root: {
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      height: "7",
      flexGrow: 1,
      position: "relative",
      variants: [
        {
          style: {
            height: "7",
            flexGrow: 1,
            position: "relative",
            flexShrink: 1,
            paddingLeft: "2",
            paddingRight: "2",
            borderTopColor: "var(--primary-300)",
            borderTopStyle: "solid",
            borderTopWidth: "1px",
            backgroundColor: "var(--grey-600)",
            borderLeftColor: "var(--primary-300)",
            borderLeftStyle: "solid",
            borderLeftWidth: "1px",
            borderRightColor: "var(--primary-300)",
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderBottomColor: "var(--primary-300)",
            borderBottomStyle: "solid",
            borderBottomWidth: "1px",
            borderTopLeftRadius: "1",
            borderTopRightRadius: "1",
            borderBottomLeftRadius: "1",
            borderBottomRightRadius: "1",
          },
          className: "open",
        },
      ],
      flexShrink: 1,
      paddingLeft: "2",
      paddingRight: "2",
      borderTopColor: "var(--primary-300)",
      borderTopStyle: "solid",
      borderTopWidth: "0px",
      backgroundColor: "var(--grey-700)",
      borderLeftColor: "var(--primary-300)",
      borderLeftStyle: "solid",
      borderLeftWidth: "0px",
      borderRightColor: "var(--primary-300)",
      borderRightStyle: "solid",
      borderRightWidth: "0px",
      borderBottomColor: "var(--primary-300)",
      borderBottomStyle: "solid",
      borderBottomWidth: "0px",
      borderTopLeftRadius: "1",
      borderTopRightRadius: "1",
      borderBottomLeftRadius: "1",
      borderBottomRightRadius: "1",
    },
    events: [],
    children: [
      {
        tag: "input",
        type: "element",
        attrs: {
          value: {
            name: "IF",
            type: "function",
            arguments: [
              {
                name: "If",
                formula: {
                  path: ["Variables", "isOpen"],
                  type: "path",
                },
              },
              {
                name: "Then",
                formula: {
                  path: ["Variables", "search"],
                  type: "path",
                },
              },
              {
                name: "Else",
                formula: {
                  path: ["Props", "component"],
                  type: "path",
                },
              },
            ],
          },
        },
        style: {
          color: "var(--grey-200)",
          width: "100%",
          border: "1px solid #ccc",
          height: "100%",
          zIndex: 5,
          display: "inline-block",
          fontSize: "16px",
          position: "relative",
          boxSizing: "border-box",
          alignItems: "center",
          paddingLeft: "0",
          borderRadius: 2,
          paddingRight: "0",
          borderTopWidth: "0",
          borderLeftWidth: "0",
          borderRightWidth: "0",
          borderBottomWidth: "0",
        },
        events: [
          {
            type: "NodeEvent",
            actions: [
              {
                type: "Update Variable",
                value: "TRUE",
                variableName: "isOpen",
              },
            ],
            trigger: "focus",
            preventDefault: false,
            stopPropagation: false,
          },
          {
            type: "NodeEvent",
            actions: [
              {
                type: "Update Variable",
                value: {
                  path: ["Event", "target", "value"],
                  type: "path",
                },
                variableName: "search",
              },
            ],
            trigger: "input",
            preventDefault: false,
            stopPropagation: false,
          },
        ],
        children: [],
        classList: [],
      },
      {
        tag: "div",
        type: "element",
        attrs: {},
        style: {
          top: "8",
          left: "0",
          width: "100%",
          zIndex: 5,
          shadows: [
            {
              x: 0,
              y: 3,
              blur: 5,
              color: "#00000055",
              inset: false,
              spread: 0,
            },
          ],
          overflow: "auto",
          position: "absolute",
          maxHeight: "90",
          minHeight: "4",
          borderTopColor: "var(--primary-300)",
          borderTopStyle: "solid",
          borderTopWidth: "1px",
          backgroundColor: "var(--grey-600)",
          borderLeftColor: "var(--primary-300)",
          borderLeftStyle: "solid",
          borderLeftWidth: "1px",
          borderRightColor: "var(--primary-300)",
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderBottomColor: "var(--primary-300)",
          borderBottomStyle: "solid",
          borderBottomWidth: "1px",
          borderTopLeftRadius: "1",
          borderTopRightRadius: "1",
          borderBottomLeftRadius: "1",
          borderBottomRightRadius: "1",
        },
        events: [],
        children: [
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
                  color: "var(--grey-100)",
                  height: "40px",
                  display: "flex",
                  padding: "8px",
                  position: "relative",
                  variants: [
                    {
                      hover: true,
                      style: {
                        backgroundColor: "var(--grey-500)",
                      },
                    },
                  ],
                  boxSizing: "border-box",
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        data: {
                          path: ["ListItem", "Item", "id"],
                          type: "path",
                        },
                        type: "Trigger Event",
                        event: "change",
                      },
                      {
                        type: "Update Variable",
                        value: "",
                        variableName: "isOpen",
                      },
                    ],
                    trigger: "click",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                repeat: {
                  name: "FILTER",
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
                        name: "INCLUDES",
                        type: "function",
                        arguments: [
                          {
                            name: "String",
                            formula: {
                              name: "LOWER",
                              type: "function",
                              arguments: [
                                {
                                  name: "String",
                                  formula: {
                                    path: ["Args", "item", "name"],
                                    type: "path",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            name: "Sub String",
                            formula: {
                              name: "LOWER",
                              type: "function",
                              arguments: [
                                {
                                  name: "String",
                                  formula: {
                                    path: ["Variables", "search"],
                                    type: "path",
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
                children: [
                  {
                    type: "text",
                    value: {
                      path: ["ListItem", "Item", "name"],
                      type: "path",
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
                          name: "IF",
                          type: "function",
                          arguments: [
                            {
                              name: "If",
                              formula: {
                                path: ["ListItem", "Item", "page"],
                                type: "path",
                              },
                            },
                            {
                              name: "Then",
                              formula: {
                                type: "value",
                                value: "Page",
                              },
                            },
                            {
                              name: "Else",
                              formula: {
                                type: "value",
                                value: "Component",
                              },
                            },
                          ],
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
        condition: {
          path: ["Variables", "isOpen"],
          type: "path",
        },
      },
      {
        tag: "div",
        type: "element",
        attrs: {},
        style: {
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: 4,
          position: "fixed",
        },
        events: [
          {
            type: "NodeEvent",
            actions: [
              {
                type: "Update Variable",
                value: "",
                variableName: "isOpen",
              },
            ],
            trigger: "click",
            preventDefault: false,
            stopPropagation: false,
          },
        ],
        children: [],
        classList: [],
        condition: {
          path: ["Variables", "isOpen"],
          type: "path",
        },
      },
    ],
    classList: [
      {
        name: "open",
        formula: {
          path: ["Variables", "isOpen"],
          type: "path",
        },
      },
    ],
  },
  events: [],
  variables: [
    {
      name: "isOpen",
      initialValue: "",
    },
    {
      name: "search",
      initialValue: "",
    },
  ],
  functions: [],
  queries: [
    {
      id: "223241b5-f83a-4241-a301-5a00578f7c73",
      _api: "57de9ff8-8520-46be-bd4f-f656880a3e4b",
      name: "components",
      type: "query",
      debounce: null,
      onFailed: null,
      throttle: 500,
      variables: {
        components__where___project___eq: {
          name: "components:where:_project:_eq",
          value: {
            path: ["Props", "projectId"],
            type: "path",
          },
        },
      },
      onCompleted: null,
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
                          value: "name",
                        },
                      },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "page",
                        },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
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
                                value: "id",
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
  onLoad: {
    type: "ComponentEvent",
    trigger: "ComponentLoaded",
    actions: [
      {
        name: "addressBarLoaded",
        type: "Custom",
      },
    ],
  },
};
