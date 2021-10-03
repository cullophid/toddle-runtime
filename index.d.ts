declare global {
  interface Window {
    TODDLE_FUNCTIONS: Record<string, Function>;
    toddle: {
      formulas: Record<string, (formula:FunctionOperation, data:NodeData)>;
      actions: Record<string, (data: unknown, ctx: ComponentContext) => void>;
      components: ComponentModel[];
      project?: Project;
      data: Record<string, unknown>;
    };
  }
}
