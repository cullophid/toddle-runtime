import { ComponentModel } from "ComponentModel";

export const TextPanel: ComponentModel = {
  id: "c9214756-fde3-44a7-98d8-477740d7fcb1",
  name: "TextPanel",
  props: [
    {
      name: "node",
      initialValue: {
        id: "1234",
        type: "text",
        value: "hello world",
        condition: null,
      },
    },
    {
      name: "data",
      initialValue: {
        Props: {},
        Functions: {},
        Variables: {
          name: "bob",
        },
      },
    },
    {
      name: "component",
      initialValue: {
        id: "ec39d879-fdfa-40fb-a9ce-8f382e19a944",
        name: "Dummy",
        nodes: {
          ROOT: {
            id: "ROOT",
            type: "fragment",
            children: ["7WQmOL7lsKF0CgR0LaMzc"],
          },
          "5ZnoR2wjm1yo8YzdRhowf": {
            id: "5ZnoR2wjm1yo8YzdRhowf",
            type: "text",
            style: {
              fontSize: "14px",
            },
            value: "Text",
          },
          "7WQmOL7lsKF0CgR0LaMzc": {
            id: "7WQmOL7lsKF0CgR0LaMzc",
            tag: "div",
            type: "element",
            attrs: {
              id: "someId",
              classList: [
                {
                  name: "MyClass",
                },
              ],
            },
            style: {
              variants: [
                {
                  style: {
                    backgroundColor: "var(--green-200)",
                  },
                  className: "someClass",
                },
              ],
            },
            events: [
              {
                type: "NodeEvent",
                actions: [],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: ["HB_7kn-mbTuHLpaValD8Q", "g58mAF2b2_srra2o0ZeUe"],
          },
          "CRYHHiNlMuU-RlIpxudAp": {
            id: "CRYHHiNlMuU-RlIpxudAp",
            tag: "path",
            type: "element",
            attrs: {
              d: "M12 12a2 2 0 1 0 -2 -2",
            },
            style: {},
            events: [],
            children: [],
          },
          "HB_7kn-mbTuHLpaValD8Q": {
            id: "HB_7kn-mbTuHLpaValD8Q",
            tag: "svg",
            type: "element",
            attrs: {
              fill: "none",
              class: "icon icon-tabler icon-tabler-square-3",
              width: "44",
              xmlns: "http://www.w3.org/2000/svg",
              height: "44",
              stroke: "#fff",
              viewBox: "0 0 24 24",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
            },
            style: {
              color: "red",
            },
            events: [],
            children: [
              "QZMmt4lecO35y9fZNsUak",
              "CRYHHiNlMuU-RlIpxudAp",
              "NLQs2lC_5j810Nn-y0DQn",
              "YedeM3KZgL0DxwtzxEhjM",
            ],
          },
          "NLQs2lC_5j810Nn-y0DQn": {
            id: "NLQs2lC_5j810Nn-y0DQn",
            tag: "path",
            type: "element",
            attrs: {
              d: "M10 14a2 2 0 1 0 2 -2",
            },
            style: {},
            events: [],
            children: [],
          },
          QZMmt4lecO35y9fZNsUak: {
            id: "QZMmt4lecO35y9fZNsUak",
            tag: "path",
            type: "element",
            attrs: {
              d: "M0 0h24v24H0z",
              fill: "none",
              stroke: "none",
            },
            style: {},
            events: [],
            children: [],
          },
          YedeM3KZgL0DxwtzxEhjM: {
            id: "YedeM3KZgL0DxwtzxEhjM",
            tag: "rect",
            type: "element",
            attrs: {
              x: "4",
              y: "4",
              rx: "2",
              width: "16",
              height: "16",
            },
            style: {},
            events: [],
            children: [],
          },
          g58mAF2b2_srra2o0ZeUe: {
            id: "g58mAF2b2_srra2o0ZeUe",
            tag: "button",
            type: "element",
            attrs: {},
            style: {},
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    data: "Hey",
                    name: "test",
                    type: "Custom",
                  },
                ],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: ["5ZnoR2wjm1yo8YzdRhowf"],
          },
        },
        props: [
          {
            id: "3d6128bd-a4c8-4d2b-bbc0-583b06bdac51",
            name: "id",
            initialValue: "1234",
          },
        ],
        events: [],
        queries: [],
        _project: "d41e9972-8714-4fed-af45-8407985afbe4",
        functions: [],
        variables: [
          {
            id: "090b3716-1ca0-4e90-9dc3-837f106f10c6",
            name: "name",
            initialValue: "",
          },
        ],
      },
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
          gap: "2",
          display: "flex",
          position: "relative",
          flexDirection: "column",
        },
        events: [],
        children: [
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              gap: "2",
              color: "var(--grey-100)",
              height: "8",
              display: "flex",
              justifyContent: "space-between",
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
                  padding: "0px",
                  position: "relative",
                  boxSizing: "border-box",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "show",
                    },
                  },
                ],
                classList: [],
              },
              {
                tag: "formula-editor",
                type: "element",
                attrs: {
                  data: {
                    path: ["Props", "data"],
                    type: "path",
                  },
                  formula: {
                    path: ["Props", "node", "condition"],
                    type: "path",
                  },
                },
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        data: {
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "condition",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                path: ["Event", "detail"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
                      },
                    ],
                    trigger: "update",
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
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              gap: "2",
              color: "var(--grey-100)",
              height: "8",
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
                  padding: "0px",
                  position: "relative",
                  boxSizing: "border-box",
                },
                events: [],
                children: [
                  {
                    type: "text",
                    value: {
                      type: "value",
                      value: "value",
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
                    type: "function",
                    name: "APPLY_FORMULA",
                    arguments: [
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "node", "value"],
                        },
                      },
                      {
                        formula: {
                          type: "path",
                          path: ["Props", "nodeData"],
                        },
                      },
                    ],
                  },
                },
                style: {
                  color: "var(--grey-100)",
                  width: "0",
                  border: "1px solid #ccc",
                  height: "100%",
                  display: "inline-block",
                  flexGrow: 1,
                  fontSize: "4",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "center",
                  flexShrink: 1,
                  fontWeight: 600,
                  paddingLeft: "0",
                  borderRadius: 2,
                  paddingRight: "0",
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
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "value",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                type: "record",
                                entries: [
                                  {
                                    name: "type",
                                    formula: {
                                      type: "value",
                                      value: "value",
                                    },
                                  },
                                  {
                                    name: "value",
                                    formula: {
                                      path: ["Event", "target", "value"],
                                      type: "path",
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
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
              {
                tag: "formula-editor",
                type: "element",
                attrs: {
                  data: {
                    path: ["Props", "nodeData"],
                    type: "path",
                  },
                  formula: {
                    path: ["Props", "node", "value"],
                    type: "path",
                  },
                },
                style: {},
                events: [
                  {
                    type: "NodeEvent",
                    actions: [
                      {
                        data: {
                          name: "SET",
                          type: "function",
                          arguments: [
                            {
                              name: "Object",
                              formula: {
                                path: ["Props", "node"],
                                type: "path",
                              },
                            },
                            {
                              name: "Key",
                              formula: {
                                type: "value",
                                value: "value",
                              },
                            },
                            {
                              name: "Value",
                              formula: {
                                path: ["Event", "detail"],
                                type: "path",
                              },
                            },
                          ],
                        },
                        type: "Trigger Event",
                        event: "nodeChanged",
                      },
                    ],
                    trigger: "update",
                    preventDefault: false,
                    stopPropagation: false,
                  },
                ],
                children: [],
                classList: [
                  {
                    name: "class",
                  },
                ],
              },
            ],
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
