import { ComponentModel } from "ComponentModel";

export const ElementPanel: ComponentModel = {
  id: "64b9def4-2f2f-4809-9888-ceb41973ea38",
  name: "ElementPanel",
  props: [
    {
      name: "node",
      initialValue: {
        style: {},
      },
    },
    {
      name: "component",
      initialValue: {
        id: "123",
        nodes: {},
      },
    },
    {
      name: "nodeData",
      initialValue: {
        Props: {},
        Functions: {},
        Variables: {},
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
        tag: "div",
        type: "element",
        attrs: {},
        style: {
          height: "100%",
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
          position: "relative",
          alignItems: "stretch",
          flexShrink: 1,
          flexDirection: "column",
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
              fontSize: "14px",
              boxSizing: "border-box",
              alignItems: "center",
              flexDirection: "row",
            },
            events: [],
            children: [
              {
                tag: "li",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-200)",
                  height: "40px",
                  display: "flex",
                  padding: "8px",
                  flexGrow: 1,
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "40px",
                        display: "flex",
                        padding: "8px",
                        flexGrow: 1,
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        flexShrink: 1,
                        flexDirection: "row",
                        borderTopColor: "var(--primary-300)",
                        justifyContent: "center",
                        borderLeftColor: "var(--primary-300)",
                        borderRightColor: "var(--primary-300)",
                        borderBottomColor: "var(--primary-300)",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      },
                      className: "active",
                    },
                  ],
                  boxSizing: "border-box",
                  alignItems: "center",
                  flexShrink: 1,
                  flexDirection: "row",
                  borderTopColor: "var(--primary-300)",
                  justifyContent: "center",
                  borderLeftColor: "var(--primary-300)",
                  borderRightColor: "var(--primary-300)",
                  borderBottomColor: "var(--grey-300)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1px",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Update Variable",
                        value: "Style",
                        variableName: "tab",
                      },
                    ],
                    trigger: "click",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Style",
                    },
                  },
                ],
                classList: [
                  {
                    name: "active",
                    formula: {
                      name: "EQ",
                      type: "function",
                      arguments: [
                        {
                          name: "First",
                          formula: {
                            path: ["Variables", "tab"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "Style",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              {
                tag: "li",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-200)",
                  height: "40px",
                  display: "flex",
                  padding: "8px",
                  flexGrow: 1,
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "40px",
                        display: "flex",
                        padding: "8px",
                        flexGrow: 1,
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        flexShrink: 1,
                        flexDirection: "row",
                        borderTopColor: "var(--primary-300)",
                        justifyContent: "center",
                        borderLeftColor: "var(--primary-300)",
                        borderRightColor: "var(--primary-300)",
                        borderBottomColor: "var(--primary-300)",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      },
                      className: "active",
                    },
                  ],
                  boxSizing: "border-box",
                  alignItems: "center",
                  flexShrink: 1,
                  flexDirection: "row",
                  borderTopColor: "var(--primary-300)",
                  justifyContent: "center",
                  borderLeftColor: "var(--primary-300)",
                  borderRightColor: "var(--primary-300)",
                  borderBottomColor: "var(--grey-300)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1px",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Update Variable",
                        value: "Attributes",
                        variableName: "tab",
                      },
                    ],
                    trigger: "click",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Attributes",
                    },
                  },
                ],
                classList: [
                  {
                    name: "active",
                    formula: {
                      name: "EQ",
                      type: "function",
                      arguments: [
                        {
                          name: "First",
                          formula: {
                            path: ["Variables", "tab"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "Attributes",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              {
                tag: "li",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-200)",
                  height: "40px",
                  display: "flex",
                  padding: "8px",
                  flexGrow: 1,
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "40px",
                        display: "flex",
                        padding: "8px",
                        flexGrow: 1,
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        flexShrink: 1,
                        flexDirection: "row",
                        borderTopColor: "var(--primary-300)",
                        justifyContent: "center",
                        borderLeftColor: "var(--primary-300)",
                        borderRightColor: "var(--primary-300)",
                        borderBottomColor: "var(--primary-300)",
                        borderBottomStyle: "solid",
                        borderBottomWidth: "1px",
                      },
                      className: "active",
                    },
                  ],
                  boxSizing: "border-box",
                  alignItems: "center",
                  flexShrink: 1,
                  flexDirection: "row",
                  borderTopColor: "var(--primary-300)",
                  justifyContent: "center",
                  borderLeftColor: "var(--primary-300)",
                  borderRightColor: "var(--primary-300)",
                  borderBottomColor: "var(--grey-400)",
                  borderBottomStyle: "solid",
                  borderBottomWidth: "1px",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Update Variable",
                        value: "Events",
                        variableName: "tab",
                      },
                    ],
                    trigger: "click",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Events",
                    },
                  },
                ],
                classList: [
                  {
                    name: "active",
                    formula: {
                      name: "EQ",
                      type: "function",
                      arguments: [
                        {
                          name: "First",
                          formula: {
                            path: ["Variables", "tab"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "Events",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            ],
            classList: [],
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              flexGrow: 1,
              overflow: "auto",
              position: "relative",
              flexShrink: 1,
            },
            events: [],
            children: [
              {
                name: "SizeStyles",
                type: "component",
                attrs: {
                  style: {
                    path: ["Props", "node", "style"],
                    type: "path",
                  },
                },
                events: [
                  {
                    type: "ComponentEvent",
                    actions: [
                      {
                        data: {
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "style",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                path: ["Event"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
                      },
                      {
                        data: {
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "style",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                path: ["Event", "detail"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        type: "Debug",
                      },
                    ],
                    trigger: "change",
                  },
                ],
                children: [],
              },
              {
                tag: "style-editor",
                type: "element",
                attrs: {
                  value: {
                    type: "value",
                    value: "Value",
                  },
                  styles: {
                    name: "DEFAULT",
                    type: "function",
                    arguments: [
                      {
                        name: "Value",
                        formula: {
                          path: ["Props", "node", "style"],
                          type: "path",
                        },
                      },
                      {
                        name: "Default",
                        formula: {
                          name: "FROM_ENTRIES",
                          type: "function",
                          arguments: [
                            {
                              name: "List",
                              formula: {
                                name: "LIST",
                                type: "function",
                                varArgs: true,
                                arguments: [
                                  {
                                    formula: {
                                      name: "LIST",
                                      type: "function",
                                      varArgs: true,
                                      arguments: [
                                        {
                                          formula: {
                                            type: "value",
                                            value: "",
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
                },
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        data: {
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "style",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                path: ["Event", "detail"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
                      },
                    ],
                    trigger: "update",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [],
                classList: [],
              },
            ],
            classList: [],
            condition: {
              name: "EQ",
              type: "function",
              arguments: [
                {
                  name: "First",
                  formula: {
                    path: ["Variables", "tab"],
                    type: "path",
                  },
                },
                {
                  name: "Second",
                  formula: {
                    type: "value",
                    value: "Style",
                  },
                },
              ],
            },
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              flexGrow: 1,
              overflow: "auto",
              position: "relative",
              flexShrink: 1,
            },
            events: [],
            children: [
              {
                name: "ElementAttributes",
                type: "component",
                attrs: {
                  node: {
                    path: ["Props", "node"],
                    type: "path",
                  },
                  nodeData: {
                    path: ["Props", "nodeData"],
                    type: "path",
                  },
                  component: {
                    path: ["Props", "component"],
                    type: "path",
                  },
                },
                events: [
                  {
                    type: "ComponentEvent",
                    trigger: "nodeChanged",
                    actions: [
                      {
                        type: "Trigger Event",
                        event: "nodeChanged",
                        data: {
                          type: "path",
                          path: ["Event"],
                        },
                      },
                    ],
                  },
                ],
                children: [],
              },
            ],
            classList: [],
            condition: {
              name: "EQ",
              type: "function",
              arguments: [
                {
                  name: "First",
                  formula: {
                    path: ["Variables", "tab"],
                    type: "path",
                  },
                },
                {
                  name: "Second",
                  formula: {
                    type: "value",
                    value: "Attributes",
                  },
                },
              ],
            },
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              flexGrow: 1,
              overflow: "auto",
              position: "relative",
              flexShrink: 1,
            },
            events: [],
            children: [
              {
                tag: "element-events",
                type: "element",
                attrs: {
                  node: {
                    path: ["Props", "node"],
                    type: "path",
                  },
                  nodeData: {
                    path: ["Props", "nodeData"],
                    type: "path",
                  },
                  component: {
                    path: ["Props", "component"],
                    type: "path",
                  },
                },
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        data: {
                          path: ["Event", "detail"],
                          type: "path",
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
                      },
                    ],
                    trigger: "update",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [],
                classList: [],
                condition: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Variables", "tab"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        type: "value",
                        value: "Events",
                      },
                    },
                  ],
                },
              },
            ],
            classList: [],
            condition: {
              name: "EQ",
              type: "function",
              arguments: [
                {
                  name: "First",
                  formula: {
                    path: ["Variables", "tab"],
                    type: "path",
                  },
                },
                {
                  name: "Second",
                  formula: {
                    type: "value",
                    value: "Events",
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
  events: [],
  variables: [
    {
      name: "tab",
      initialValue: "Style",
    },
  ],
  functions: [],
  queries: [],
};
