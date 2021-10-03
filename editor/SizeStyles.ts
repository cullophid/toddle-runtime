import { ComponentModel } from "ComponentModel";

export const SizeStyles: ComponentModel = {
  id: "4d5c161c-89e9-4c3c-9364-68e0a5b894a0",
  name: "SizeStyles",
  props: [
    {
      name: "style",
      initialValue: {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
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
          gap: "2",
          display: "flex",
          position: "relative",
          flexDirection: "column",
        },
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
                tag: "h3",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-100)",
                  width: "auto",
                  margin: "0px",
                  padding: "0px",
                  fontSize: "16px",
                  position: "relative",
                  boxSizing: "border-box",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "Size",
                    },
                  },
                ],
                classList: [],
              },
            ],
            classList: [],
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              gap: "2",
              display: "flex",
              position: "relative",
              paddingLeft: "2",
              paddingRight: "2",
              flexDirection: "column",
            },
            events: [],
            children: [
              {
                tag: "div",
                type: "element",
                attrs: {},
                style: {
                  gap: "2",
                  display: "flex",
                  position: "relative",
                },
                events: [],
                children: [
                  {
                    name: "UnitInput",
                    type: "component",
                    attrs: {
                      label: {
                        type: "value",
                        value: "W",
                      },
                      value: {
                        path: ["Props", "style", "width"],
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
                                    path: ["Props", "style"],
                                    type: "path",
                                  },
                                },
                                {
                                  name: "Key",
                                  formula: {
                                    type: "value",
                                    value: "width",
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
                            event: "change",
                          },
                        ],
                        trigger: "input",
                      },
                    ],
                    children: [],
                  },
                  {
                    name: "UnitInput",
                    type: "component",
                    attrs: {
                      label: {
                        type: "value",
                        value: "H",
                      },
                      value: {
                        path: ["Props", "style", "height"],
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
                                    path: ["Props", "style"],
                                    type: "path",
                                  },
                                },
                                {
                                  name: "Key",
                                  formula: {
                                    type: "value",
                                    value: "height",
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
                            event: "change",
                          },
                        ],
                        trigger: "input",
                      },
                    ],
                    children: [],
                  },
                ],
                classList: [],
              },
              {
                tag: "div",
                type: "element",
                attrs: {},
                style: {
                  gap: "2",
                  display: "flex",
                  position: "relative",
                },
                events: [],
                children: [
                  {
                    name: "UnitInput",
                    type: "component",
                    attrs: {
                      label: {
                        type: "value",
                        value: "Min W",
                      },
                      value: {
                        path: ["Props", "style", "minWidth"],
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
                                    path: ["Props", "style"],
                                    type: "path",
                                  },
                                },
                                {
                                  name: "Key",
                                  formula: {
                                    type: "value",
                                    value: "minWidth",
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
                            event: "change",
                          },
                        ],
                        trigger: "input",
                      },
                    ],
                    children: [],
                  },
                  {
                    name: "UnitInput",
                    type: "component",
                    attrs: {
                      label: {
                        type: "value",
                        value: "Min H",
                      },
                      value: {
                        path: ["Props", "style", "minHeight"],
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
                                    path: ["Props", "style"],
                                    type: "path",
                                  },
                                },
                                {
                                  name: "Key",
                                  formula: {
                                    type: "value",
                                    value: "minHeight",
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
                            event: "change",
                          },
                        ],
                        trigger: "input",
                      },
                    ],
                    children: [],
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
