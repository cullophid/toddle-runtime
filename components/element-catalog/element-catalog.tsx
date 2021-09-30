import React, { CSSProperties, useMemo, useRef, useState } from "react";
import ReactDom from "react-dom";
import {
  getNode,
  insertNode,
  NodeModel,
  resolveStyleBlock,
} from "../../NodeModel";
import { ComponentModel } from "../../ComponentModel";

type Props = {
  onDismiss: () => void;
  selectedNodeId: string;
  component: ComponentModel;
  components: ComponentModel[];
  onChange: (component: ComponentModel) => void;
};

const Catalog = React.memo((props: Props) => {
  const [search, setSearch] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const components: SwatchElement[] = props.components?.map((c) => ({
    name: c.name,
    section: "Components",
    label: c.name,
    components: [
      {
        id: "1234",
        component: c,
      },
    ],
    node: {
      type: "component",
      name: c.name,
      attrs: {},
      children: [],
      events: [],
    },
  }));

  const onSelect = (newNode: NodeModel) => {
    const parent = getNode(props.component.root, props.selectedNodeId);
    if (parent?.type !== "element") {
      return;
    }
    props.onDismiss();
    props.onChange({
      ...props.component,
      root: insertNode(
        props.component.root,
        props.selectedNodeId + "." + parent.children.length,
        newNode
      ),
    });
  };

  const sections = {
    Basic: [divElement, textNode],
    Components: components,
  };

  return (
    <div className="fixed left-0 top-0 w-56 h-80 flex flex-col">
      <header className="p-2 flex items-center gap-2">
        <div className="relative flex-1 grid grid-cols-[auto,1fr] items-center bg-grey-700 border border-grey-600 box-border rounded-full h-7 px-1 gap-1 hover:border-grey-400 focus-within:border-primary-300 focus-within:bg-grey-100">
          <SearchIcon size={24} color="#a3a3a3" />
          <input
            className="border-none bg-transparent left-0 top-0 w-full h-full  pr-1 pl-7 text-grey-800 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="bg-none" onClick={() => props.onDismiss()}>
          X
        </button>
      </header>
      {props.selectedNodeId === undefined && (
        <div className="flex-1 p-2">
          <p className="text-grey-200">
            Please select an existing element to add a child.
          </p>
        </div>
      )}
      {props.selectedNodeId && (
        <div
          className="overflow-auto flex-1 bg-grey-700 relative flex-1"
          ref={listRef}
        >
          {Object.entries(sections).map(([section, elements]) => {
            const filteredElements = elements.filter((e) =>
              e.label.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            );
            if (filteredElements.length > 0) {
              return (
                <ElementGroup
                  key={section}
                  search={search}
                  title={section}
                  elements={filteredElements}
                  onDismiss={props.onDismiss}
                  onSelection={onSelect}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
});
type ElementGroupProps = {
  className?: string;
  title: string;
  search: string;
  onDismiss: () => void;
  elements: SwatchElement[];
  onSelection: (node: NodeModel) => void;
};
const ElementGroup = (props: ElementGroupProps) => {
  if (props.elements.length === 0) {
    return null;
  }
  return (
    <section data-section={props.title}>
      <h3 className="bg-grey-800 px-4 py-1 m-0 font-sans font-bold text-sm uppercase text-grey-400 sticky top-0 z-10">
        {props.title}
      </h3>
      <ul>
        {props.elements.map((elem) => (
          <ElementItem
            key={elem.name}
            {...elem}
            hidePanel={props.onDismiss}
            onSelection={props.onSelection}
          />
        ))}
      </ul>
    </section>
  );
};

type ElementItemProps = {
  node: NodeModel;
  components?: { id: string; component: ComponentModel }[];
  hideLabel?: boolean;
  name: string;
  label?: string;
  hidePanel: () => void;
  selectedNodeId?: string;
  onSelection: (element: NodeModel) => void;
};

const ElementItem = (props: ElementItemProps) => {
  return (
    <li
      title={props.name}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          props.onSelection(props.node);
        }
      }}
      tabIndex={0}
      onClick={() => props.onSelection(props.node)}
      className="list-none group bg-transparent text-left border-none focus:outline-none focus:bg-grey-600 hover:bg-grey-600 text-grey-200 w-full py-2 px-4"
    >
      {props.label ?? null}
    </li>
  );
};

type NodeProps = {
  node: NodeModel;
};

const PreviewNode = ({ node }: NodeProps) => {
  if (!node) {
    return null;
  }
  const style = resolveStyleBlock({
    ...(node.type === "element" ? node.style : {}),
    animationName: undefined,
  });

  switch (node.type) {
    case "component":
      return (
        <div style={style}>
          {node.children.map((child, i) => (
            <PreviewNode key={i} node={child} />
          ))}
        </div>
      );
    case "element":
      return (
        <div style={style}>
          {node.children.map((child, i) => (
            <PreviewNode key={i} node={child} />
          ))}
        </div>
      );

    case "text":
      return <span style={style}> {node.value}</span>;
  }
};
export type SwatchElement = {
  name: string;
  section: string;
  label: string;
  components?: { id: string; component: ComponentModel }[];
  node: NodeModel;
};

export const divElement: SwatchElement = {
  name: "Div",
  label: "Div",
  section: "Basic",

  node: {
    type: "element",
    tag: "div",
    events: [],
    classList: [],
    attrs: {},
    style: {},
    children: [],
  },
};

export const textNode: SwatchElement = {
  name: "Text",
  label: "text",
  section: "Basic",
  node: {
    style: {
      fontSize: "14px",
    },
    type: "text",
    value: { type: "value", value: "Text" },
  },
};

type IconProps = {
  style?: CSSProperties;
  color: string;
  size: number;
  className?: string;
};

export const SearchIcon = (props: IconProps) => (
  <svg
    className={props.className}
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="10.5" cy="10.5" r="4" stroke={props.color} />
    <path d="M13 14L18 19" stroke={props.color} />
  </svg>
);

export class ElementCatalog extends HTMLElement {
  _selectedNodeId?: string;
  _component?: ComponentModel;
  _components?: ComponentModel[];
  constructor() {
    super();
    this.render();
  }
  disconnectedCallback() {
    this.remove();
  }
  get selectedNodeId() {
    return this._selectedNodeId;
  }
  set selectedNodeId(selectedNodeId) {
    this._selectedNodeId = selectedNodeId;
    this.render();
  }
  get component() {
    return this._component;
  }
  set component(component) {
    this._component = component;
    this.render();
  }
  get components() {
    return this._components;
  }
  set components(components) {
    this._components = components;
    this.render();
  }

  render() {
    console.log(this.component, this.selectedNodeId, this.components);
    if (this.component && this.selectedNodeId && this.components) {
      ReactDom.render(
        <Catalog
          selectedNodeId={this.selectedNodeId}
          component={this.component}
          components={this.components}
          onChange={(component) =>
            this.dispatchEvent(new CustomEvent("change", { detail: component }))
          }
          onDismiss={() => this.dispatchEvent(new CustomEvent("dismiss", {}))}
        />,
        this
      );
    }
  }
}
