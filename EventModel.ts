import { Formula } from "./formula/formula";
import { LinkDestination } from "./NodeModel";

export type NodeEventModel = {
  type: "NodeEvent";
  trigger: string;
  stopPropagation: boolean;
  preventDefault: boolean;
  actions: ActionModel[];
};

export type QueryFailedEventModel = {
  type: "QueryEvent";
  trigger: "Failed";
  actions: ActionModel[];
};

export type QueryCompletedEventModel = {
  type: "QueryEvent";
  trigger: "Completed";
  actions: ActionModel[];
};
export type QueryEventModel = QueryFailedEventModel | QueryCompletedEventModel;

export type ComponentLoadedEventModel = {
  type: "ComponentEvent";
  trigger: "ComponentLoaded";
  actions: ActionModel[];
};

export type ComponentEventModel = {
  type: "ComponentEvent";
  trigger: string;
  actions: ActionModel[];
};

export type EventModel =
  | NodeEventModel
  | QueryEventModel
  | ComponentEventModel
  | ComponentLoadedEventModel;

export type UpdateVariableAction = {
  type: "Update Variable";
  variableName: string;
  condition?: Formula;
  value: Formula | string | number | boolean;
};

export type UpdateQueryAction = {
  type: "Update Query";
  paramName: string;
  condition?: Formula;
  value: Formula | string | number | boolean;
};

export type TriggerMutationAction = {
  type: "Trigger Mutation";
  condition?: Formula;
  mutationName: string;
  variables: Record<string, string | number | boolean | Formula>;
  onCompleted: QueryCompletedEventModel;
  onFailed: QueryFailedEventModel;
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
  label?: string;
  data?: string | number | boolean | Formula;
};

export type CustomAction = {
  type: "Custom";
  condition?: Formula;
  name: string;
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
  | UpdateQueryAction
  | TriggerMutationAction
  | SaveLocalStorageAction
  | LogoutAction
  | NavigationAction
  | TriggerEventAction
  | CustomAction
  | DebugAction;
