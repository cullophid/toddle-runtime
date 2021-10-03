import { ComponentContext, createMutation, createQuery } from "../runtime";

window.toddle.actions.addressBarLoaded = (
  data: unknown,
  ctx: ComponentContext
) => {
  document.addEventListener("keydown", (event) => {
    const data = ctx.dataSignal.get();
    switch (event.key) {
      case "p": {
        if (event.metaKey) {
          ctx.dataSignal.set({
            ...data,
            Variables: {
              ...data.Variables,
              isOpen: !data.Variables.isOpen,
            },
          });
        }
      }
    }
  });
};
