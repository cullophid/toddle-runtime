import { createNode } from "../runtime";
import { ComponentData, ComponentModel } from "../ComponentModel";
import { signal, Signal } from "../signal";
import { insertFonts, insertStyles } from "../style";
import { insertTheme } from "../theme";

export class PreviewCanvas extends HTMLElement {
  _component?: ComponentModel;
  _components?: ComponentModel[];
  dataSignal: Signal<ComponentData>;
  iframe: HTMLIFrameElement;
  destroy?: () => void;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.iframe = document.createElement("iframe");
    this.iframe.style.border = "none";
    this.iframe.style.width = "100%";
    this.iframe.style.height = "100%";

    this.iframe.onload = () => {
      this.render();
      this.iframe.contentDocument?.addEventListener("keydown", (event) => {
        switch (event.key) {
          case "1":
          case "2":
          case "3":
            this.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: event.key,
                bubbles: true,
              })
            );
          case "p":
            if (event.metaKey) {
              this.dispatchEvent(
                new KeyboardEvent("keydown", {
                  key: event.key,
                  metaKey: true,
                  bubbles: true,
                })
              );
            }
        }
      });
    };

    this.shadowRoot?.appendChild(this.iframe);
    this.dataSignal = signal<ComponentData>({
      Props: {},
      Variables: {},
    });

    const variableSignal = this.dataSignal.map((data) => data.Variables);

    variableSignal.subscribe((Variables) => {
      this.dispatchEvent(
        new CustomEvent("variablesChanged", {
          detail: Variables,
        })
      );
    });

    this.render();
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
      console.log("NO COMPONENT");
      return;
    }
    if (!this._components) {
      console.log("NO COMPONENT S");
      return;
    }
    const root = this.component.root;
    if (!this.iframe.contentDocument || !this.iframe.contentWindow || !root) {
      console.log("NO iframe", this.iframe.contentDocument, root);
      return;
    }
    console.log("RENDERING");

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

  set component(component: ComponentModel | undefined) {
    this._component = component;
    this.render();
  }
  get component() {
    return this._component;
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
