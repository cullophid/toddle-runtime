import { ComponentModel } from "ComponentModel";

export const LeftPanel: ComponentModel = {
  id: "bab8bf2a-5343-4ee9-9395-75b6ac5d363d",
  name: "LeftPanel",
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
      initialValue: "0",
    },
    {
      name: "nodeData",
      initialValue: { Variables: {}, Props: {} },
    },
    {
      name: "highlightedNodeId",
      initialValue: "0",
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
      width: "64",
      display: "block",
      overflow: "auto",
      position: "relative",
      paddingTop: "4",
      paddingBottom: "4",
      backgroundColor: "var(--grey-800)",
      borderRightColor: "var(--grey-900)",
      borderRightStyle: "solid",
      borderRightWidth: "1px",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [],
        trigger: "click",
        preventDefault: false,
        stopPropagation: true,
      },
    ],
    children: [
      {
        tag: "div",
        type: "element",
        attrs: {},
        style: {
          display: "flex",
          position: "relative",
          alignItems: "center",
          paddingLeft: "4",
          paddingRight: "4",
          flexDirection: "row",
          justifyContent: "space-between",
        },
        events: [],
        children: [
          {
            tag: "h2",
            type: "element",
            attrs: {},
            style: {
              width: "auto",
              margin: "0px",
              padding: "0px",
              fontSize: "14px",
              position: "relative",
              boxSizing: "border-box",
              marginTop: "0",
              marginLeft: "0",
              paddingTop: "0",
              marginRight: "0",
              paddingLeft: "0",
              marginBottom: "0",
              paddingRight: "0",
              paddingBottom: "0",
            },
            events: [],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "Elements",
                },
              },
            ],
            classList: [],
          },
          {
            tag: "button",
            type: "element",
            attrs: {},
            style: {
              color: "var(--grey-200)",
              height: "5",
              display: "inline-flex",
              position: "relative",
              boxSizing: "border-box",
              alignItems: "center",
              paddingLeft: "2",
              borderRadius: 3,
              paddingRight: "2",
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "var(--grey-600)",
              borderTopLeftRadius: "1",
              borderTopRightRadius: "1",
              borderBottomLeftRadius: "1",
              borderBottomRightRadius: "1",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    type: "Update Variable",
                    value: { type: "value", value: true },
                    condition: {
                      type: "path",
                      path: ["Props", "selectedNode"],
                    },
                    variableName: "showElementCatalog",
                  },
                ],
                trigger: "click",
                preventDefault: false,
                stopPropagation: true,
              },
            ],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "+",
                },
              },
            ],
            classList: [],
          },
        ],
        classList: [],
      },
      {
        name: "TreeNode",
        type: "component",
        attrs: {
          id: {
            type: "value",
            value: "0",
          },
          node: {
            path: ["Props", "component", "root"],
            type: "path",
          },
          indent: {
            type: "value",
            value: 1,
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
                data: {
                  path: ["Event"],
                  type: "path",
                },
                type: "Trigger Event",
                event: "nodeSelected",
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
                event: "nodeHighlighted",
              },
            ],
            trigger: "highlightNode",
          },
        ],
        children: [],
      },
      {
        tag: "element-catalog",
        type: "element",
        attrs: {
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
        },
        style: {},
        events: [
          {
            type: "NodeEvent",
            actions: [
              {
                type: "Update Variable",
                value: "",
                variableName: "showElementCatalog",
              },
              {
                data: {
                  path: ["Event", "detail"],
                  type: "path",
                },
                type: "Trigger Event",
                event: "componentChanged",
              },
              {
                data: {
                  path: ["Event"],
                  type: "path",
                },
                type: "Debug",
              },
            ],
            trigger: "change",
            preventDefault: false,
            stopPropagation: false,
          },
          {
            type: "NodeEvent",
            actions: [
              {
                type: "Update Variable",
                value: "",
                variableName: "showElementCatalog",
              },
            ],
            trigger: "dismiss",
            preventDefault: false,
            stopPropagation: false,
          },
        ],
        children: [],
        classList: [],
        condition: {
          path: ["Variables", "showElementCatalog"],
          type: "path",
        },
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
  functions: [],
  queries: [],
};
