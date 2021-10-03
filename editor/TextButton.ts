import { ComponentModel } from "ComponentModel";

export const TextButton: ComponentModel = {
  id: "bef27f28-d677-4a6e-b659-6bedaaec715c",
  name: "TextButton",
  props: [
    {
      name: "Text",
      initialValue: "Button",
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
        tag: "button",
        type: "element",
        attrs: {
          disabled: {
            path: ["Props", "disabled"],
            type: "path",
          },
        },
        style: {
          height: "40px",
          display: "inline-flex",
          position: "relative",
          variants: [],
          boxSizing: "border-box",
          alignItems: "center",
          paddingLeft: "20px",
          borderRadius: 3,
          paddingRight: "20px",
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#3b3a3a",
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
                type: "Trigger Event",
                event: "Click",
              },
            ],
            trigger: "Click",
            preventDefault: false,
            stopPropagation: false,
          },
        ],
        children: [
          {
            type: "text",
            value: {
              path: ["Props", "Text"],
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
  variables: [],
  functions: [],
  queries: [],
};
