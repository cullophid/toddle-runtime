import { ComponentModel } from "ComponentModel";

export const UnitInput: ComponentModel = {
  id: "0ce08450-6acb-401f-a5b5-33aeddc211cd",
  name: "UnitInput",
  props: [
    {
      name: "label",
      initialValue: "Min W",
    },
    {
      name: "value",
      initialValue: "10",
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
          display: "flex",
          position: "relative",
          alignItems: "center",
          paddingLeft: "2",
          paddingRight: "2",
          backgroundColor: "var(--grey-600)",
          borderTopLeftRadius: "1",
          borderTopRightRadius: "1",
          borderBottomLeftRadius: "1",
          borderBottomRightRadius: "1",
        },
        events: [],
        children: [
          {
            tag: "label",
            type: "element",
            attrs: {},
            style: {
              color: "var(--grey-300)",
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
                  path: ["Props", "label"],
                  type: "path",
                },
              },
            ],
            classList: [],
          },
          {
            tag: "input",
            type: "element",
            attrs: {
              value: {
                name: "DEFAULT",
                type: "function",
                arguments: [
                  {
                    name: "Value",
                    formula: {
                      path: ["Props", "value"],
                      type: "path",
                    },
                  },
                  {
                    name: "Default",
                    formula: {
                      type: "value",
                      value: "none",
                    },
                  },
                ],
              },
            },
            style: {
              color: "var(--grey-100)",
              width: "100%",
              border: "1px solid #ccc",
              height: "8",
              display: "inline-block",
              fontSize: "12px",
              position: "relative",
              boxSizing: "border-box",
              alignItems: "center",
              fontWeight: 600,
              paddingLeft: "2",
              borderRadius: 2,
              paddingRight: "2",
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
                    data: {
                      path: ["Event", "target", "value"],
                      type: "path",
                    },
                    type: "Trigger Event",
                    event: "input",
                  },
                ],
                trigger: "change",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [],
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
