import { ComponentModel } from "ComponentModel";

export const TreeNode: ComponentModel = {
  id: "b7c2e956-79ad-4063-a177-7c4e97358f5e",
  name: "TreeNode",
  props: [
    {
      name: "id",
      initialValue: "0",
    },
    {
      name: "node",
      initialValue: {
        type: "fragment",
        children: [
          {
            tag: "li",
            type: "element",
            attrs: {},
            style: {
              padding: "8px",
              position: "relative",
              boxSizing: "border-box",
              alignItems: "center",
              paddingTop: "0",
              paddingLeft: "0",
              paddingRight: "0",
              flexDirection: "row",
              listStyleType: "none",
              paddingBottom: "0",
            },
            events: [],
            repeat: {
              path: ["Props", "node", "children"],
              type: "path",
            },
            children: [],
          },
        ],
      },
    },
    {
      name: "selectedNodeId",
      initialValue: "0",
    },
    {
      name: "highlightedNodeId",
      initialValue: "",
    },
    {
      name: "indent",
      initialValue: "0",
    },
  ],
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  _featureFlag: null,
  root: {
    tag: "div",
    type: "element",
    attrs: {
      draggable: {
        type: "value",
        value: "true",
      },
    },
    style: {},
    events: [],
    children: [
      {
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
              gap: "2",
              color: "var(--grey-100)",
              height: "6",
              display: "flex",
              position: "relative",
              variants: [
                {
                  style: {
                    backgroundColor: "var(--grey-500)",
                  },
                  className: "highlighted",
                },
                {
                  style: {
                    color: "var(--grey-100)",
                    backgroundColor: "var(--primary-300)",
                  },
                  className: "selected",
                },
              ],
              alignItems: "center",
              paddingLeft: "var(--indent)",
              paddingRight: "4",
              listStyleType: "none",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    data: {
                      path: ["Props", "id"],
                      type: "path",
                    },
                    type: "Trigger Event",
                    event: "selectNode",
                  },
                ],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
              {
                type: "NodeEvent",
                actions: [
                  {
                    data: {
                      path: ["Props", "id"],
                      type: "path",
                    },
                    type: "Trigger Event",
                    event: "highlightNode",
                  },
                ],
                trigger: "mouseenter",
                preventDefault: false,
                stopPropagation: false,
              },
              {
                type: "NodeEvent",
                actions: [
                  {
                    data: undefined,
                    type: "Trigger Event",
                    event: "highlightNode",
                  },
                ],
                trigger: "mouseleave",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [
              {
                tag: "button",
                type: "element",
                attrs: {},
                style: {
                  width: "4",
                  height: "4",
                  display: "inline-flex",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "center",
                  borderRadius: 3,
                  flexDirection: "row",
                  justifyContent: "center",
                  borderTopLeftRadius: "0",
                  borderTopRightRadius: "0",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Update Variable",
                        value: {
                          name: "NOT",
                          type: "function",
                          arguments: [
                            {
                              name: "Input",
                              formula: {
                                path: ["Variables", "expanded"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        variableName: "expanded",
                      },
                    ],
                    trigger: "click",
                    preventDefault: false,
                    stopPropagation: true,
                  },
                ],
                children: [
                  {
                    name: "IconChevronRight",
                    type: "component",
                    attrs: {
                      size: {
                        type: "value",
                        value: "18",
                      },
                      color: {
                        type: "value",
                        value: "#ffffff",
                      },
                    },
                    events: [],
                    children: [],
                    condition: {
                      name: "NOT",
                      type: "function",
                      arguments: [
                        {
                          name: "Input",
                          formula: {
                            path: ["Variables", "expanded"],
                            type: "path",
                          },
                        },
                      ],
                    },
                  },
                  {
                    name: "IconChevronDown",
                    type: "component",
                    attrs: {
                      size: {
                        type: "value",
                        value: "18",
                      },
                      color: {
                        type: "value",
                        value: "#ffffff",
                      },
                    },
                    events: [],
                    children: [],
                    condition: {
                      path: ["Variables", "expanded"],
                      type: "path",
                    },
                  },
                ],
                classList: [],
                condition: {
                  path: [],
                  type: "path",
                },
              },
              {
                name: "IconElement",
                type: "component",
                attrs: {
                  size: {
                    type: "value",
                    value: "18",
                  },
                  color: {
                    type: "value",
                    value: "#ffffff",
                  },
                },
                events: [],
                children: [],
                condition: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Props", "node", "type"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        type: "string",
                        value: "element",
                      },
                    },
                  ],
                },
              },
              {
                name: "IconComponent",
                type: "component",
                attrs: {
                  size: {
                    type: "value",
                    value: "18",
                  },
                  color: {
                    type: "value",
                    value: "#ffffff",
                  },
                },
                events: [],
                children: [],
                condition: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Props", "node", "type"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        type: "string",
                        value: "component",
                      },
                    },
                  ],
                },
              },
              {
                name: "IconText",
                type: "component",
                attrs: {
                  size: {
                    type: "value",
                    value: "18",
                  },
                  color: {
                    type: "value",
                    value: "#ffffff",
                  },
                },
                events: [],
                children: [],
                condition: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Props", "node", "type"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        type: "string",
                        value: "text",
                      },
                    },
                  ],
                },
              },
              {
                tag: "span",
                type: "element",
                attrs: {},
                style: {
                  flex: "1",
                  margin: "0px",
                  display: "inline",
                  padding: "0px",
                  fontSize: "12px",
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
                        name: "IF",
                        type: "function",
                        arguments: [
                          {
                            name: "If",
                            formula: {
                              name: "EQ",
                              type: "function",
                              arguments: [
                                {
                                  name: "First",
                                  formula: {
                                    name: "GET",
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
                                        name: "Item",
                                        formula: {
                                          type: "string",
                                          value: "type",
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  name: "Second",
                                  formula: {
                                    type: "string",
                                    value: "element",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            name: "Then",
                            formula: {
                              name: "CONCAT",
                              type: "function",
                              varArgs: true,
                              arguments: [
                                {
                                  formula: {
                                    type: "string",
                                    value: "<",
                                  },
                                },
                                {
                                  formula: {
                                    path: ["Props", "node", "tag"],
                                    type: "path",
                                  },
                                },
                                {
                                  formula: {
                                    type: "string",
                                    value: ">",
                                  },
                                },
                              ],
                            },
                          },
                          {
                            name: "Else",
                            formula: {
                              name: "IF",
                              type: "function",
                              arguments: [
                                {
                                  name: "If",
                                  formula: {
                                    name: "EQ",
                                    type: "function",
                                    arguments: [
                                      {
                                        name: "First",
                                        formula: {
                                          path: ["Props", "node", "type"],
                                          type: "path",
                                        },
                                      },
                                      {
                                        name: "Second",
                                        formula: {
                                          type: "string",
                                          value: "fragment",
                                        },
                                      },
                                    ],
                                  },
                                },
                                {
                                  name: "Then",
                                  formula: {
                                    type: "string",
                                    value: "<>",
                                  },
                                },
                                {
                                  name: "Else",
                                  formula: {
                                    name: "IF",
                                    type: "function",
                                    arguments: [
                                      {
                                        name: "If",
                                        formula: {
                                          name: "EQ",
                                          type: "function",
                                          arguments: [
                                            {
                                              name: "First",
                                              formula: {
                                                path: ["Props", "node", "type"],
                                                type: "path",
                                              },
                                            },
                                            {
                                              name: "Second",
                                              formula: {
                                                type: "string",
                                                value: "component",
                                              },
                                            },
                                          ],
                                        },
                                      },
                                      {
                                        name: "Then",
                                        formula: {
                                          path: ["Props", "node", "name"],
                                          type: "path",
                                        },
                                      },
                                      {
                                        name: "Else",
                                        formula: {
                                          type: "string",
                                          value: "Text",
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
                  },
                ],
                classList: [],
              },
              {
                type: "component",
                name: "IconEvent",
                condition: {
                  type: "path",
                  path: ["Props", "node", "events", "length"],
                },
                attrs: {
                  size: {
                    type: "value",
                    value: 18,
                  },
                  color: {
                    type: "value",
                    value: "var(--grey-400)",
                  },
                },
                children: [],
                events: [],
              },
              {
                type: "component",
                name: "IconRepeat",
                condition: {
                  type: "path",
                  path: ["Props", "node", "repeat"],
                },
                attrs: {
                  size: {
                    type: "value",
                    value: 18,
                  },
                  color: {
                    type: "value",
                    value: "var(--grey-400)",
                  },
                },
                children: [],
                events: [],
              },
            ],
            classList: [
              {
                name: "selected",
                formula: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Props", "id"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        path: ["Props", "selectedNodeId"],
                        type: "path",
                      },
                    },
                  ],
                },
              },
              {
                name: "highlighted",
                formula: {
                  name: "EQ",
                  type: "function",
                  arguments: [
                    {
                      name: "First",
                      formula: {
                        path: ["Props", "id"],
                        type: "path",
                      },
                    },
                    {
                      name: "Second",
                      formula: {
                        path: ["Props", "highlightedNodeId"],
                        type: "path",
                      },
                    },
                  ],
                },
              },
            ],
            styleVariables: [
              {
                name: "indent",
                value: {
                  name: "CONCAT",
                  type: "function",
                  varArgs: true,
                  arguments: [
                    {
                      formula: {
                        path: ["Props", "indent"],
                        type: "path",
                      },
                    },
                    {
                      formula: {
                        type: "string",
                        value: "rem",
                      },
                    },
                  ],
                },
              },
            ],
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
              borderLeftWidth: "0",
            },
            events: [],
            children: [
              {
                tag: "li",
                type: "element",
                attrs: {},
                style: {
                  padding: "8px",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "center",
                  paddingTop: "0",
                  paddingLeft: "0",
                  paddingRight: "0",
                  flexDirection: "row",
                  listStyleType: "none",
                  paddingBottom: "0",
                },
                events: [],
                repeat: {
                  path: ["Props", "node", "children"],
                  type: "path",
                },
                children: [
                  {
                    name: "TreeNode",
                    type: "component",
                    attrs: {
                      id: {
                        type: "formula",
                        formula: {
                          name: "CONCAT",
                          type: "function",
                          varArgs: true,
                          arguments: [
                            {
                              formula: {
                                path: ["Props", "id"],
                                type: "path",
                              },
                            },
                            {
                              formula: {
                                type: "string",
                                value: ".",
                              },
                            },
                            {
                              formula: {
                                path: ["ListItem", "Index"],
                                type: "path",
                              },
                            },
                          ],
                        },
                      },
                      node: {
                        type: "formula",
                        formula: {
                          path: ["ListItem", "Item"],
                          type: "path",
                        },
                      },
                      indent: {
                        type: "formula",
                        formula: {
                          name: "ADD",
                          type: "function",
                          arguments: [
                            {
                              name: "First",
                              formula: {
                                path: ["Props", "indent"],
                                type: "path",
                              },
                            },
                            {
                              name: "Second",
                              formula: {
                                type: "number",
                                value: 1,
                              },
                            },
                          ],
                        },
                      },
                      selectedNodeId: {
                        type: "formula",
                        formula: {
                          path: ["Props", "selectedNodeId"],
                          type: "path",
                        },
                      },
                      highlightedNodeId: {
                        type: "formula",
                        formula: {
                          path: ["Props", "highlightedNodeId"],
                          type: "path",
                        },
                      },
                    },
                    events: [
                      {
                        type: "ComponentEvent",
                        actions: [
                          {
                            data: {
                              path: ["Event"],
                              type: "path",
                            },
                            type: "Trigger Event",
                            event: "selectNode",
                          },
                        ],
                        trigger: "selectNode",
                      },
                      {
                        type: "ComponentEvent",
                        actions: [
                          {
                            data: {
                              path: ["Event"],
                              type: "path",
                            },
                            type: "Trigger Event",
                            event: "highlightNode",
                          },
                        ],
                        trigger: "highlightNode",
                      },
                    ],
                    children: [],
                  },
                ],
                classList: [],
              },
            ],
            classList: [],
            condition: {
              path: ["Variables", "expanded"],
              type: "path",
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
      name: "expanded",
      initialValue: {
        name: "BOOLEAN",
        type: "function",
        arguments: [
          {
            name: "Input",
            formula: {
              type: "boolean",
              value: true,
            },
          },
        ],
      },
    },
  ],
  functions: [],
  queries: [],
};
