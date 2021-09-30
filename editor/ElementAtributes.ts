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
                            type: "string",
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
                                  type: "string",
                                  value: "untitled",
                                },
                              },
                              {
                                formula: {
                                  type: "string",
                                  value: "empty",
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
                    type: "formula",
                    formula: {
                      type: "path",
                      path: ["ListItem", "Item", "0"],
                    },
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
                                type: "string",
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
                    type: "formula",
                    formula: {
                      type: "path",
                      path: ["ListItem", "Item", "1", "value"],
                    },
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
                                type: "string",
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
                                            type: "string",
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
                    type: "formula",
                    formula: {
                      type: "function",
                      name: "IF",
                      arguments: [
                        {
                          formula: {
                            type: "function",
                            name: "EQ",
                            arguments: [
                              {
                                formula: {
                                  type: "path",
                                  path: ["ListItem", "Item", "1", "type"],
                                },
                              },
                              {
                                formula: {
                                  type: "string",
                                  value: "formula",
                                },
                              },
                            ],
                          },
                        },
                        {
                          formula: {
                            type: "path",
                            path: ["ListItem", "Item", "1"],
                          },
                        },
                        {
                          formula: {
                            type: "null",
                          },
                        },
                      ],
                    },
                  },
                  data: {
                    type: "formula",
                    formula: {
                      type: "path",
                      path: ["Props", "nodeData"],
                    },
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
                                type: "string",
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
                                      type: "function",
                                      name: "FROM_ENTRIES",
                                      arguments: [
                                        {
                                          formula: {
                                            type: "function",
                                            name: "LIST",
                                            arguments: [
                                              {
                                                formula: {
                                                  type: "function",
                                                  name: "LIST",
                                                  arguments: [
                                                    {
                                                      formula: {
                                                        type: "string",
                                                        value: "type",
                                                      },
                                                    },
                                                    {
                                                      formula: {
                                                        type: "string",
                                                        value: "formula",
                                                      },
                                                    },
                                                  ],
                                                },
                                              },
                                              {
                                                formula: {
                                                  type: "function",
                                                  name: "LIST",
                                                  arguments: [
                                                    {
                                                      formula: {
                                                        type: "string",
                                                        value: "formula",
                                                      },
                                                    },
                                                    {
                                                      formula: {
                                                        type: "path",
                                                        path: [
                                                          "Event",
                                                          "detail",
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
                                type: "string",
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
