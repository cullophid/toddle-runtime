import { ComponentModel } from "ComponentModel";

export const IconEvent: ComponentModel = {
  id: "56c39936-fd78-4d8c-a1a8-1b59510ccb9c",
  name: "IconEvent",
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
                value:
                  "M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6",
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
            attrs: { d: { type: "value", value: "M9 17v1a3 3 0 0 0 6 0v-1" } },
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
                value: "M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727",
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
                value: "M3 6.727a11.05 11.05 0 0 1 2.792 -3.727",
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
