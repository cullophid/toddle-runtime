import { ComponentModel } from "ComponentModel";

export const IconChevronDown: ComponentModel = {
  id: "5cdfb8be-fe4e-4c49-9698-ab51a50f0ff3",
  name: "IconChevronDown",
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
            tag: "polyline",
            type: "element",
            attrs: {
              points: {
                type: "value",
                value: "6 9 12 15 18 9",
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
