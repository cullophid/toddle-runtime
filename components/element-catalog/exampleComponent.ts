import { ComponentModel } from "../../ComponentModel";

export const exampleComponent: ComponentModel = {
  id: "4d5c161c-89e9-4c3c-9364-68e0a5b894a0",
  _project: "d41e9972-8714-4fed-af45-8407985afbe4",
  events: [],
  functions: [],
  name: "SizeStyles",
  nodes: {
    ROOT: {
      id: "ROOT",
      type: "fragment",
      children: ["ggMGPB1z-Vi-WZMFCBuvi"],
    },
    CgQ4CWSKnskS8kQrPALoS: {
      id: "CgQ4CWSKnskS8kQrPALoS",
      tag: "div",
      type: "element",
      attrs: {},
      style: {
        gap: "2",
        display: "flex",
        position: "relative",
        paddingLeft: "2",
        paddingRight: "2",
        flexDirection: "column",
      },
      events: [],
      children: ["GY-U_vcv0KKFfGmFh0_0y", "dYD4c_xK04GzItKKhMaMm"],
    },
    "GY-U_vcv0KKFfGmFh0_0y": {
      id: "GY-U_vcv0KKFfGmFh0_0y",
      tag: "div",
      type: "element",
      attrs: {},
      style: {
        gap: "2",
        display: "flex",
        position: "relative",
      },
      events: [],
      children: ["oWXNKhz856pMQEouzEG27", "SS2aLrNQoGgDy3msPTHN4"],
    },
    KyAmTWUZdWBDn2BElt4Mc: {
      id: "KyAmTWUZdWBDn2BElt4Mc",
      name: "UnitInput",
      type: "component",
      attrs: {
        label: "Min H",
        value: {
          name: "Data",
          path: ["Props", "style", "minHeight"],
          type: "path",
        },
      },
      events: [
        {
          type: "ComponentEvent",
          actions: [
            {
              data: {
                name: "SET",
                type: "function",
                arguments: [
                  {
                    name: "Object",
                    formula: {
                      name: "Data",
                      path: ["Props", "style"],
                      type: "path",
                    },
                  },
                  {
                    name: "Key",
                    formula: {
                      name: "String",
                      type: "string",
                      value: "minHeight",
                    },
                  },
                  {
                    name: "Value",
                    formula: {
                      name: "Data",
                      path: ["Event"],
                      type: "path",
                    },
                  },
                ],
              },
              type: "Trigger Event",
              event: "change",
            },
          ],
          trigger: "input",
        },
      ],
      children: [],
    },
    QsRvnTvSbHsak1cac9cMP: {
      id: "QsRvnTvSbHsak1cac9cMP",
      type: "text",
      style: {
        fontSize: 16,
        fontWeight: 400,
      },
      value: "Size",
    },
    SS2aLrNQoGgDy3msPTHN4: {
      id: "SS2aLrNQoGgDy3msPTHN4",
      name: "UnitInput",
      type: "component",
      attrs: {
        label: "H",
        value: {
          name: "Data",
          path: ["Props", "style", "height"],
          type: "path",
        },
      },
      events: [
        {
          type: "ComponentEvent",
          actions: [
            {
              data: {
                name: "SET",
                type: "function",
                arguments: [
                  {
                    name: "Object",
                    formula: {
                      name: "Data",
                      path: ["Props", "style"],
                      type: "path",
                    },
                  },
                  {
                    name: "Key",
                    formula: {
                      name: "String",
                      type: "string",
                      value: "height",
                    },
                  },
                  {
                    name: "Value",
                    formula: {
                      name: "Data",
                      path: ["Event"],
                      type: "path",
                    },
                  },
                ],
              },
              type: "Trigger Event",
              event: "change",
            },
          ],
          trigger: "input",
        },
      ],
      children: [],
    },
    "_uv69hJbH1V6r-7eKnSAA": {
      id: "_uv69hJbH1V6r-7eKnSAA",
      tag: "h3",
      type: "element",
      attrs: {},
      style: {
        color: "var(--grey-100)",
        width: "auto",
        margin: "0px",
        padding: "0px",
        fontSize: "16px",
        position: "relative",
        boxSizing: "border-box",
      },
      events: [],
      children: ["QsRvnTvSbHsak1cac9cMP"],
    },
    dYD4c_xK04GzItKKhMaMm: {
      id: "dYD4c_xK04GzItKKhMaMm",
      tag: "div",
      type: "element",
      attrs: {},
      style: {
        gap: "2",
        display: "flex",
        position: "relative",
      },
      events: [],
      children: ["vtd7HX2eGHsY65vbw-gco", "KyAmTWUZdWBDn2BElt4Mc"],
    },
    gAkFqG40xzoDC7cIQ51Ne: {
      id: "gAkFqG40xzoDC7cIQ51Ne",
      tag: "div",
      type: "element",
      attrs: {},
      style: {},
      events: [],
      children: ["_uv69hJbH1V6r-7eKnSAA"],
    },
    "ggMGPB1z-Vi-WZMFCBuvi": {
      id: "ggMGPB1z-Vi-WZMFCBuvi",
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
      children: ["gAkFqG40xzoDC7cIQ51Ne", "CgQ4CWSKnskS8kQrPALoS"],
    },
    oWXNKhz856pMQEouzEG27: {
      id: "oWXNKhz856pMQEouzEG27",
      name: "UnitInput",
      type: "component",
      attrs: {
        label: "W",
        value: {
          name: "Data",
          path: ["Props", "style", "width"],
          type: "path",
        },
      },
      events: [
        {
          type: "ComponentEvent",
          actions: [
            {
              data: {
                name: "SET",
                type: "function",
                arguments: [
                  {
                    name: "Object",
                    formula: {
                      name: "Data",
                      path: ["Props", "style"],
                      type: "path",
                    },
                  },
                  {
                    name: "Key",
                    formula: {
                      name: "String",
                      type: "string",
                      value: "width",
                    },
                  },
                  {
                    name: "Value",
                    formula: {
                      name: "Data",
                      path: ["Event"],
                      type: "path",
                    },
                  },
                ],
              },
              type: "Trigger Event",
              event: "change",
            },
          ],
          trigger: "input",
        },
      ],
      children: [],
    },
    "vtd7HX2eGHsY65vbw-gco": {
      id: "vtd7HX2eGHsY65vbw-gco",
      name: "UnitInput",
      type: "component",
      attrs: {
        label: "Min W",
        value: {
          name: "Data",
          path: ["Props", "style", "minWidth"],
          type: "path",
        },
      },
      events: [
        {
          type: "ComponentEvent",
          actions: [
            {
              data: {
                name: "SET",
                type: "function",
                arguments: [
                  {
                    name: "Object",
                    formula: {
                      name: "Data",
                      path: ["Props", "style"],
                      type: "path",
                    },
                  },
                  {
                    name: "Key",
                    formula: {
                      name: "String",
                      type: "string",
                      value: "minWidth",
                    },
                  },
                  {
                    name: "Value",
                    formula: {
                      name: "Data",
                      path: ["Event"],
                      type: "path",
                    },
                  },
                ],
              },
              type: "Trigger Event",
              event: "change",
            },
          ],
          trigger: "input",
        },
      ],
      children: [],
    },
  },
  props: [
    {
      id: "d3ba4f1e-0ef2-4465-aa2b-803070059b80",
      name: "style",
      initialValue: {
        width: "100%",
        height: "100%",
        maxWidth: "100%",
        minWidth: "100%",
        maxHeight: "100%",
        minHeight: "100%",
      },
    },
  ],
  variables: [],
  queries: [],
};

const nodes = {
  ROOT: {
    id: "ROOT",
    type: "fragment",
    children: [
      "vN3u1SltADFLhr5sEeFbw",
      "wUS_leeaS0FbTOEXCvKER",
      "5Sc3UwR4ub2dhKVHQe9rh",
      "81zROeBdopMG-kR0Hp6ru",
    ],
  },
  "-Uydp0co1T5UucL6d8h4x": {
    id: "-Uydp0co1T5UucL6d8h4x",
    tag: "span",
    type: "element",
    attrs: {},
    style: {
      color: "var(--grey-200)",
      margin: "0px",
      display: "inline",
      padding: "0px",
      position: "relative",
      boxSizing: "border-box",
    },
    events: [],
    children: ["bO9Xhr0bYN4I441S7gjH1", "Hc-ne_paBe7SSFPk0dBqK"],
  },
  "1MMGd7Dmv40blguYBOcXV": {
    id: "1MMGd7Dmv40blguYBOcXV",
    type: "text",
    style: {
      color: "#ffffff",
      fontSize: "14px",
      fontFamily: "'Montserrat',sans-serif",
    },
    value: "+",
  },
  "2p7aZfBpUI0EvCRTm0mNi": {
    id: "2p7aZfBpUI0EvCRTm0mNi",
    tag: "button",
    type: "element",
    attrs: {},
    style: {
      color: "var(--grey-200)",
      height: "5",
      display: "inline-flex",
      position: "relative",
      boxSizing: "border-box",
      alignItems: "center",
      paddingLeft: "2",
      borderRadius: 3,
      paddingRight: "2",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "var(--grey-600)",
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
            type: "Update Variable",
            value: "true",
            condition: {
              name: "Data",
              path: ["Variables", "selectedNodeId"],
              type: "path",
            },
            variableName: "showElementCatalog",
          },
        ],
        trigger: "click",
        preventDefault: false,
        stopPropagation: true,
      },
    ],
    children: ["1MMGd7Dmv40blguYBOcXV"],
  },
  "2yKWKtkMNTR-YU5brtUEU": {
    id: "2yKWKtkMNTR-YU5brtUEU",
    type: "text",
    style: { fontSize: "14px" },
    value: "Preview",
  },
  "6-Q4Z5aX7dYTaHa2f-NBs": {
    id: "6-Q4Z5aX7dYTaHa2f-NBs",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      position: "relative",
      backgroundColor: "var(--grey-700)",
      borderTopLeftRadius: "2",
      borderTopRightRadius: "2",
      borderBottomLeftRadius: "2",
      borderBottomRightRadius: "2",
    },
    events: [],
    children: [
      "tjGh9yKSoP-lwWWu8hjze",
      "YWeOtL1v1JgCObPaQtqs9",
      "by6mvjFgDVc3igQcTZL_p",
    ],
  },
  "7QH8tr4Rsk4wUSXw582xo": {
    id: "7QH8tr4Rsk4wUSXw582xo",
    type: "text",
    style: { fontSize: "14px" },
    value: "Elements",
  },
  "81zROeBdopMG-kR0Hp6ru": {
    id: "81zROeBdopMG-kR0Hp6ru",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      height: "100%",
      display: "flex",
      position: "relative",
      alignItems: "stretch",
      fontFamily: "Montserrat",
      flexDirection: "column",
      backgroundColor: "var(--grey-600)",
    },
    events: [],
    children: [
      "INcnlGAPyhwXTgIyCirza",
      "HavCrpiFPgByjSqpwmKvo",
      "TxB59xoixcyHiXCH4I7Gd",
    ],
  },
  CKoRC46j8XR8PN6nAaMXM: {
    id: "CKoRC46j8XR8PN6nAaMXM",
    name: "AddressBar",
    type: "component",
    attrs: {
      component: {
        name: "Data",
        path: ["Variables", "component", "name"],
        type: "path",
      },
      projectId: {
        name: "Data",
        path: ["Queries", "project", "data", "projects", "0", "id"],
        type: "path",
      },
    },
    events: [
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Query",
            value: { name: "Data", path: ["Event"], type: "path" },
            paramName: "component",
          },
        ],
        trigger: "change",
      },
    ],
    children: [],
  },
  HavCrpiFPgByjSqpwmKvo: {
    id: "HavCrpiFPgByjSqpwmKvo",
    tag: "main",
    type: "element",
    attrs: {},
    style: {
      display: "flex",
      flexGrow: 1,
      overflow: "hidden",
      position: "relative",
      alignItems: "stretch",
      flexShrink: 1,
      flexDirection: "row",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [
          {
            type: "Update Variable",
            value: "",
            variableName: "selectedNodeId",
          },
        ],
        trigger: "click",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: [
      "zAyNhXEqeQSmrZvfBYO8S",
      "Mavcuyrj0otofjtk8buqG",
      "savoPyIyRwT3-w4DNvJhI",
    ],
    condition: {
      name: "EQ",
      type: "function",
      arguments: [
        {
          name: "First",
          formula: { name: "Data", path: ["Props", "view"], type: "path" },
        },
        {
          name: "Second",
          formula: { name: "String", type: "string", value: "design" },
        },
      ],
      description: {
        key: null,
        ref: null,
        props: {
          children: [
            {
              key: null,
              ref: null,
              type: "h1",
              props: { children: "EQ" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "p",
              props: { children: "Returns TRUE if the two values are equal" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Arguments" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "ol",
              props: {
                children: [
                  {
                    key: null,
                    ref: null,
                    type: "li",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "strong",
                          props: { children: "First argument" },
                          _owner: null,
                          _store: {},
                        },
                        " The fist item to be compare",
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "li",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "strong",
                          props: { children: "Second argument" },
                          _owner: null,
                          _store: {},
                        },
                        " The second argument to compare",
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Examples" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: {
                children:
                  '\n    EQ("hello ","hi") \n    // returns FALSE\n  \n    EQ("hello ","hello") \n    // returns TRUE\n  ',
              },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
    },
  },
  "Hc-ne_paBe7SSFPk0dBqK": {
    id: "Hc-ne_paBe7SSFPk0dBqK",
    type: "text",
    style: { fontSize: "14px" },
    value: "saved",
    condition: {
      name: "NOT",
      type: "function",
      arguments: [
        {
          name: "Input",
          formula: {
            name: "Data",
            path: ["Mutations", "updateComponent", "isLoading"],
            type: "path",
          },
        },
      ],
      description: {
        key: null,
        ref: null,
        props: {
          children: [
            {
              key: null,
              ref: null,
              type: "h1",
              props: { children: "NOT" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "p",
              props: {
                children:
                  "Returns FALSE if the value is truthy. Otherwise FALSE",
              },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Arguments" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "ol",
              props: {
                children: {
                  key: null,
                  ref: null,
                  type: "li",
                  props: {
                    children: {
                      key: null,
                      ref: null,
                      type: "strong",
                      props: { children: "Item" },
                      _owner: null,
                      _store: {},
                    },
                  },
                  _owner: null,
                  _store: {},
                },
              },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Examples" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: { children: "\n    NO(TRUE) \n  " },
              _owner: null,
              _store: {},
            },
            "Will return:",
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: { children: "FALSE" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: { children: "\n    nOT(FALSE) \n  " },
              _owner: null,
              _store: {},
            },
            "Will return:",
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: { children: "TRUE" },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
    },
  },
  INcnlGAPyhwXTgIyCirza: {
    id: "INcnlGAPyhwXTgIyCirza",
    tag: "header",
    type: "element",
    attrs: {},
    style: {
      gap: "4",
      height: "10",
      display: "flex",
      position: "relative",
      alignItems: "center",
      paddingLeft: "4",
      paddingRight: "4",
      flexDirection: "row",
      backgroundColor: "var(--grey-900)",
    },
    events: [],
    children: [
      "ofsORBbSt6e2L_B34jVL8",
      "6-Q4Z5aX7dYTaHa2f-NBs",
      "CKoRC46j8XR8PN6nAaMXM",
      "rRL0VZlw6DjczAl3SgXdm",
      "-Uydp0co1T5UucL6d8h4x",
    ],
  },
  J0yiF8UmPJbl0rvd1mTEC: {
    id: "J0yiF8UmPJbl0rvd1mTEC",
    type: "text",
    style: { fontSize: "14px" },
    value: "Design",
  },
  LeDA_ntQMiq3Ju_ZUkkVf: {
    id: "LeDA_ntQMiq3Ju_ZUkkVf",
    tag: "canvas-iframe",
    type: "element",
    attrs: {
      data: {
        name: "Data",
        path: ["Variables", "componentData"],
        type: "path",
      },
      nodes: {
        name: "Data",
        path: ["Variables", "component", "nodes"],
        type: "path",
      },
      classList: [{ name: "class" }],
      components: {
        name: "IF",
        type: "function",
        arguments: [
          {
            name: "If",
            formula: {
              name: "Data",
              path: ["Queries", "component", "data", "component"],
              type: "path",
            },
          },
          {
            name: "Then",
            formula: {
              name: "FROM_ENTRIES",
              type: "function",
              arguments: [
                {
                  name: "List",
                  formula: {
                    name: "LIST",
                    type: "function",
                    varArgs: true,
                    arguments: [
                      {
                        formula: {
                          name: "LIST",
                          type: "function",
                          varArgs: true,
                          arguments: [
                            {
                              formula: {
                                name: "Data",
                                path: [
                                  "Queries",
                                  "component",
                                  "data",
                                  "component",
                                  "name",
                                ],
                                type: "path",
                              },
                            },
                            {
                              formula: {
                                name: "Data",
                                path: [
                                  "Queries",
                                  "component",
                                  "data",
                                  "component",
                                ],
                                type: "path",
                              },
                            },
                          ],
                          description: {
                            key: null,
                            ref: null,
                            props: {
                              children: [
                                {
                                  key: null,
                                  ref: null,
                                  type: "h1",
                                  props: { children: "LIST" },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "p",
                                  props: {
                                    children:
                                      "Create a list containing each of the arguments",
                                  },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "h2",
                                  props: { children: "Arguments" },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "ol",
                                  props: {
                                    children: [
                                      {
                                        key: null,
                                        ref: null,
                                        type: "li",
                                        props: {
                                          children: {
                                            key: null,
                                            ref: null,
                                            type: "strong",
                                            props: { children: "Item" },
                                            _owner: null,
                                            _store: {},
                                          },
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                      {
                                        key: null,
                                        ref: null,
                                        type: "li",
                                        props: {
                                          children: {
                                            key: null,
                                            ref: null,
                                            type: "strong",
                                            props: { children: "Item" },
                                            _owner: null,
                                            _store: {},
                                          },
                                        },
                                        _owner: null,
                                        _store: {},
                                      },
                                    ],
                                  },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "h2",
                                  props: { children: "Example" },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "blockquote",
                                  props: {
                                    children:
                                      '\n    LIST("Andreas", "Freyja") \n  ',
                                  },
                                  _owner: null,
                                  _store: {},
                                },
                                'Will create a list containing two items: "Andreas" and "Freyja"',
                              ],
                            },
                            _owner: null,
                            _store: {},
                          },
                        },
                      },
                    ],
                    description: {
                      key: null,
                      ref: null,
                      props: {
                        children: [
                          {
                            key: null,
                            ref: null,
                            type: "h1",
                            props: { children: "LIST" },
                            _owner: null,
                            _store: {},
                          },
                          {
                            key: null,
                            ref: null,
                            type: "p",
                            props: {
                              children:
                                "Create a list containing each of the arguments",
                            },
                            _owner: null,
                            _store: {},
                          },
                          {
                            key: null,
                            ref: null,
                            type: "h2",
                            props: { children: "Arguments" },
                            _owner: null,
                            _store: {},
                          },
                          {
                            key: null,
                            ref: null,
                            type: "ol",
                            props: {
                              children: [
                                {
                                  key: null,
                                  ref: null,
                                  type: "li",
                                  props: {
                                    children: {
                                      key: null,
                                      ref: null,
                                      type: "strong",
                                      props: { children: "Item" },
                                      _owner: null,
                                      _store: {},
                                    },
                                  },
                                  _owner: null,
                                  _store: {},
                                },
                                {
                                  key: null,
                                  ref: null,
                                  type: "li",
                                  props: {
                                    children: {
                                      key: null,
                                      ref: null,
                                      type: "strong",
                                      props: { children: "Item" },
                                      _owner: null,
                                      _store: {},
                                    },
                                  },
                                  _owner: null,
                                  _store: {},
                                },
                              ],
                            },
                            _owner: null,
                            _store: {},
                          },
                          {
                            key: null,
                            ref: null,
                            type: "h2",
                            props: { children: "Example" },
                            _owner: null,
                            _store: {},
                          },
                          {
                            key: null,
                            ref: null,
                            type: "blockquote",
                            props: {
                              children: '\n    LIST("Andreas", "Freyja") \n  ',
                            },
                            _owner: null,
                            _store: {},
                          },
                          'Will create a list containing two items: "Andreas" and "Freyja"',
                        ],
                      },
                      _owner: null,
                      _store: {},
                    },
                  },
                },
              ],
              description: {
                key: null,
                ref: null,
                props: {
                  children: [
                    {
                      key: null,
                      ref: null,
                      type: "h1",
                      props: { children: "FROM_ENTRIES" },
                      _owner: null,
                      _store: {},
                    },
                    {
                      key: null,
                      ref: null,
                      type: "p",
                      props: {
                        children:
                          "Create a Dictionary from a list of name, value pairs",
                      },
                      _owner: null,
                      _store: {},
                    },
                    {
                      key: null,
                      ref: null,
                      type: "h2",
                      props: { children: "Arguments" },
                      _owner: null,
                      _store: {},
                    },
                    {
                      key: null,
                      ref: null,
                      type: "ol",
                      props: {
                        children: {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "List" },
                                _owner: null,
                                _store: {},
                              },
                              " The list of name, value pairs",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                      },
                      _owner: null,
                      _store: {},
                    },
                  ],
                },
                _owner: null,
                _store: {},
              },
            },
          },
          { name: "Else", formula: { name: "None", type: "null" } },
        ],
        description: {
          key: null,
          ref: null,
          props: {
            children: [
              {
                key: null,
                ref: null,
                type: "h1",
                props: { children: "IF" },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "p",
                props: {
                  children: " Returns a value based on the provided condition",
                },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "h2",
                props: { children: "Arguments" },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "ol",
                props: {
                  children: [
                    {
                      key: null,
                      ref: null,
                      type: "li",
                      props: {
                        children: [
                          " ",
                          {
                            key: null,
                            ref: null,
                            type: "strong",
                            props: { children: "Condition." },
                            _owner: null,
                            _store: {},
                          },
                          " If the value from this formula is FALSE or NULL then the condition is FALSE",
                        ],
                      },
                      _owner: null,
                      _store: {},
                    },
                    {
                      key: null,
                      ref: null,
                      type: "li",
                      props: {
                        children: [
                          " ",
                          {
                            key: null,
                            ref: null,
                            type: "strong",
                            props: { children: "TRUE Value" },
                            _owner: null,
                            _store: {},
                          },
                          " The value to be returned if the condition is TRUE",
                        ],
                      },
                      _owner: null,
                      _store: {},
                    },
                    {
                      key: null,
                      ref: null,
                      type: "li",
                      props: {
                        children: [
                          " ",
                          {
                            key: null,
                            ref: null,
                            type: "strong",
                            props: { children: "FALSE Value" },
                            _owner: null,
                            _store: {},
                          },
                          " The value to be returned if the condition is FALSE",
                        ],
                      },
                      _owner: null,
                      _store: {},
                    },
                  ],
                },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "h2",
                props: { children: "Example 1" },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "blockquote",
                props: {
                  children:
                    '\n          IF(TRUE, "The condition was TRUE", "The condition was FALSE") \n          //returns "The condition was TRUE" \n\n          IF(FALSE, "The condition was TRUE","The condition was FALSE") \n          // returns "The condition was FALSE"\n          \n        ',
                },
                _owner: null,
                _store: {},
              },
              "Will return:",
              {
                key: null,
                ref: null,
                type: "blockquote",
                props: {
                  children: '\n          "The condition was TRUE" \n        ',
                },
                _owner: null,
                _store: {},
              },
              {
                key: null,
                ref: null,
                type: "blockquote",
                props: {
                  children:
                    '\n          IF(FALSE, "The condition was TRUE","The condition was FALSE") \n        ',
                },
                _owner: null,
                _store: {},
              },
              "Will return:",
              {
                key: null,
                ref: null,
                type: "blockquote",
                props: {
                  children: '\n          "The condition was TRUE" \n        ',
                },
                _owner: null,
                _store: {},
              },
            ],
          },
          _owner: null,
          _store: {},
        },
      },
    },
    style: {
      width: "100%",
      height: "100%",
      display: "block",
      position: "relative",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [
          {
            type: "Update Variable",
            value: { name: "Data", path: ["Event", "detail"], type: "path" },
            variableName: "highlightedNode",
          },
        ],
        trigger: "highlight",
        preventDefault: false,
        stopPropagation: false,
      },
      {
        type: "NodeEvent",
        actions: [
          {
            type: "Update Variable",
            value: { name: "Data", path: ["Event", "detail"], type: "path" },
            variableName: "selectedNodeId",
          },
        ],
        trigger: "select",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: [],
  },
  Mavcuyrj0otofjtk8buqG: {
    id: "Mavcuyrj0otofjtk8buqG",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      display: "flex",
      flexGrow: 1,
      position: "relative",
      alignItems: "center",
      flexShrink: 1,
      justifyContent: "center",
    },
    events: [],
    children: ["LeDA_ntQMiq3Ju_ZUkkVf"],
  },
  TxB59xoixcyHiXCH4I7Gd: {
    id: "TxB59xoixcyHiXCH4I7Gd",
    tag: "element-catalog",
    type: "element",
    attrs: {
      component: {
        name: "Data",
        path: ["Variables", "component"],
        type: "path",
      },
      selectedNodeId: {
        name: "Data",
        path: ["Variables", "selectedNodeId"],
        type: "path",
      },
    },
    style: {},
    events: [
      {
        type: "NodeEvent",
        actions: [
          {
            data: { name: "Event", path: ["Event"], type: "path" },
            type: "Debug",
          },
          {
            type: "Update Variable",
            value: "",
            variableName: "showElementCatalog",
          },
        ],
        trigger: "change",
        preventDefault: false,
        stopPropagation: false,
      },
      {
        type: "NodeEvent",
        actions: [
          {
            type: "Update Variable",
            value: "",
            variableName: "showElementCatalog",
          },
        ],
        trigger: "dismiss",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: [],
    condition: {
      name: "Data",
      path: ["Variables", "showElementCatalog"],
      type: "path",
    },
  },
  "UgDvjF79Wz-AYAnAHq3I5": {
    id: "UgDvjF79Wz-AYAnAHq3I5",
    name: "ElementPanel",
    type: "component",
    attrs: {
      node: { name: "Data", path: ["Functions", "selectedNode"], type: "path" },
    },
    events: [
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: {
              name: "SET",
              type: "function",
              arguments: [
                {
                  name: "Object",
                  formula: {
                    name: "Data",
                    path: ["Variables", "component"],
                    type: "path",
                  },
                },
                {
                  name: "Key",
                  formula: { name: "String", type: "string", value: "nodes" },
                },
                {
                  name: "Value",
                  formula: {
                    name: "SET",
                    type: "function",
                    arguments: [
                      {
                        name: "Object",
                        formula: {
                          name: "Data",
                          path: ["Variables", "component", "nodes"],
                          type: "path",
                        },
                      },
                      {
                        name: "Key",
                        formula: {
                          name: "Data",
                          path: ["Variables", "selectedNodeId"],
                          type: "path",
                        },
                      },
                      {
                        name: "Value",
                        formula: {
                          name: "Data",
                          path: ["Event"],
                          type: "path",
                        },
                      },
                    ],
                  },
                },
              ],
            },
            variableName: "component",
          },
          {
            type: "Trigger Mutation",
            onFailed: { type: "QueryEvent", actions: [], trigger: "Failed" },
            variables: {
              update_Component_by_pk___set__name: {
                name: "Data",
                path: ["Variables", "component", "name"],
                type: "path",
              },
              update_Component_by_pk___set__nodes: {
                name: "Data",
                path: ["Variables", "component", "nodes"],
                type: "path",
              },
              update_Component_by_pk___set__props: {
                name: "Data",
                path: ["Variables", "component", "props"],
                type: "path",
              },
              update_Component_by_pk___set__events: {
                name: "Data",
                path: ["Variables", "component", "events"],
                type: "path",
              },
              update_Component_by_pk__pk_columns__id: {
                name: "Data",
                path: ["Variables", "component", "id"],
                type: "path",
              },
              update_Component_by_pk___set__functions: {
                name: "Data",
                path: ["Variables", "component", "functions"],
                type: "path",
              },
              update_Component_by_pk___set__variables: {
                name: "Data",
                path: ["Variables", "component", "variables"],
                type: "path",
              },
            },
            onCompleted: {
              type: "QueryEvent",
              actions: [],
              trigger: "Completed",
            },
            mutationName: "updateComponent",
          },
        ],
        trigger: "updateNode",
      },
    ],
    children: [],
    condition: {
      name: "EQ",
      type: "function",
      arguments: [
        {
          name: "First",
          formula: {
            name: "Data",
            path: ["Functions", "selectedNode", "type"],
            type: "path",
          },
        },
        {
          name: "Second",
          formula: { name: "String", type: "string", value: "element" },
        },
      ],
      description: {
        key: null,
        ref: null,
        props: {
          children: [
            {
              key: null,
              ref: null,
              type: "h1",
              props: { children: "EQ" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "p",
              props: { children: "Returns TRUE if the two values are equal" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Arguments" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "ol",
              props: {
                children: [
                  {
                    key: null,
                    ref: null,
                    type: "li",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "strong",
                          props: { children: "First argument" },
                          _owner: null,
                          _store: {},
                        },
                        " The fist item to be compare",
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "li",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "strong",
                          props: { children: "Second argument" },
                          _owner: null,
                          _store: {},
                        },
                        " The second argument to compare",
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "h2",
              props: { children: "Examples" },
              _owner: null,
              _store: {},
            },
            {
              key: null,
              ref: null,
              type: "blockquote",
              props: {
                children:
                  '\n    EQ("hello ","hi") \n    // returns FALSE\n  \n    EQ("hello ","hello") \n    // returns TRUE\n  ',
              },
              _owner: null,
              _store: {},
            },
          ],
        },
        _owner: null,
        _store: {},
      },
    },
  },
  YWeOtL1v1JgCObPaQtqs9: {
    id: "YWeOtL1v1JgCObPaQtqs9",
    tag: "button",
    type: "element",
    attrs: {
      classList: [
        {
          name: "selected",
          formula: {
            name: "EQ",
            type: "function",
            arguments: [
              {
                name: "First",
                formula: {
                  name: "Data",
                  path: ["Props", "view"],
                  type: "path",
                },
              },
              {
                name: "Second",
                formula: { name: "String", type: "string", value: "data" },
              },
            ],
            description: {
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    key: null,
                    ref: null,
                    type: "h1",
                    props: { children: "EQ" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "p",
                    props: {
                      children: "Returns TRUE if the two values are equal",
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Arguments" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "ol",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "First argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The fist item to be compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "Second argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The second argument to compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Examples" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "blockquote",
                    props: {
                      children:
                        '\n    EQ("hello ","hi") \n    // returns FALSE\n  \n    EQ("hello ","hello") \n    // returns TRUE\n  ',
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
          },
        },
      ],
    },
    style: {
      color: "var(--grey-300)",
      height: "7",
      display: "inline-flex",
      position: "relative",
      variants: [
        {
          style: {
            color: "var(--primary-300)",
            height: "7",
            display: "inline-flex",
            position: "relative",
            boxSizing: "border-box",
            alignItems: "center",
            paddingLeft: "20px",
            borderRadius: 3,
            paddingRight: "20px",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "var(--grey-800)",
            borderRightColor: "var(--grey-900)",
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          },
          className: "selected",
        },
      ],
      boxSizing: "border-box",
      alignItems: "center",
      paddingLeft: "20px",
      borderRadius: 3,
      paddingRight: "20px",
      flexDirection: "row",
      justifyContent: "center",
      borderRightColor: "var(--grey-900)",
      borderRightStyle: "solid",
      borderRightWidth: "1px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
      borderBottomLeftRadius: "0",
      borderBottomRightRadius: "0",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [{ type: "Update Query", value: "data", paramName: "view" }],
        trigger: "click",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: ["fkpsd-_LJ3ydMC7TFM1El"],
  },
  _1DmFerSshP6dv_UPapxl: {
    id: "_1DmFerSshP6dv_UPapxl",
    name: "TreeNode",
    type: "component",
    attrs: {
      id: "ROOT",
      nodes: {
        name: "Data",
        path: ["Queries", "component", "data", "component", "nodes"],
        type: "path",
      },
      indent: "0",
      selectedNodeId: {
        name: "Data",
        path: ["Variables", "selectedNodeId"],
        type: "path",
      },
      highlightedNodeId: {
        name: "Data",
        path: ["Variables", "highlightedNode"],
        type: "path",
      },
    },
    events: [
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: { name: "Data", path: ["Event"], type: "path" },
            variableName: "selectedNodeId",
          },
        ],
        trigger: "selectNode",
      },
      {
        type: "ComponentEvent",
        actions: [
          {
            type: "Update Variable",
            value: { name: "Data", path: ["Event"], type: "path" },
            variableName: "highlightedNode",
          },
          {
            data: { name: "Event", path: ["Event"], type: "path" },
            type: "Debug",
          },
        ],
        trigger: "highlightNode",
      },
    ],
    children: [],
  },
  bO9Xhr0bYN4I441S7gjH1: {
    id: "bO9Xhr0bYN4I441S7gjH1",
    type: "text",
    style: { fontSize: "14px" },
    value: "Loading",
    condition: {
      name: "Data",
      path: ["Mutations", "updateComponent", "isLoading"],
      type: "path",
    },
  },
  by6mvjFgDVc3igQcTZL_p: {
    id: "by6mvjFgDVc3igQcTZL_p",
    tag: "button",
    type: "element",
    attrs: {
      classList: [
        {
          name: "selected",
          formula: {
            name: "EQ",
            type: "function",
            arguments: [
              {
                name: "First",
                formula: {
                  name: "Data",
                  path: ["Props", "view"],
                  type: "path",
                },
              },
              {
                name: "Second",
                formula: { name: "String", type: "string", value: "preview" },
              },
            ],
            description: {
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    key: null,
                    ref: null,
                    type: "h1",
                    props: { children: "EQ" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "p",
                    props: {
                      children: "Returns TRUE if the two values are equal",
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Arguments" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "ol",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "First argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The fist item to be compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "Second argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The second argument to compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Examples" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "blockquote",
                    props: {
                      children:
                        '\n    EQ("hello ","hi") \n    // returns FALSE\n  \n    EQ("hello ","hello") \n    // returns TRUE\n  ',
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
          },
        },
      ],
    },
    style: {
      color: "var(--grey-300)",
      height: "7",
      display: "inline-flex",
      position: "relative",
      variants: [
        {
          style: {
            color: "var(--primary-300)",
            height: "7",
            display: "inline-flex",
            position: "relative",
            boxSizing: "border-box",
            alignItems: "center",
            paddingLeft: "20px",
            borderRadius: 3,
            paddingRight: "20px",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "var(--grey-800)",
            borderRightColor: "var(--grey-900)",
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderTopLeftRadius: "0",
            borderTopRightRadius: "1",
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "1",
          },
          className: "selected",
        },
      ],
      boxSizing: "border-box",
      alignItems: "center",
      paddingLeft: "20px",
      borderRadius: 3,
      paddingRight: "20px",
      flexDirection: "row",
      justifyContent: "center",
      borderRightColor: "var(--grey-900)",
      borderRightStyle: "solid",
      borderRightWidth: "1px",
      borderTopLeftRadius: "0",
      borderTopRightRadius: "1",
      borderBottomLeftRadius: "0",
      borderBottomRightRadius: "1",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [
          { type: "Update Query", value: "preview", paramName: "view" },
        ],
        trigger: "click",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: ["2yKWKtkMNTR-YU5brtUEU"],
  },
  "fkpsd-_LJ3ydMC7TFM1El": {
    id: "fkpsd-_LJ3ydMC7TFM1El",
    type: "text",
    style: { fontSize: "14px" },
    value: "Data",
  },
  lgPkEL3jW43pCav97TF2p: {
    id: "lgPkEL3jW43pCav97TF2p",
    tag: "h2",
    type: "element",
    attrs: {},
    style: {
      width: "auto",
      margin: "0px",
      padding: "0px",
      fontSize: "14px",
      position: "relative",
      boxSizing: "border-box",
      marginTop: "0",
      marginLeft: "0",
      paddingTop: "0",
      marginRight: "0",
      paddingLeft: "0",
      marginBottom: "0",
      paddingRight: "0",
      paddingBottom: "0",
    },
    events: [],
    children: ["7QH8tr4Rsk4wUSXw582xo"],
  },
  ofsORBbSt6e2L_B34jVL8: {
    id: "ofsORBbSt6e2L_B34jVL8",
    name: "MainMenu",
    type: "component",
    attrs: {},
    events: [],
    children: [],
  },
  rRL0VZlw6DjczAl3SgXdm: {
    id: "rRL0VZlw6DjczAl3SgXdm",
    tag: "button",
    type: "element",
    attrs: {},
    style: {
      width: "17",
      height: "8",
      display: "inline-flex",
      position: "relative",
      boxSizing: "border-box",
      alignItems: "center",
      paddingLeft: "20px",
      borderRadius: 3,
      paddingRight: "20px",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "var(--grey-700)",
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
            value: {
              name: "Data",
              path: ["Queries", "component", "data", "component"],
              type: "path",
            },
            variableName: "component",
          },
          {
            type: "Update Variable",
            value: {
              name: "CUSTOM_FUNCTION",
              type: "function",
              varArgs: true,
              arguments: [
                {
                  name: "Function",
                  formula: {
                    name: "String",
                    type: "string",
                    value: "getInitialComponentData",
                  },
                },
                {
                  name: "Input",
                  formula: {
                    name: "Data",
                    path: ["Queries", "component", "data", "component"],
                    type: "path",
                  },
                },
              ],
            },
            variableName: "componentData",
          },
        ],
        trigger: "click",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: ["xmX2BnNnsi7f6IWwcSOe4"],
  },
  "savoPyIyRwT3-w4DNvJhI": {
    id: "savoPyIyRwT3-w4DNvJhI",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      right: "0",
      width: "56",
      display: "block",
      position: "relative",
      backgroundColor: "var(--grey-800)",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [],
        trigger: "click",
        preventDefault: false,
        stopPropagation: true,
      },
    ],
    children: ["UgDvjF79Wz-AYAnAHq3I5"],
  },
  "tjGh9yKSoP-lwWWu8hjze": {
    id: "tjGh9yKSoP-lwWWu8hjze",
    tag: "button",
    type: "element",
    attrs: {
      classList: [
        {
          name: "selected",
          formula: {
            name: "EQ",
            type: "function",
            arguments: [
              {
                name: "First",
                formula: {
                  name: "Data",
                  path: ["Props", "view"],
                  type: "path",
                },
              },
              {
                name: "Second",
                formula: { name: "String", type: "string", value: "design" },
              },
            ],
            description: {
              key: null,
              ref: null,
              props: {
                children: [
                  {
                    key: null,
                    ref: null,
                    type: "h1",
                    props: { children: "EQ" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "p",
                    props: {
                      children: "Returns TRUE if the two values are equal",
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Arguments" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "ol",
                    props: {
                      children: [
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "First argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The fist item to be compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                        {
                          key: null,
                          ref: null,
                          type: "li",
                          props: {
                            children: [
                              {
                                key: null,
                                ref: null,
                                type: "strong",
                                props: { children: "Second argument" },
                                _owner: null,
                                _store: {},
                              },
                              " The second argument to compare",
                            ],
                          },
                          _owner: null,
                          _store: {},
                        },
                      ],
                    },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "h2",
                    props: { children: "Examples" },
                    _owner: null,
                    _store: {},
                  },
                  {
                    key: null,
                    ref: null,
                    type: "blockquote",
                    props: {
                      children:
                        '\n    EQ("hello ","hi") \n    // returns FALSE\n  \n    EQ("hello ","hello") \n    // returns TRUE\n  ',
                    },
                    _owner: null,
                    _store: {},
                  },
                ],
              },
              _owner: null,
              _store: {},
            },
          },
        },
      ],
    },
    style: {
      color: "var(--primary-300)",
      height: "7",
      display: "inline-flex",
      position: "relative",
      variants: [
        {
          style: {
            color: "var(--primary-300)",
            height: "7",
            display: "inline-flex",
            position: "relative",
            boxSizing: "border-box",
            alignItems: "center",
            paddingLeft: "20px",
            borderRadius: 3,
            paddingRight: "20px",
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "var(--grey-800)",
            borderRightColor: "var(--grey-900)",
            borderRightStyle: "solid",
            borderRightWidth: "1px",
            borderTopLeftRadius: "1",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "1",
            borderBottomRightRadius: "0",
          },
          className: "selected",
        },
      ],
      boxSizing: "border-box",
      alignItems: "center",
      paddingLeft: "20px",
      borderRadius: 3,
      paddingRight: "20px",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: "var(--grey-700)",
      borderRightColor: "var(--grey-900)",
      borderRightStyle: "solid",
      borderRightWidth: "1px",
      borderTopLeftRadius: "2",
      borderTopRightRadius: "2",
      borderBottomLeftRadius: "2",
      borderBottomRightRadius: "2",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [{ type: "Update Query", value: "design", paramName: "view" }],
        trigger: "click",
        preventDefault: false,
        stopPropagation: false,
      },
    ],
    children: ["J0yiF8UmPJbl0rvd1mTEC"],
  },
  u8HSgHfwbKugmbVRnsbL2: {
    id: "u8HSgHfwbKugmbVRnsbL2",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      display: "flex",
      position: "relative",
      alignItems: "center",
      paddingLeft: "4",
      paddingRight: "4",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    events: [],
    children: ["lgPkEL3jW43pCav97TF2p", "2p7aZfBpUI0EvCRTm0mNi"],
  },
  xmX2BnNnsi7f6IWwcSOe4: {
    id: "xmX2BnNnsi7f6IWwcSOe4",
    type: "text",
    style: {
      color: "#ffffff",
      fontSize: "14px",
      fontFamily: "'Montserrat',sans-serif",
    },
    value: {
      name: "Data",
      path: ["Variables", "component", "name"],
      type: "path",
    },
  },
  zAyNhXEqeQSmrZvfBYO8S: {
    id: "zAyNhXEqeQSmrZvfBYO8S",
    tag: "div",
    type: "element",
    attrs: {},
    style: {
      color: "var(--grey-200)",
      width: "56",
      display: "block",
      overflow: "auto",
      position: "relative",
      paddingTop: "4",
      paddingBottom: "4",
      backgroundColor: "var(--grey-800)",
    },
    events: [
      {
        type: "NodeEvent",
        actions: [],
        trigger: "click",
        preventDefault: false,
        stopPropagation: true,
      },
    ],
    children: ["u8HSgHfwbKugmbVRnsbL2", "_1DmFerSshP6dv_UPapxl"],
  },
};