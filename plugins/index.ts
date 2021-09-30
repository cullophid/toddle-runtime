import "./init";
import "./editorLoaded";
import "./getInitialComponentData";
import "./getNode";
import "./updateNode";
import "./getNodeData";
import { ElementAttributes } from "../components/element-attributes";
import { ElementEvents } from "../components/element-events";
import { StyleEditor } from "../components/style-editor";
import { Canvas } from "../components/canvas-iframe";
import { FormulaEditor } from "../components/formula-editor";

customElements.define("element-attributes", ElementAttributes, {});
customElements.define("element-events", ElementEvents, {});
customElements.define("style-editor", StyleEditor, {});
customElements.define("canvas-iframe", Canvas, {});
customElements.define("formula-editor", FormulaEditor, {});
