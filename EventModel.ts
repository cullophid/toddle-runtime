import { Formula } from "./formula/formula";
import { LinkDestination } from "./NodeModel";

export type NodeEventModel = {
  type: "NodeEvent";
  trigger: string;
  stopPropagation: boolean;
  preventDefault: boolean;
  actions: ActionModel[];
};

export type MutationFailedEventModel = {
  type: "MutationEvent";
  trigger: "Failed";
  actions: ActionModel[];
};

export type MutationCompletedEventModel = {
  type: "MutationEvent";
  trigger: "Completed" | "Failed";
  actions: ActionModel[];
};
export type MutationEventModel =
  | MutationFailedEventModel
  | MutationCompletedEventModel;

export type ComponentEventModel = {
  type: "ComponentEvent";
  trigger: string;
  actions: ActionModel[];
};

export type EventModel =
  | NodeEventModel
  | MutationEventModel
  | ComponentEventModel;

export type UpdateVariableAction = {
  type: "Update Variable";
  variableName: string;
  condition?: Formula;
  value: Formula | string | number | boolean;
};

export type TriggerMutationAction = {
  type: "Trigger Mutation";
  condition?: Formula;
  mutationName: string;
  variables: Record<string, string | number | boolean | Formula>;
  onCompleted: MutationCompletedEventModel;
  onFailed: MutationFailedEventModel;
};

export type TriggerEventAction = {
  type: "Trigger Event";
  condition?: Formula;
  event: string;
  data?: string | number | boolean | Formula;
};

export type DebugAction = {
  type: "Debug";
  condition?: Formula;
  data?: string | number | boolean | Formula;
};

export type SaveLocalStorageAction = {
  type: "Save to local storage";
  condition?: Formula;
  key: string;
  value: any;
};
export type LogoutAction = {
  type: "Logout";
  condition?: Formula;
};

export type NavigationAction = {
  type: "Navigation";
  to: LinkDestination;
  replace: boolean;
  condition?: Formula;
};

export type ActionModel =
  | UpdateVariableAction
  | TriggerMutationAction
  | SaveLocalStorageAction
  | LogoutAction
  | NavigationAction
  | TriggerEventAction
  | DebugAction;
