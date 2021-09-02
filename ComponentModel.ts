import { NodeModel } from "./NodeModel";
import { v4 as uuid } from "uuid";
import { Component_Insert_Input, ApiQuery_Insert_Input } from "./types";
import { Formula } from "./formula/formula";
import {
  ComponentEventModel,
  QueryCompletedEventModel,
  QueryFailedEventModel,
} from "./EventModel";
import { Signal } from "signal";

export type ComponentProp = {
  id: string;
  name: string;
  initialValue: string | number | boolean;
};
export type ComponentVariable = {
  id: string;
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
  documentNode: unknown;
  api: {
    id: string;
    headers: Record<string, Formula | string>;
    auth: {};
    name: string;
    url: string;
    _project: string;
  };
  variables: Record<
    string,
    {
      name: string;
      value: string | number | boolean | Formula;
    }
  >;
  onCompleted?: QueryCompletedEventModel;
  onFailed?: QueryFailedEventModel;
};
export type ComponentModel = {
  id: string;
  name: string;
  _project: string;
  nodes: Record<string, NodeModel>;
  variables: ComponentVariable[];
  functions: ComponentFunction[];
  events: ComponentEventModel[];
  props: ComponentProp[];
  queries: ComponentQuery[];
};

export const createComponent = (): Omit<Component_Insert_Input, "queries"> & {
  queries: ApiQuery_Insert_Input[];
} => ({
  id: uuid(),
  queries: [],
  props: [],
  initialState: [],
  root: {},
});

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
      __trigger: Function;
    }
  >;
  Auth?: Record<string, unknown>;
  Event?: unknown;
  Functions?: ProxyHandler<Record<string, unknown>>;
};

export type NodeData = ComponentData & {
  ListItem?: unknown;
};
