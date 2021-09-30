import { NodeModel } from "./NodeModel";
import { Formula } from "./formula/formula";
import {
  ComponentEventModel,
  ComponentLoadedEventModel,
  QueryCompletedEventModel,
  QueryFailedEventModel,
} from "./EventModel";

export type Api = {
  id: string;
  name: string;
  url: string;
  headers: Record<string, Formula | string>;
  auth: {};
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  apis: Api[];
};
export type ComponentProp = {
  name: string;
  initialValue: unknown;
};
export type ComponentVariable = {
  name: string;
  initialValue: string | number | boolean | Formula;
};
export type ComponentFunction = {
  id: string;
  name: string;
  value: Formula;
};

export type ComponentQuery = {
  id: string;
  name: string;
  type: "mutation" | "query";
  condition?: Formula;
  documentNode: unknown;
  _api: string;
  variables: Record<
    string,
    {
      name: string;
      value: string | number | boolean | Formula;
    }
  >;
  throttle?: number | null;
  debounce?: number | null;
  onCompleted: QueryCompletedEventModel | null;
  onFailed: QueryFailedEventModel | null;
};
export type ComponentModel = {
  id: string;
  name: string;
  _project: string;
  _featureFlag: string | null;
  root: NodeModel;
  variables: ComponentVariable[];
  functions: ComponentFunction[];
  events: ComponentEventModel[];
  props: ComponentProp[];
  queries: ComponentQuery[];
  onLoad?: ComponentLoadedEventModel;
};

export type ComponentData = {
  Variables: Record<string, unknown>;
  Props: Record<string, unknown>;
  Queries?: Record<
    string,
    {
      data: unknown;
      isLoading: boolean;
      error: Error[] | null;
    }
  >;
  Mutations?: Record<
    string,
    {
      data: unknown;
      isLoading: boolean;
      error: Error[] | null;
    }
  >;
  Auth?: Record<string, unknown>;
  Event?: unknown;
  Functions?: Record<string, Formula>;
};

export type NodeData = ComponentData & {
  ListItem?: unknown;
};
