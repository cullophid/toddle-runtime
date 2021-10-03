import { ComponentModel } from "ComponentModel";

export const IconComponent: ComponentModel = {
  id: "0175fc4f-2596-48ba-9591-c1e53d8d4096",
  name: "IconComponent",
  props: [
    {
      name: "size",
      initialValue: "24",
    },
    {
      name: "color",
      initialValue: "#ffffff",
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
            value: "none",
          },
          width: {
            path: ["Props", "size"],
            type: "path",
          },
          xmlns: {
            type: "value",
            value: "http://www.w3.org/2000/svg",
          },
          height: {
            path: ["Props", "size"],
            type: "path",
          },
          stroke: {
            path: ["Props", "color"],
            type: "path",
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
            tag: "polyline",
            type: "element",
            attrs: {
              points: {
                type: "value",
                value: "12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "line",
            type: "element",
            attrs: {
              x1: {
                type: "value",
                value: "12",
              },
              x2: {
                type: "value",
                value: "20",
              },
              y1: {
                type: "value",
                value: "12",
              },
              y2: {
                type: "value",
                value: "7.5",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "line",
            type: "element",
            attrs: {
              x1: {
                type: "value",
                value: "12",
              },
              x2: {
                type: "value",
                value: "12",
              },
              y1: {
                type: "value",
                value: "12",
              },
              y2: {
                type: "value",
                value: "21",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "line",
            type: "element",
            attrs: {
              x1: {
                type: "value",
                value: "12",
              },
              x2: {
                type: "value",
                value: "4",
              },
              y1: {
                type: "value",
                value: "12",
              },
              y2: {
                type: "value",
                value: "7.5",
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
