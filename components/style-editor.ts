import { NodeStyleModel, StyleDeclarationBlock, StyleVariant } from "NodeModel";
import { CssEditor } from "./css-editor";
customElements.define("css-editor", CssEditor, {});
export class StyleEditor extends HTMLElement {
  baseEditor: CssEditor;
  variants: HTMLElement[];
  _style?: NodeStyleModel;
  constructor() {
    super();
    this.variants = [];
    this.attachShadow({ mode: "open" });
    this.baseEditor = document.createElement("css-editor") as CssEditor;

    this.baseEditor.addEventListener("update", (e) => {
      this.dispatchEvent(
        new CustomEvent("update", {
          detail: {
            ...(e as CustomEvent).detail,
            variants: this._style?.variants,
            breakpoints: this._style?.breakpoints,
          },
        })
      );
    });
    this.shadowRoot?.appendChild(this.baseEditor);
  }

  set styles(styleObject: NodeStyleModel) {
    this._style = styleObject;
    const { variants, breakpoints, ...baseStyles } = styleObject;
    this.baseEditor.css = baseStyles;
    this.variants.forEach((variant) => variant.remove());
    variants?.forEach((variant) => {
      const container = document.createElement("div");
      const input = document.createElement("input");
      container.appendChild(input);
      input.value = variant.className ?? "";
      input.addEventListener("change", (e) => {
        this.dispatchEvent(
          new CustomEvent("update", {
            detail: {
              ...this.style,
              variants: variants.map((va) =>
                va === variant ? { ...va, className: input.value } : va
              ),
            },
          })
        );
      });
      const editor = document.createElement("css-editor") as CssEditor;
      container.appendChild(editor);
      editor.css = variant.style;
      editor.addEventListener("update", (e) => {
        this.dispatchEvent(
          new CustomEvent("update", {
            detail: {
              ...this.styles,
              variants: variants.map((va) =>
                va === variant
                  ? { ...variant, style: (e as CustomEvent).detail }
                  : va
              ),
            },
          })
        );
      });
      this.shadowRoot?.appendChild(container);
      this.variants.push(container);
    });
  }

  get styles() {
    return this._style ?? {};
  }
}
