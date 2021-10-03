import "./init";
import "./editorLoaded";

import "./GET_INITIAL_COMPONENT_DATA";
import "./GET_NODE";
import "./UPDATE_NODE";
import "./GET_NODE_DATA";
import "./APPLY_FORMULA";

import { ElementEvents } from "../components/element-events";
import { StyleEditor } from "../components/style-editor";
import { PreviewCanvas } from "../components/preview-canvas";
import { DesignCanvas } from "../components/design-canvas";
import { FormulaEditor } from "../components/formula-editor";
import { ElementCatalog } from "../components/element-catalog/element-catalog";

customElements.define("element-events", ElementEvents, {});
customElements.define("element-catalog", ElementCatalog, {});
customElements.define("style-editor", StyleEditor, {});
customElements.define("design-canvas", DesignCanvas, {});
customElements.define("preview-canvas", PreviewCanvas, {});
customElements.define("formula-editor", FormulaEditor, {});
