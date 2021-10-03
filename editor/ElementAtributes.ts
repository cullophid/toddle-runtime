import { ComponentModel } from "ComponentModel";

export const ElementAttributes: ComponentModel = {
  id: "b436cbfb-c23a-4c5c-b5a9-aa649bf25a84",
  name: "ElementAttributes",
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
    style: {
      color: "var(--grey-200)",
      padding: "2",
    },
    events: [],
    children: [
      {
        type: "element",
        tag: "div",
        attrs: {},
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        events: [],
        classList: [],
        children: [
          {
            type: "element",
            tag: "label",
            attrs: {},
            style: {},
            events: [],
            classList: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "Show",
                },
              },
            ],
          },
          {
            type: "element",
            tag: "formula-editor",
            attrs: {
              formula: {
                type: "path",
                path: ["Props", "node", "show"],
              },
              data: {
                type: "path",
                path: ["Props", "nodeData"],
              },
            },
            style: {},
            events: [
              {
                type: "NodeEvent",
                trigger: "update",
                actions: [
                  {
                    type: "Trigger Event",
                    event: "nodeChanged",
                    data: {
                      type: "function",
                      name: "SET",
                      arguments: [
                        {
                          formula: {
                            type: "path",
                            path: ["Props", "node"],
                          },
                        },
                        {
                          formula: {
                            type: "value",
                            value: "show",
                          },
                        },
                        {
                          formula: {
                            type: "path",
                            path: ["Event", "detail"],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: "Debug",
                    label: "formula change",
                    data: {
                      type: "path",
                      path: ["Event", "detail"],
                    },
                  },
                ],
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            classList: [],
            children: [],
          },
        ],
      },
      {
        type: "element",
        tag: "div",
        attrs: {},
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        events: [],
        classList: [],
        children: [
          {
            type: "element",
            tag: "label",
            attrs: {},
            style: {},
            events: [],
            classList: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "Repeat",
                },
              },
            ],
          },
          {
            type: "element",
            tag: "formula-editor",
            attrs: {
              formula: {
                type: "path",
                path: ["Props", "node", "repeat"],
              },
              data: {
                type: "path",
                path: ["Props", "nodeData"],
              },
            },
            style: {},
            events: [
              {
                type: "NodeEvent",
                trigger: "update",
                actions: [
                  {
                    type: "Trigger Event",
                    event: "nodeChanged",
                    data: {
                      type: "function",
                      name: "SET",
                      arguments: [
                        {
                          formula: {
                            type: "path",
                            path: ["Props", "node"],
                          },
                        },
                        {
                          formula: {
                            type: "value",
                            value: "repeat",
                          },
                        },
                        {
                          formula: {
                            type: "path",
                            path: ["Event", "detail"],
                          },
                        },
                      ],
                    },
                  },
                  {
                    type: "Debug",
                    label: "formula change",
                    data: {
                      type: "path",
                      path: ["Event", "detail"],
                    },
                  },
                ],
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            classList: [],
            children: [],
          },
        ],
      },
      {
        type: "element",
        tag: "div",
        attrs: {},
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2",
        },
        events: [],
        classList: [],
        children: [
          {
            type: "element",
            tag: "label",
            attrs: {},
            style: {},
            events: [],
            classList: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "Tag",
                },
              },
            ],
          },
          {
            type: "element",
            tag: "input",
            attrs: {
              value: {
                type: "path",
                path: ["Props", "node", "tag"],
              },
            },
            children: [],
            style: {},
            classList: [],
            events: [
              {
                type: "NodeEvent",
                trigger: "change",
                actions: [
                  {
                    type: "Trigger Event",
                    event: "nodeChanged",
                    data: {
                      type: "function",
                      name: "SET",
                      arguments: [
                        {
                          formula: {
                            type: "path",
                            path: ["Props", "node"],
                          },
                        },
                        {
                          formula: {
                            type: "value",
                            value: "tag",
                          },
                        },
                        {
                          formula: {
                            type: "path",
                            path: ["Event", "target", "value"],
                          },
                        },
                      ],
                    },
                  },
                ],
                preventDefault: false,
                stopPropagation: false,
              },
            ],
          },
        ],
      },
      {
        type: "element",
        tag: "div",
        attrs: {},
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        events: [],
        classList: [],
        children: [
          {
            type: "element",
            tag: "h2",
            attrs: {},
            style: {},
            events: [],
            classList: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "Attributes",
                },
              },
            ],
          },
          {
            type: "element",
            tag: "button",

            attrs: {},
            style: {},
            events: [
              {
                type: "NodeEvent",
                trigger: "click",
                actions: [
                  {
                    type: "Trigger Event",
                    event: "nodeChanged",
                    data: {
                      type: "function",
                      name: "SET",
                      arguments: [
                        {
                          formula: {
                            type: "path",
                            path: ["Props", "node"],
                          },
                        },
                        {
                          formula: {
                            type: "value",
                            value: "attrs",
                          },
                        },
                        {
                          formula: {
                            type: "function",
                            name: "SET",
                            arguments: [
                              {
                                formula: {
                                  type: "path",
                                  path: ["Props", "node", "attrs"],
                                },
                              },
                              {
                                formula: {
                                  type: "value",
                                  value: "untitled",
                                },
                              },
                              {
                                formula: {
                                  type: "value",
                                  value: { type: "value", value: "empty" },
                                },
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                ],
                preventDefault: false,
                stopPropagation: true,
              },
            ],
            classList: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "ADD",
                },
              },
            ],
          },
        ],
      },
      {
        type: "element",
        tag: "ul",
        attrs: {},
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "2",
        },
        events: [],
        classList: [],
        children: [
          {
            type: "element",
            tag: "li",
            repeat: {
              type: "function",
              name: "ENTRIES",
              arguments: [
                {
                  name: "object",
                  formula: {
                    type: "path",
                    path: ["Props", "node", "attrs"],
                  },
                },
              ],
            },
            attrs: {},
            style: {
              display: "flex",
              alignItems: "center",
              gap: "2",
            },
            events: [],
            classList: [],
            children: [
              {
                type: "element",
                tag: "input",
                attrs: {
                  value: {
                    type: "path",
                    path: ["ListItem", "Item", "0"],
                  },
                },
                style: {
                  flex: 1,
                  width: "0px",
                  backgroundColor: "var(--grey-600)",
                },
                events: [
                  {
                    type: "NodeEvent",
                    trigger: "input",
                    actions: [],
                    stopPropagation: true,
                    preventDefault: false,
                  },
                  {
                    type: "NodeEvent",
                    trigger: "change",
                    actions: [
                      {
                        type: "Trigger Event",
                        event: "nodeChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "node"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "attrs",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "SET",
                                arguments: [
                                  {
                                    formula: {
                                      type: "function",
                                      name: "REMOVE",
                                      arguments: [
                                        {
                                          formula: {
                                            type: "path",
                                            path: ["Props", "node", "attrs"],
                                          },
                                        },
                                        {
                                          formula: {
                                            type: "path",
                                            path: ["ListItem", "Item", "0"],
                                          },
                                        },
                                      ],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Event", "target", "value"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["ListItem", "Item", "1"],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                    preventDefault: false,
                    stopPropagation: true,
                  },
                ],
                classList: [],
                children: [],
              },
              {
                type: "element",
                tag: "input",
                attrs: {
                  value: {
                    type: "function",
                    name: "APPLY_FORMULA",
                    arguments: [
                      {
                        formula: {
                          type: "path",
                          path: ["ListItem", "Item", "1"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "nodeData"],
                        },
                      },
                    ],
                  },
                },
                style: {
                  flex: 1,
                  width: "0px",
                  backgroundColor: "var(--grey-600)",
                },
                events: [
                  {
                    type: "NodeEvent",
                    trigger: "keydown",
                    actions: [],
                    stopPropagation: true,
                    preventDefault: false,
                  },
                  {
                    type: "NodeEvent",
                    trigger: "change",
                    actions: [
                      {
                        type: "Trigger Event",
                        event: "nodeChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "node"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "attrs",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "SET",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "node", "attrs"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["ListItem", "Item", "0"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "record",
                                      entries: [
                                        {
                                          name: "type",
                                          formula: {
                                            type: "value",
                                            value: "value",
                                          },
                                        },
                                        {
                                          name: "value",
                                          formula: {
                                            type: "path",
                                            path: ["Event", "target", "value"],
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
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                classList: [],
                children: [],
              },
              {
                type: "element",
                tag: "formula-editor",

                attrs: {
                  formula: {
                    type: "path",
                    path: ["ListItem", "Item", "1"],
                  },
                  data: {
                    type: "path",
                    path: ["Props", "nodeData"],
                  },
                },
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    trigger: "update",
                    actions: [
                      {
                        type: "Trigger Event",
                        event: "nodeChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "node"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "attrs",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "SET",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "node", "attrs"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["ListItem", "Item", "0"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Event", "detail"],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        type: "Debug",
                        label: "formula change",
                        data: {
                          type: "path",
                          path: ["Event", "detail"],
                        },
                      },
                    ],
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                classList: [],
                children: [],
              },
              {
                type: "element",
                tag: "button",

                attrs: {},
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    trigger: "click",
                    actions: [
                      {
                        type: "Trigger Event",
                        event: "nodeChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "node"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "attrs",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "REMOVE",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "node", "attrs"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["ListItem", "Item", "0"],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                classList: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "X",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    classList: [],
  },
  events: [],
  variables: [],
  functions: [],
  queries: [],
};
