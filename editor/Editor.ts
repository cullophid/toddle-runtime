import { ComponentModel } from "ComponentModel";

export const Editor: ComponentModel = {
  id: "df7d3ca0-1a0f-4408-b4da-061803dcdf71",
  name: "Editor",
  props: [
    {
      name: "project",
      initialValue: { id: "1234" },
    },
    {
      name: "component",
      initialValue: { id: "1234" },
    },
    {
      name: "components",
      initialValue: [{ id: "1234" }],
    },
    {
      name: "selectedNode",
      initialValue: { type: "element", tag: "div" },
    },
    {
      name: "selectedNodeId",
      initialValue: "0.0",
    },
    {
      name: "componentData",
      initialValue: { Variables: {}, Props: {} },
    },
    {
      name: "highlightedNodeId",
      initialValue: "0",
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
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      height: "100%",
      display: "flex",
      position: "relative",
      alignItems: "stretch",
      fontFamily: "Montserrat",
      flexDirection: "column",
      backgroundColor: "var(--grey-600)",
    },
    events: [],
    children: [
      {
        tag: "header",
        type: "element",
        attrs: {},
        style: {
          gap: "4",
          height: "10",
          display: "flex",
          position: "relative",
          alignItems: "center",
          flexShrink: 0,
          paddingLeft: "4",
          paddingRight: "4",
          flexDirection: "row",
          backgroundColor: "var(--grey-900)",
        },
        events: [],
        children: [
          {
            name: "MainMenu",
            type: "component",
            attrs: {},
            events: [],
            children: [],
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              position: "relative",
              backgroundColor: "var(--grey-700)",
              borderTopLeftRadius: "2",
              borderTopRightRadius: "2",
              borderBottomLeftRadius: "2",
              borderBottomRightRadius: "2",
            },
            events: [],
            children: [
              {
                tag: "button",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-300)",
                  height: "7",
                  display: "inline-flex",
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "7",
                        display: "inline-flex",
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        paddingLeft: "20px",
                        borderRadius: 3,
                        paddingRight: "20px",
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "var(--grey-800)",
                        borderRightColor: "var(--grey-900)",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "0",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      },
                      className: "selected",
                    },
                  ],
                  boxSizing: "border-box",
                  fontSize: "12px",
                  alignItems: "center",
                  paddingLeft: "20px",
                  borderRadius: 3,
                  paddingRight: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  backgroundColor: "var(--grey-800)",
                  borderRightColor: "var(--grey-900)",
                  borderRightStyle: "solid",
                  borderRightWidth: "1px",
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
                        type: "Update Query",
                        value: "design",
                        paramName: "view",
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
                      value: "Design",
                    },
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
                            path: ["Props", "view"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "design",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              {
                tag: "button",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-300)",
                  height: "7",
                  display: "inline-flex",
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "7",
                        display: "inline-flex",
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        paddingLeft: "20px",
                        borderRadius: 3,
                        paddingRight: "20px",
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "var(--grey-800)",
                        borderRightColor: "var(--grey-900)",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "0",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "0",
                      },
                      className: "selected",
                    },
                  ],
                  boxSizing: "border-box",
                  fontSize: "12px",
                  alignItems: "center",
                  paddingLeft: "20px",
                  borderRadius: "3",
                  paddingRight: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRightColor: "var(--grey-900)",
                  borderRightStyle: "solid",
                  borderRightWidth: "1px",
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
                        type: "Update Query",
                        value: "data",
                        paramName: "view",
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
                      value: "Data",
                    },
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
                            path: ["Props", "view"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "data",
                          },
                        },
                      ],
                    },
                  },
                ],
              },
              {
                tag: "button",
                type: "element",
                attrs: {},
                style: {
                  color: "var(--grey-300)",
                  height: "7",
                  display: "inline-flex",
                  position: "relative",
                  variants: [
                    {
                      style: {
                        color: "var(--primary-300)",
                        height: "7",
                        display: "inline-flex",
                        position: "relative",
                        boxSizing: "border-box",
                        alignItems: "center",
                        paddingLeft: "20px",
                        borderRadius: 3,
                        paddingRight: "20px",
                        flexDirection: "row",
                        justifyContent: "center",
                        backgroundColor: "var(--grey-800)",
                        borderRightColor: "var(--grey-900)",
                        borderRightStyle: "solid",
                        borderRightWidth: "1px",
                        borderTopLeftRadius: "0",
                        borderTopRightRadius: "1",
                        borderBottomLeftRadius: "0",
                        borderBottomRightRadius: "1",
                      },
                      className: "selected",
                    },
                  ],
                  boxSizing: "border-box",
                  fontSize: "12px",
                  alignItems: "center",
                  paddingLeft: "20px",
                  borderRadius: "3",
                  paddingRight: "20px",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRightColor: "var(--grey-900)",
                  borderRightStyle: "solid",
                  borderRightWidth: "1px",
                  borderTopLeftRadius: "0",
                  borderTopRightRadius: "1",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "1",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Update Query",
                        value: "preview",
                        paramName: "view",
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
                      value: "Preview",
                    },
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
                            path: ["Props", "view"],
                            type: "path",
                          },
                        },
                        {
                          name: "Second",
                          formula: {
                            type: "value",
                            value: "preview",
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
            name: "AddressBar",
            type: "component",
            attrs: {
              component: {
                path: ["Props", "component", "name"],
                type: "path",
              },
              projectId: {
                path: ["Props", "project", "id"],
                type: "path",
              },
            },
            events: [
              {
                type: "ComponentEvent",
                actions: [
                  {
                    type: "Update Query",
                    value: {
                      path: ["Event"],
                      type: "path",
                    },
                    paramName: "component",
                  },
                  {
                    type: "Trigger Event",
                    event: "componentChanged",
                    data: {
                      type: "function",
                      name: "FIND",
                      arguments: [
                        {
                          name: "List",
                          formula: {
                            path: ["Props", "components"],
                            type: "path",
                          },
                        },
                        {
                          name: "Fx",
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
                                  path: ["Event"],
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
                trigger: "change",
              },
            ],
            children: [],
          },
          {
            tag: "span",
            type: "element",
            attrs: {},
            style: {
              color: "var(--grey-200)",
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
                  type: "value",
                  value: "Loading",
                },
                condition: {
                  path: ["Mutations", "updateComponent", "isLoading"],
                  type: "path",
                },
              },
              {
                type: "text",
                value: {
                  type: "value",
                  value: "saved",
                },
                condition: {
                  name: "NOT",
                  type: "function",
                  arguments: [
                    {
                      name: "Input",
                      formula: {
                        path: ["Mutations", "updateComponent", "isLoading"],
                        type: "path",
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
      {
        tag: "main",
        type: "element",
        attrs: {},
        style: {
          display: "flex",
          flexGrow: 1,
          overflow: "hidden",
          position: "relative",
          alignItems: "stretch",
          flexShrink: 1,
          flexDirection: "row",
        },
        events: [],
        children: [
          {
            name: "LeftPanel",
            type: "component",
            attrs: {
              component: {
                path: ["Props", "component"],
                type: "path",
              },
              components: {
                path: ["Props", "components"],
                type: "path",
              },
              selectedNode: {
                path: ["Props", "selectedNode"],
                type: "path",
              },
              selectedNodeId: {
                path: ["Props", "selectedNodeId"],
                type: "path",
              },
              highlightedNodeId: {
                path: ["Props", "highlightedNodeId"],
                type: "path",
              },
            },
            events: [
              {
                type: "ComponentEvent",
                actions: [
                  {
                    type: "Trigger Event",
                    data: {
                      path: ["Event"],
                      type: "path",
                    },
                    event: "nodeSelected",
                  },
                ],
                trigger: "nodeSelected",
              },
              {
                type: "ComponentEvent",
                actions: [
                  {
                    type: "Trigger Event",
                    data: {
                      path: ["Event"],
                      type: "path",
                    },
                    event: "nodeHighlighted",
                  },
                ],
                trigger: "nodeHighlighted",
              },
              {
                type: "ComponentEvent",
                actions: [
                  {
                    type: "Trigger Event",
                    data: {
                      path: ["Event"],
                      type: "path",
                    },
                    event: "componentChanged",
                  },
                ],
                trigger: "componentChanged",
              },
            ],
            children: [],
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              display: "flex",
              flexGrow: 1,
              position: "relative",
              alignItems: "center",
              flexShrink: 1,
              justifyContent: "center",
              backgroundColor: "var(--grey-600)",
              padding: "2",
            },
            events: [],
            children: [
              {
                tag: "design-canvas",
                type: "element",
                attrs: {
                  data: {
                    path: ["Props", "componentData"],
                    type: "path",
                  },
                  component: {
                    path: ["Props", "component"],
                    type: "path",
                  },
                  components: {
                    path: ["Props", "components"],
                    type: "path",
                  },
                  selectedNodeId: {
                    path: ["Props", "selectedNodeId"],
                    type: "path",
                  },
                  highlightedNodeId: {
                    path: ["Props", "highlightedNodeId"],
                    type: "path",
                  },
                },
                style: {
                  width: "100%",
                  height: "100%",
                  display: "block",
                  position: "relative",
                },
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Trigger Event",
                        data: {
                          path: ["Event", "detail"],
                          type: "path",
                        },
                        event: "nodeHighlighted",
                      },
                    ],
                    trigger: "highlight",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        type: "Trigger Event",
                        data: {
                          path: ["Event", "detail"],
                          type: "path",
                        },
                        event: "nodeSelected",
                      },
                    ],
                    trigger: "select",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [],
                classList: [
                  {
                    name: "class",
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
              width: "64",
              backgroundColor: "var(--grey-800)",
            },
            events: [],
            children: [
              {
                name: "ElementPanel",
                type: "component",
                condition: {
                  type: "function",
                  name: "EQ",
                  arguments: [
                    {
                      name: "a",
                      formula: {
                        type: "path",
                        path: ["Props", "selectedNode", "type"],
                      },
                    },
                    {
                      name: "b",
                      formula: {
                        type: "value",
                        value: "element",
                      },
                    },
                  ],
                },
                attrs: {
                  node: {
                    type: "path",
                    path: ["Props", "selectedNode"],
                  },
                  nodeData: {
                    type: "function",
                    name: "GET_NODE_DATA",
                    arguments: [
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "component", "root"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "selectedNodeId"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "componentData"],
                        },
                      },
                    ],
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
                        event: "componentChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "component"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "root",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "UPDATE_NODE",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "component", "root"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "selectedNodeId"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Event"],
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
                ],
                children: [],
              },
              {
                name: "ComponentPanel",
                type: "component",
                condition: {
                  type: "function",
                  name: "EQ",
                  arguments: [
                    {
                      name: "a",
                      formula: {
                        type: "path",
                        path: ["Props", "selectedNode", "type"],
                      },
                    },
                    {
                      name: "b",
                      formula: {
                        type: "value",
                        value: "component",
                      },
                    },
                  ],
                },
                attrs: {
                  node: {
                    type: "path",
                    path: ["Props", "selectedNode"],
                  },
                  nodeData: {
                    type: "function",
                    name: "GET_NODE_DATA",
                    arguments: [
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "component", "root"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "selectedNodeId"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "componentData"],
                        },
                      },
                    ],
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
                        event: "componentChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "component"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "root",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "UPDATE_NODE",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "component", "root"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "selectedNodeId"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Event"],
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
                ],
                children: [],
              },
              {
                name: "TextPanel",
                type: "component",
                condition: {
                  type: "function",
                  name: "EQ",
                  arguments: [
                    {
                      name: "a",
                      formula: {
                        type: "path",
                        path: ["Props", "selectedNode", "type"],
                      },
                    },
                    {
                      name: "b",
                      formula: {
                        type: "value",
                        value: "text",
                      },
                    },
                  ],
                },
                attrs: {
                  node: {
                    type: "path",
                    path: ["Props", "selectedNode"],
                  },
                  nodeData: {
                    type: "path",
                    path: ["Functions", "selectedNodeData"],
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
                        event: "componentChanged",
                        data: {
                          type: "function",
                          name: "SET",
                          arguments: [
                            {
                              formula: {
                                type: "path",
                                path: ["Props", "component"],
                              },
                            },
                            {
                              formula: {
                                type: "value",
                                value: "root",
                              },
                            },
                            {
                              formula: {
                                type: "function",
                                name: "UPDATE_NODE",
                                arguments: [
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "component", "root"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Props", "selectedNodeId"],
                                    },
                                  },
                                  {
                                    formula: {
                                      type: "path",
                                      path: ["Event"],
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
                ],
                children: [],
              },
            ],
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
                path: ["Props", "view"],
                type: "path",
              },
            },
            {
              name: "Second",
              formula: {
                type: "value",
                value: "design",
              },
            },
          ],
        },
      },
      {
        name: "DataPanel",
        type: "component",
        attrs: {
          project: {
            path: ["Props", "project"],
            type: "path",
          },
          component: {
            path: ["Props", "component"],
            type: "path",
          },
          componentData: {
            path: ["Props", "componentData"],
            type: "path",
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
                type: "Debug",
                label: "DataPanel Update",
              },
            ],
            trigger: "updateComponent",
          },
        ],
        children: [],
        condition: {
          name: "EQ",
          type: "function",
          arguments: [
            {
              name: "First",
              formula: {
                path: ["Props", "view"],
                type: "path",
              },
            },
            {
              name: "Second",
              formula: {
                type: "value",
                value: "data",
              },
            },
          ],
        },
      },
      {
        tag: "main",
        type: "element",
        attrs: {},
        style: {
          flex: 1,
        },
        classList: [],
        events: [],
        condition: {
          type: "function",
          name: "EQ",
          arguments: [
            {
              formula: {
                type: "path",
                path: ["Props", "view"],
              },
            },
            {
              formula: {
                type: "value",
                value: "preview",
              },
            },
          ],
        },
        children: [
          {
            tag: "preview-canvas",
            type: "element",
            attrs: {
              data: {
                path: ["Props", "componentData"],
                type: "path",
              },
              component: {
                path: ["Props", "component"],
                type: "path",
              },
              components: {
                path: ["Props", "components"],
                type: "path",
              },
              selectedNodeId: {
                path: ["Props", "selectedNodeId"],
                type: "path",
              },
              highlightedNodeId: {
                path: ["Props", "highlightedNodeId"],
                type: "path",
              },
            },
            style: {
              width: "100%",
              height: "100%",
              padding: "2",
              display: "block",
              position: "relative",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    type: "Trigger Event",
                    event: "componentDataChanged",
                    data: {
                      type: "function",
                      name: "SET",
                      arguments: [
                        {
                          formula: {
                            type: "path",
                            path: ["Props", "componentData"],
                          },
                        },
                        {
                          formula: {
                            type: "value",
                            value: "Variables",
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
                trigger: "variablesChanged",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [],
            classList: [],
          },
        ],
      },
    ],
    classList: [],
  },
  events: [],
  variables: [
    {
      name: "showElementCatalog",
      initialValue: "",
    },
  ],
  functions: [
    {
      name: "selectedNodeData",
      value: {
        type: "function",
        name: "GET_NODE_DATA",
        arguments: [
          {
            formula: {
              type: "path",
              path: ["Props", "component", "root"],
            },
          },
          {
            formula: {
              type: "path",
              path: ["Props", "selectedNodeId"],
            },
          },
          {
            formula: {
              type: "path",
              path: ["Props", "componentData"],
            },
          },
        ],
      },
    },
  ],
  queries: [],
};
