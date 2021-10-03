import { ComponentModel } from "ComponentModel";

export const IconText: ComponentModel = {
  id: "3e3a2e8d-2675-4eac-85d1-d30689fafb83",
  name: "IconText",
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
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M6 15h15",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M21 19h-15",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M15 11h6",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M21 7h-6",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M9 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2",
              },
            },
            style: {},
            events: [],
            children: [],
            classList: [],
          },
          {
            tag: "path",
            type: "element",
            attrs: {
              d: {
                type: "value",
                value: "M3 9h1a1 1 0 1 1 -1 1v-2.5a2 2 0 0 1 2 -2",
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
