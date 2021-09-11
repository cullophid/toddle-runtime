import { createNode } from "../runtime";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { NodeModel } from "../NodeModel";
import { signal, Signal } from "../signal";
import { insertFonts, insertStyles } from "../style";
import { insertTheme } from "../theme";

export class Canvas extends HTMLElement {
  _nodes?: Record<string, NodeModel>;
  _components?: Record<string, ComponentModel>;
  dataSignal: Signal<ComponentData>;
  iframe?: HTMLIFrameElement;
  selectionOverlay: HTMLDivElement;
  highlightOverlay: HTMLDivElement;
  destroy?: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.iframe = document.createElement("iframe");
    this.iframe.style.border = "none";
    this.iframe.style.pointerEvents = "none";
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";
    this.shadowRoot?.appendChild(this.iframe);

    this.selectionOverlay = document.createElement("div");
    highlightOverlay: HTMLDivElement;

    this.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      const elementId = this.getElementIdFromMousePos(
        { x: e.clientX, y: e.clientY },
        e.metaKey
      );
      if (typeof elementId === "string") {
        this.dispatchEvent(
          new CustomEvent("select", {
            detail: elementId,
            composed: true,
          })
        );
      }
    });
    this.addEventListener("mousemove", (e) => {
      const elementId = this.getElementIdFromMousePos(
        { x: e.clientX, y: e.clientY },
        e.metaKey
      );
      this.dispatchEvent(
        new CustomEvent("highlight", {
          detail: elementId,
          composed: true,
        })
      );
    });
    this.addEventListener("mouseleave", () => {
      this.dispatchEvent(
        new CustomEvent("highlight", {
          detail: undefined,
          composed: true,
        })
      );
    });
    this.dataSignal = signal<ComponentData>(null as any);

    const selectionSignal = this.dataSignal.map(
      (data) => data?.Variables?.selectedNodeId
    );
    selectionSignal.subscribe((selectedNodeId) => {
      const elem = this.iframe?.contentDocument?.querySelector(
        `[data-id="${selectedNodeId}"]`
      );
    });
    this.render();
  }
  getElementIdFromMousePos(
    mousePos: { x: number; y: number },
    includeTextNodes?: boolean
  ) {
    const selectedNodeId = this.dataSignal.value?.Variables.selectedNodeId;
    const zoom = 1;
    const rect = this.getBoundingClientRect();
    const elements = this.iframe?.contentDocument?.elementsFromPoint(
      (mousePos.x - (rect?.left ?? 0)) / zoom,
      (mousePos.y - (rect?.top ?? 0)) / zoom
    );

    const elem = elements?.find((elem, i) => {
      const id = elem.getAttribute("data-id");
      if (!id) {
        return null;
      }
      const node = this._nodes?.[id];
      if (!node) {
        return null;
      }
      if (node.type === "text") {
        if (
          includeTextNodes ||
          elements[i + 1]?.getAttribute("data-id") === selectedNodeId
        ) {
          return elem;
        }
      }
      return elem;
    });
    return elem?.getAttribute("data-id");
  }

  disconnectedCallback() {
    this.destroy?.();
  }

  render() {
    console.log("RENDER", this);
    if (!this.iframe) {
      return;
    }
    if (window.parent !== window) {
      return;
    }
    if (!this.dataSignal || !this._nodes) {
      return;
    }
    const root = this._nodes?.["ROOT"];
    if (!this.iframe?.contentDocument || !root) {
      return;
    }
    this.destroy?.();

    insertTheme(this.iframe.contentDocument.head);
    insertStyles(
      this.iframe.contentDocument.head,
      Object.values(this.components)
    );
    insertFonts(
      this.iframe.contentDocument.head,
      Object.values(this.components)
    );

    this.destroy = createNode({
      node: root,
      dataSignal: this.dataSignal,
      parent: this.iframe.contentDocument?.body,
      ctx: {
        componentName: "bob",
        components: this.components,
        dataSignal: this.dataSignal,
        nodes: this._nodes,
        onEvent: console.log,
      },
    });
  }
  renderOverlay() {}
  set nodes(nodes: Record<string, NodeModel>) {
    this._nodes = nodes;
    this.render();
  }

  set data(data: ComponentData) {
    this.dataSignal.set(data);
  }

  set components(components: Record<string, ComponentModel>) {
    this._components = components;
    this.render();
  }
  get components() {
    return this._components ?? {};
  }
}
