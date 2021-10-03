import { ComponentModel } from "ComponentModel";

export const IconRepeat: ComponentModel = {
  id: "f57d2e5a-d5d5-451a-b3f9-2a96db857d45",
  name: "IconRepeat",
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
        type: "element",
        tag: "svg",
        classList: [],
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
            type: "element",
            tag: "path",
            classList: [],
            attrs: {
              stroke: { type: "value", value: "none" },
              d: { type: "value", value: "M0 0h24v24H0z" },
              fill: { type: "value", value: "none" },
            },
            style: {},
            events: [],
            children: [],
          },
          {
            type: "element",
            tag: "path",
            classList: [],
            attrs: {
              d: {
                type: "value",
                value: "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3",
              },
            },
            style: {},
            events: [],
            children: [],
          },
          {
            type: "element",
            tag: "path",
            classList: [],
            attrs: {
              d: {
                type: "value",
                value: "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3",
              },
            },
            style: {},
            events: [],
            children: [],
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
