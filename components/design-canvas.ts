import { createNode } from "../runtime";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { signal, Signal } from "../signal";
import { insertFonts, insertStyles } from "../style";
import { insertTheme } from "../theme";
import { getNode } from "../NodeModel";

export class DesignCanvas extends HTMLElement {
  _component?: ComponentModel;
  _components?: ComponentModel[];
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

    this.iframe.onload = () => this.render();

    this.shadowRoot?.appendChild(this.iframe);

    this.selectionOverlay = document.createElement("div");
    this.selectionOverlay.style.position = "absolute";
    this.selectionOverlay.style.border = "1px solid #ff5877";
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
      if (typeof elementId === "string" && elementId !== this._selectedNodeId) {
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
      if (elementId && elementId !== this.highlightedNodeId) {
        this.dispatchEvent(
          new CustomEvent("highlight", {
            detail: elementId,
            composed: true,
          })
        );
      }
    });
    this.addEventListener("mouseleave", () => {
      this.dispatchEvent(
        new CustomEvent("highlight", {
          detail: undefined,
          composed: true,
        })
      );
    });
    this.dataSignal = signal<ComponentData>({
      Props: {},
      Variables: {},
    });

    this.render();
  }
  getElementIdFromMousePos(
    mousePos: { x: number; y: number },
    includeTextNodes?: boolean
  ) {
    if (this.dataSignal.value === null || !this.component) {
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
      if (!id || !this.component) {
        return false;
      }

      const node = getNode(this.component.root, id);
      if (!node) {
        return false;
      }
      if (node.type === "text") {
        if (
          includeTextNodes ||
          elements[i + 1]?.getAttribute("data-id") === this.selectedNodeId
        ) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    });
    return elem?.getAttribute("data-id");
  }

  disconnectedCallback() {
    this.destroy?.();
  }

  render() {
    // dont render inside an iframe
    // so we dont have infinite recusion when rendering toddle editor :)
    if (getIframeDepth() > 3) {
      return;
    }
    if (!this.component) {
      return;
    }
    if (!this._components) {
      return;
    }
    const root = this.component.root;
    if (!this.iframe.contentDocument || !this.iframe.contentWindow || !root) {
      return;
    }

    this.destroy?.();

    insertTheme(this.iframe.contentDocument.head);
    insertStyles(this.iframe.contentDocument.head, this.components);
    insertFonts(this.iframe.contentDocument.head, this.components);

    this.iframe.contentWindow.toddle = {
      ...window.toddle,
      components: this.components,
    };

    this.destroy = createNode({
      node: root,
      dataSignal: this.dataSignal,
      id: "0",
      parent: this.iframe.contentDocument?.body,
      ctx: {
        isRootComponent: true,
        component: this.component,
        dataSignal: this.dataSignal,
        onEvent: console.log,
        mutations: {},
      },
    });
  }
  onHighlightChange(highlightedNodeId: string | undefined) {
    this._highlightedNodeId = highlightedNodeId;

    if (!this.component) {
      return;
    }

    if (!highlightedNodeId || highlightedNodeId === this.selectedNodeId) {
      this.highlightOverlay.style.display = "none";

      return;
    }
    const node = getNode(this.component.root, highlightedNodeId);
    const elem = this.iframe?.contentDocument?.querySelector(
      `[data-id="${highlightedNodeId}"]`
    );
    if (!elem || !node) {
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
    if (!this.component) {
      return;
    }
    if (!nodeId) {
      this.selectionOverlay.style.display = "none";
      return;
    }
    if (this.highlightedNodeId === nodeId) {
      this.highlightOverlay.style.display = "none";
      return;
    }

    const elem = this.iframe?.contentDocument?.querySelector(
      `[data-id="${nodeId}"]`
    );
    const node = getNode(this.component.root, nodeId);
    if (!elem || !node) {
      this.selectionOverlay.style.display = "none";
      return;
    }
    const rect = elem.getBoundingClientRect();
    this.selectionOverlay.style.display = "block";
    this.selectionOverlay.style.left = `${rect.left}px`;
    this.selectionOverlay.style.top = `${rect.top}px`;
    this.selectionOverlay.style.width = `${rect.width}px`;
    this.selectionOverlay.style.height = `${rect.height}px`;
    this.selectionOverlay.style.borderStyle =
      node.type === "text" ? "dashed" : "solid";
  }
  renderOverlay() {}

  set component(component: ComponentModel | undefined) {
    this._component = component;
    this.render();
  }
  get component() {
    return this._component;
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
    if (!data?.Variables || !data.Props) {
      return;
    }
    this.dataSignal.set(data);
  }
  get data() {
    return this.dataSignal.get();
  }

  set components(components: ComponentModel[]) {
    this._components = components;
    this.render();
  }
  get components() {
    return this._components ?? [];
  }
  set interactions(interactions: boolean) {
    this.iframe.style.pointerEvents = interactions ? "default" : "none";
  }
}

const getIframeDepth = () => {
  const run = (currentWindow: Window, currentDepths: number): number => {
    if (currentWindow === currentWindow.parent) {
      return currentDepths;
    }
    return run(currentWindow.parent, currentDepths + 1);
  };
  return run(window, 0);
};
