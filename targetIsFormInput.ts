export const targetIsFormInput = (target: EventTarget | null) => {
  const { nodeName } = (target as any) ?? {};
  if (nodeName) {
    return ["INPUT", "TEXTAREA"].includes(nodeName);
  }
  return false;
};
