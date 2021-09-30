import { ComponentModel } from "ComponentModel";

export const IconElement: ComponentModel = {
  id: "a93fb91d-b972-45d3-851a-443a154b4de5",
  name: "IconElement",
  props: [
    {
      name: "color",
      initialValue: "#ffffff",
    },
    {
      name: "size",
      initialValue: "24",
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
        tag: "svg",
        type: "element",
        attrs: {
          fill: {
            type: "value",
            value: "transparent",
          },
          width: {
            type: "formula",
            formula: {
              path: ["Props", "size"],
              type: "path",
            },
          },
          xmlns: {
            type: "value",
            value: "http://www.w3.org/2000/svg",
          },
          height: {
            type: "formula",
            formula: {
              path: ["Props", "size"],
              type: "path",
            },
          },
          stroke: {
            type: "formula",
            formula: {
              path: ["Props", "color"],
              type: "path",
            },
          },
          viewBox: {
            type: "value",
            value: "0 0 24 24",
          },
          "stroke-width": {
            type: "value",
            value: "1.5",
          },
          "stroke-linecap": {
            type: "value",
            value: "round",
          },
          "stroke-linejoin": {
            type: "value",
            value: "round",
          },
        },
        style: {},
        events: [],
        children: [
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M0 0h24v24H0z",
              },
              fill: {
                type: "value",
                value: "none",
              },
              stroke: {
                type: "value",
                value: "none",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "rect",
            type: "element",
            attrs: {
              x: {
                type: "value",
                value: "4",
              },
              y: {
                type: "value",
                value: "4",
              },
              rx: {
                type: "value",
                value: "2",
              },
              fill: {
                type: "value",
                value: "transparent",
              },
              width: {
                type: "value",
                value: "16",
              },
              height: {
                type: "value",
                value: "16",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "circle",
            type: "element",
            attrs: {
              r: {
                type: "value",
                value: "1",
              },
              cx: {
                type: "value",
                value: "12",
              },
              cy: {
                type: "value",
                value: "12",
              },
            },
            style: {},
            events: [],
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
