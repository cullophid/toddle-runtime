import { StyleDeclarationBlock } from "NodeModel";

export class CssEditor extends HTMLElement {
  editor: HTMLDivElement;
  constructor() {
    super();

    this.editor = document.createElement("div");
    this.attachShadow({ mode: "open" });

    this.editor.style.height = "200px";
    this.editor.style.overflow = "auto";

    this.editor.style.color = "#f5f5f5";
    this.editor.style.padding = "8px";
    this.editor.style.margin = "8px";
    this.editor.style.borderRadius = "4px";

    this.editor.style.lineHeight = "1.5";
    this.editor.style.background = "#222";
    this.editor.style.marginTop = "16px";
    this.editor.contentEditable = "true";

    this.editor.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && e.shiftKey) {
        e.preventDefault();
        const detail = this.css;
        this.dispatchEvent(
          new CustomEvent("update", {
            detail,
          })
        );
      }
    });
    this.shadowRoot?.appendChild(this.editor);
  }

  set css(styleObject: StyleDeclarationBlock) {
    const textValue = Object.entries(styleObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");
    this.editor.innerText = textValue;
  }
  get css() {
    const styleObject: StyleDeclarationBlock = Object.fromEntries(
      this.editor.innerText
        .split("\n")
        .filter((line) => line !== "")
        .map((line) => line.split(":").map((l) => l.trim()))
    );
    return styleObject;
  }
}
