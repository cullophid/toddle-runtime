import { createNode } from "../runtime";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { NodeModel } from "../NodeModel";
import { signal, Signal } from "../signal";
import { insertFonts, insertStyles } from "../style";
import { insertTheme } from "../theme";

export class Canvas extends HTMLElement {
  _component?: ComponentModel;
  _components?: Record<string, ComponentModel>;
  dataSignal: Signal<ComponentData>;
  iframe: HTMLIFrameElement;
  selectionOverlay: HTMLDivElement;
  highlightOverlay: HTMLDivElement;
  _selectedNodeId: string | undefined;
  _highlightedNodeId: string | undefined;
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
    this.selectionOverlay.style.position = "absolute";
    this.selectionOverlay.style.boxShadow = "0px 0px 0px 1px  #ff5877";
    this.shadowRoot?.appendChild(this.selectionOverlay);

    this.highlightOverlay = document.createElement("div");
    this.highlightOverlay.style.position = "absolute";
    this.highlightOverlay.style.boxShadow = "0px 0px 0px 2px #ff5877aa";
    this.shadowRoot?.appendChild(this.highlightOverlay);

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

    this.render();
  }
  getElementIdFromMousePos(
    mousePos: { x: number; y: number },
    includeTextNodes?: boolean
  ) {
    if (this.dataSignal.value === null) {
      return;
    }
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
      const node = this._component?.nodes?.[id];
      if (!node) {
        return null;
      }
      if (node.type === "text") {
        if (
          includeTextNodes ||
          elements[i + 1]?.getAttribute("data-id") === this.selectedNodeId
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
    console.log("RENDER?");
    // dont render inside an iframe
    // so we dont have infinite recusion when rendering toddle editor :)
    if (window.parent !== window) {
      return;
    }
    if (!this.dataSignal.value || !this._component || !this._components) {
      console.log(
        "MISSING",
        this.dataSignal,
        this._component,
        this._components
      );
      return;
    }
    const root = this._component?.nodes["ROOT"];
    if (!this.iframe.contentDocument || !root) {
      console.log("ROOT", root, this.iframe.contentDocument);
      return;
    }
    console.log("RENDER");

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

    (this.iframe.contentWindow as any).toddle = window.toddle;

    this.destroy = createNode({
      node: root,
      dataSignal: this.dataSignal,
      parent: this.iframe.contentDocument?.body,
      ctx: {
        isRootComponent: true,
        component: this._component,
        dataSignal: this.dataSignal,
        onEvent: console.log,
      },
    });
  }
  onHighlightChange(highlightedNodeId: string | undefined) {
    this._highlightedNodeId = highlightedNodeId;
    if (!highlightedNodeId || highlightedNodeId === this.selectedNodeId) {
      this.highlightOverlay.style.display = "none";
      return;
    }
    const elem = this.iframe?.contentDocument?.querySelector(
      `[data-id="${highlightedNodeId}"]`
    );
    if (!elem) {
      this.highlightOverlay.style.display = "none";
      return;
    }
    const rect = elem.getBoundingClientRect();
    this.highlightOverlay.style.display = "block";
    this.highlightOverlay.style.left = `${rect.left}px`;
    this.highlightOverlay.style.top = `${rect.top}px`;
    this.highlightOverlay.style.width = `${rect.width}px`;
    this.highlightOverlay.style.height = `${rect.height}px`;
  }
  onSelectionchange(nodeId: string | undefined) {
    this._selectedNodeId = nodeId;
    if (!nodeId) {
      this.selectionOverlay.style.display = "none";
      return;
    }
    if (this.highlightedNodeId === nodeId) {
      this.highlightOverlay.style.display = "none";
    }
    const elem = this.iframe?.contentDocument?.querySelector(
      `[data-id="${nodeId}"]`
    );
    if (!elem) {
      this.selectionOverlay.style.display = "none";
      return;
    }
    const rect = elem.getBoundingClientRect();
    this.selectionOverlay.style.display = "block";
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
  }
  renderOverlay() {}
  set component(component: ComponentModel) {
    this._component = component;
    this.render();
  }
  get selectedNodeId() {
    return this._selectedNodeId;
  }
  set selectedNodeId(selectedNodeId: string | undefined) {
    if (this._selectedNodeId !== selectedNodeId) {
      this.onSelectionchange(selectedNodeId);
    }
  }
  get highlightedNodeId() {
    return this._highlightedNodeId;
  }
  set highlightedNodeId(highlightedNodeId: string | undefined) {
    if (this._highlightedNodeId !== highlightedNodeId) {
      this.onHighlightChange(highlightedNodeId);
    }
  }

  set data(data: ComponentData) {
    console.log("SET DATA", data);
    if (!data.Variables || !data.Props) {
      console.log(`INVALID DATA ${JSON.stringify(data)}`);
      return;
    }
    this.dataSignal.set(data);
    this.render();
  }
  get data() {
    return this.dataSignal.get();
  }

  set components(components: Record<string, ComponentModel>) {
    console.log("COMPONENTS", components);
    this._components = components;
    this.render();
  }
  get components() {
    return this._components ?? {};
  }
}
