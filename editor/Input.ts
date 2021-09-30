import { ComponentModel } from "ComponentModel";

export const Input: ComponentModel = {
  id: "b4381eff-5c21-4518-b7a2-39b9d43fa646",
  name: "Input",
  props: [
    {
      name: "Value",
      initialValue: "",
    },
    {
      name: "Label",
      initialValue: "label",
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
        tag: "label",
        type: "element",
        attrs: {},
        style: {
          gap: "2px",
          width: "100%",
          margin: "0px",
          display: "flex",
          padding: "0px",
          position: "relative",
          boxSizing: "border-box",
          flexDirection: "column",
        },
        events: [],
        children: [
          {
            type: "text",
            value: {
              type: "formula",
              formula: {
                path: ["Props", "Label"],
                type: "path",
              },
            },
          },
          {
            tag: "input",
            type: "element",
            attrs: {
              value: {
                type: "formula",
                formula: {
                  path: ["Props", "Value"],
                  type: "path",
                },
              },
              autoFocus: {
                type: "formula",
                formula: {
                  path: ["Props", "autoFocus"],
                  type: "path",
                },
              },
            },
            style: {
              color: "#424242",
              width: "100%",
              border: "1px solid #ccc",
              height: "8",
              display: "block",
              fontSize: "4",
              position: "relative",
              variants: [],
              boxSizing: "border-box",
              alignItems: "center",
              borderColor: "rgba(0,0,0,0)",
              borderStyle: "solid",
              borderWidth: "1px",
              paddingLeft: "2",
              borderRadius: 2,
              paddingRight: "2",
              backgroundColor: "#eceaea",
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
                    data: {
                      path: ["Event", "target", "value"],
                      type: "path",
                    },
                    type: "Trigger Event",
                    event: "change",
                  },
                ],
                trigger: "Change",
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
