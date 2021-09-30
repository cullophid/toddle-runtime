import { ComponentModel } from "ComponentModel";

export const MainMenu: ComponentModel = {
  id: "7fa0917e-5dc2-4a82-b154-e9dee9ef3145",
  name: "MainMenu",
  props: [],
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
        style: {},
        events: [],
        children: [
          {
            tag: "button",
            type: "element",
            attrs: {},
            style: {
              color: "var(--grey-200)",
              height: "7",
              display: "inline-flex",
              fontSize: "14px",
              position: "relative",
              boxSizing: "border-box",
              alignItems: "center",
              paddingLeft: "0",
              borderRadius: 3,
              paddingRight: "0",
              flexDirection: "row",
              borderTopColor: "var(--grey-400)",
              borderTopWidth: "1px",
              justifyContent: "center",
              borderLeftColor: "var(--grey-400)",
              borderLeftWidth: "1px",
              borderRightColor: "var(--grey-400)",
              borderRightWidth: "1px",
              borderBottomColor: "var(--grey-400)",
              borderBottomWidth: "1px",
              borderTopLeftRadius: "2",
              borderTopRightRadius: "2",
              borderBottomLeftRadius: "2",
              borderBottomRightRadius: "2",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    type: "Update Variable",
                    value: "TRUE",
                    variableName: "isOpen",
                  },
                ],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [
              {
                type: "text",
                value: {
                  type: "value",
                  value: "MENU",
                },
              },
            ],
            classList: [],
          },
          {
            tag: "nav",
            type: "element",
            attrs: {},
            style: {
              top: "8",
              left: "0",
              width: "51",
              zIndex: 5,
              shadows: [
                {
                  x: 0,
                  y: 3,
                  blur: 5,
                  color: "#00000055",
                  inset: false,
                  spread: 0,
                },
              ],
              minWidth: "",
              position: "absolute",
              backgroundColor: "var(--grey-500)",
              borderTopLeftRadius: "1",
              borderTopRightRadius: "1",
              borderBottomLeftRadius: "1",
              borderBottomRightRadius: "1",
            },
            events: [],
            children: [
              {
                tag: "ul",
                type: "element",
                attrs: {},
                style: {
                  display: "flex",
                  position: "relative",
                  boxSizing: "border-box",
                  alignItems: "stretch",
                  flexDirection: "column",
                },
                events: [],
                children: [
                  {
                    tag: "li",
                    type: "element",
                    attrs: {},
                    style: {
                      color: "var(--grey-100)",
                      height: "40px",
                      display: "flex",
                      padding: "8px",
                      position: "relative",
                      boxSizing: "border-box",
                      alignItems: "center",
                      flexDirection: "row",
                    },
                    events: [],
                    children: [
                      {
                        tag: "a",
                        href: {
                          page: {
                            id: "553fd689-cd0e-4349-a4ef-b5715d9ca6da",
                            path: "/",
                          },
                          queryParams: {},
                        },
                        type: "element",
                        attrs: {},
                        style: {
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
                              type: "value",
                              value: "Back to Projects",
                            },
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
            ],
            classList: [],
            condition: {
              path: ["Variables", "isOpen"],
              type: "path",
            },
          },
          {
            tag: "div",
            type: "element",
            attrs: {},
            style: {
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: 4,
              position: "fixed",
            },
            events: [
              {
                type: "NodeEvent",
                actions: [
                  {
                    type: "Update Variable",
                    value: "",
                    variableName: "isOpen",
                  },
                ],
                trigger: "click",
                preventDefault: false,
                stopPropagation: false,
              },
            ],
            children: [],
            classList: [],
            condition: {
              path: ["Variables", "isOpen"],
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
  variables: [
    {
      name: "isOpen",
      initialValue: "",
    },
  ],
  functions: [],
  queries: [],
};
