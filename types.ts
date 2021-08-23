export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: any;
  timestamptz: any;
  jsonb: any;
};

export type Api = {
  __typename?: "Api";
  _project: Scalars["uuid"];
  createdAt: Scalars["timestamptz"];
  headers: Scalars["jsonb"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  project: Project;
  updatedAt: Scalars["timestamptz"];
  url: Scalars["String"];
};

export type ApiHeadersArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type Api_Aggregate = {
  __typename?: "Api_aggregate";
  aggregate?: Maybe<Api_Aggregate_Fields>;
  nodes: Array<Api>;
};

export type Api_Aggregate_Fields = {
  __typename?: "Api_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Api_Max_Fields>;
  min?: Maybe<Api_Min_Fields>;
};

export type Api_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Api_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Api_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Api_Max_Order_By>;
  min?: Maybe<Api_Min_Order_By>;
};

export type Api_Append_Input = {
  headers?: Maybe<Scalars["jsonb"]>;
};

export type Api_Arr_Rel_Insert_Input = {
  data: Array<Api_Insert_Input>;
  on_conflict?: Maybe<Api_On_Conflict>;
};

export type Api_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Api_Bool_Exp>>>;
  _not?: Maybe<Api_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Api_Bool_Exp>>>;
  _project?: Maybe<Uuid_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  headers?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  url?: Maybe<String_Comparison_Exp>;
};

export enum Api_Constraint {
  ApisProjectNameKey = "apis__project_name_key",
  ApisPkey = "apis_pkey",
}

export type Api_Delete_At_Path_Input = {
  headers?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Api_Delete_Elem_Input = {
  headers?: Maybe<Scalars["Int"]>;
};

export type Api_Delete_Key_Input = {
  headers?: Maybe<Scalars["String"]>;
};

export type Api_Insert_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  headers?: Maybe<Scalars["jsonb"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  url?: Maybe<Scalars["String"]>;
};

export type Api_Max_Fields = {
  __typename?: "Api_max_fields";
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  url?: Maybe<Scalars["String"]>;
};

export type Api_Max_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

export type Api_Min_Fields = {
  __typename?: "Api_min_fields";
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  url?: Maybe<Scalars["String"]>;
};

export type Api_Min_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

export type Api_Mutation_Response = {
  __typename?: "Api_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Api>;
};

export type Api_Obj_Rel_Insert_Input = {
  data: Api_Insert_Input;
  on_conflict?: Maybe<Api_On_Conflict>;
};

export type Api_On_Conflict = {
  constraint: Api_Constraint;
  update_columns: Array<Api_Update_Column>;
  where?: Maybe<Api_Bool_Exp>;
};

export type Api_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  headers?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  updatedAt?: Maybe<Order_By>;
  url?: Maybe<Order_By>;
};

export type Api_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export type Api_Prepend_Input = {
  headers?: Maybe<Scalars["jsonb"]>;
};

export enum Api_Select_Column {
  Project = "_project",
  CreatedAt = "createdAt",
  Headers = "headers",
  Id = "id",
  Name = "name",
  UpdatedAt = "updatedAt",
  Url = "url",
}

export type Api_Set_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  headers?: Maybe<Scalars["jsonb"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  url?: Maybe<Scalars["String"]>;
};

export enum Api_Update_Column {
  Project = "_project",
  CreatedAt = "createdAt",
  Headers = "headers",
  Id = "id",
  Name = "name",
  UpdatedAt = "updatedAt",
  Url = "url",
}

export type ApiQuery = {
  __typename?: "ApiQuery";
  _api: Scalars["uuid"];
  _component: Scalars["uuid"];
  api: Api;
  component: Component;
  createdAt: Scalars["timestamptz"];
  documentNode: Scalars["jsonb"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  type: QeuryType_Enum;
  updatedAt: Scalars["timestamptz"];
  variables: Scalars["jsonb"];
};

export type ApiQueryDocumentNodeArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type ApiQueryVariablesArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type ApiQuery_Aggregate = {
  __typename?: "ApiQuery_aggregate";
  aggregate?: Maybe<ApiQuery_Aggregate_Fields>;
  nodes: Array<ApiQuery>;
};

export type ApiQuery_Aggregate_Fields = {
  __typename?: "ApiQuery_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<ApiQuery_Max_Fields>;
  min?: Maybe<ApiQuery_Min_Fields>;
};

export type ApiQuery_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<ApiQuery_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type ApiQuery_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<ApiQuery_Max_Order_By>;
  min?: Maybe<ApiQuery_Min_Order_By>;
};

export type ApiQuery_Append_Input = {
  documentNode?: Maybe<Scalars["jsonb"]>;
  variables?: Maybe<Scalars["jsonb"]>;
};

export type ApiQuery_Arr_Rel_Insert_Input = {
  data: Array<ApiQuery_Insert_Input>;
  on_conflict?: Maybe<ApiQuery_On_Conflict>;
};

export type ApiQuery_Bool_Exp = {
  _and?: Maybe<Array<Maybe<ApiQuery_Bool_Exp>>>;
  _api?: Maybe<Uuid_Comparison_Exp>;
  _component?: Maybe<Uuid_Comparison_Exp>;
  _not?: Maybe<ApiQuery_Bool_Exp>;
  _or?: Maybe<Array<Maybe<ApiQuery_Bool_Exp>>>;
  api?: Maybe<Api_Bool_Exp>;
  component?: Maybe<Component_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  documentNode?: Maybe<Jsonb_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  type?: Maybe<QeuryType_Enum_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  variables?: Maybe<Jsonb_Comparison_Exp>;
};

export enum ApiQuery_Constraint {
  QueriesComponentNameKey = "queries__component_name_key",
  QueriesPkey = "queries_pkey",
}

export type ApiQuery_Delete_At_Path_Input = {
  documentNode?: Maybe<Array<Maybe<Scalars["String"]>>>;
  variables?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type ApiQuery_Delete_Elem_Input = {
  documentNode?: Maybe<Scalars["Int"]>;
  variables?: Maybe<Scalars["Int"]>;
};

export type ApiQuery_Delete_Key_Input = {
  documentNode?: Maybe<Scalars["String"]>;
  variables?: Maybe<Scalars["String"]>;
};

export type ApiQuery_Insert_Input = {
  _api?: Maybe<Scalars["uuid"]>;
  _component?: Maybe<Scalars["uuid"]>;
  api?: Maybe<Api_Obj_Rel_Insert_Input>;
  component?: Maybe<Component_Obj_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  documentNode?: Maybe<Scalars["jsonb"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<QeuryType_Enum>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  variables?: Maybe<Scalars["jsonb"]>;
};

export type ApiQuery_Max_Fields = {
  __typename?: "ApiQuery_max_fields";
  _api?: Maybe<Scalars["uuid"]>;
  _component?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type ApiQuery_Max_Order_By = {
  _api?: Maybe<Order_By>;
  _component?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type ApiQuery_Min_Fields = {
  __typename?: "ApiQuery_min_fields";
  _api?: Maybe<Scalars["uuid"]>;
  _component?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type ApiQuery_Min_Order_By = {
  _api?: Maybe<Order_By>;
  _component?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type ApiQuery_Mutation_Response = {
  __typename?: "ApiQuery_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<ApiQuery>;
};

export type ApiQuery_Obj_Rel_Insert_Input = {
  data: ApiQuery_Insert_Input;
  on_conflict?: Maybe<ApiQuery_On_Conflict>;
};

export type ApiQuery_On_Conflict = {
  constraint: ApiQuery_Constraint;
  update_columns: Array<ApiQuery_Update_Column>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type ApiQuery_Order_By = {
  _api?: Maybe<Order_By>;
  _component?: Maybe<Order_By>;
  api?: Maybe<Api_Order_By>;
  component?: Maybe<Component_Order_By>;
  createdAt?: Maybe<Order_By>;
  documentNode?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  type?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
  variables?: Maybe<Order_By>;
};

export type ApiQuery_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export type ApiQuery_Prepend_Input = {
  documentNode?: Maybe<Scalars["jsonb"]>;
  variables?: Maybe<Scalars["jsonb"]>;
};

export enum ApiQuery_Select_Column {
  Api = "_api",
  Component = "_component",
  CreatedAt = "createdAt",
  DocumentNode = "documentNode",
  Id = "id",
  Name = "name",
  Type = "type",
  UpdatedAt = "updatedAt",
  Variables = "variables",
}

export type ApiQuery_Set_Input = {
  _api?: Maybe<Scalars["uuid"]>;
  _component?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  documentNode?: Maybe<Scalars["jsonb"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  type?: Maybe<QeuryType_Enum>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  variables?: Maybe<Scalars["jsonb"]>;
};

export enum ApiQuery_Update_Column {
  Api = "_api",
  Component = "_component",
  CreatedAt = "createdAt",
  DocumentNode = "documentNode",
  Id = "id",
  Name = "name",
  Type = "type",
  UpdatedAt = "updatedAt",
  Variables = "variables",
}

export type Auth = {
  __typename?: "Auth";
  _project: Scalars["uuid"];
  clientId: Scalars["String"];
  createdAt: Scalars["timestamptz"];
  domain: Scalars["String"];
  id: Scalars["uuid"];
  project: Project;
  updatedAt: Scalars["timestamptz"];
};

export type Auth_Aggregate = {
  __typename?: "Auth_aggregate";
  aggregate?: Maybe<Auth_Aggregate_Fields>;
  nodes: Array<Auth>;
};

export type Auth_Aggregate_Fields = {
  __typename?: "Auth_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Auth_Max_Fields>;
  min?: Maybe<Auth_Min_Fields>;
};

export type Auth_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Auth_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Auth_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Auth_Max_Order_By>;
  min?: Maybe<Auth_Min_Order_By>;
};

export type Auth_Arr_Rel_Insert_Input = {
  data: Array<Auth_Insert_Input>;
  on_conflict?: Maybe<Auth_On_Conflict>;
};

export type Auth_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Auth_Bool_Exp>>>;
  _not?: Maybe<Auth_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Auth_Bool_Exp>>>;
  _project?: Maybe<Uuid_Comparison_Exp>;
  clientId?: Maybe<String_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  domain?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Auth_Constraint {
  AuthProjectKey = "Auth__project_key",
  AuthPkey = "Auth_pkey",
}

export type Auth_Insert_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  clientId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  domain?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Auth_Max_Fields = {
  __typename?: "Auth_max_fields";
  _project?: Maybe<Scalars["uuid"]>;
  clientId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  domain?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Auth_Max_Order_By = {
  _project?: Maybe<Order_By>;
  clientId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  domain?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Auth_Min_Fields = {
  __typename?: "Auth_min_fields";
  _project?: Maybe<Scalars["uuid"]>;
  clientId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  domain?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Auth_Min_Order_By = {
  _project?: Maybe<Order_By>;
  clientId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  domain?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Auth_Mutation_Response = {
  __typename?: "Auth_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Auth>;
};

export type Auth_Obj_Rel_Insert_Input = {
  data: Auth_Insert_Input;
  on_conflict?: Maybe<Auth_On_Conflict>;
};

export type Auth_On_Conflict = {
  constraint: Auth_Constraint;
  update_columns: Array<Auth_Update_Column>;
  where?: Maybe<Auth_Bool_Exp>;
};

export type Auth_Order_By = {
  _project?: Maybe<Order_By>;
  clientId?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  domain?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Auth_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum Auth_Select_Column {
  Project = "_project",
  ClientId = "clientId",
  CreatedAt = "createdAt",
  Domain = "domain",
  Id = "id",
  UpdatedAt = "updatedAt",
}

export type Auth_Set_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  clientId?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  domain?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Auth_Update_Column {
  Project = "_project",
  ClientId = "clientId",
  CreatedAt = "createdAt",
  Domain = "domain",
  Id = "id",
  UpdatedAt = "updatedAt",
}

export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars["Boolean"]>;
  _gt?: Maybe<Scalars["Boolean"]>;
  _gte?: Maybe<Scalars["Boolean"]>;
  _in?: Maybe<Array<Scalars["Boolean"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["Boolean"]>;
  _lte?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<Scalars["Boolean"]>;
  _nin?: Maybe<Array<Scalars["Boolean"]>>;
};

export type Component = {
  __typename?: "Component";
  _project: Scalars["uuid"];
  createdAt: Scalars["timestamptz"];
  id: Scalars["uuid"];
  initialState: Scalars["jsonb"];
  name: Scalars["String"];
  page?: Maybe<Page>;
  project: Project;
  props: Scalars["jsonb"];
  queries: Array<ApiQuery>;
  queries_aggregate: ApiQuery_Aggregate;
  root: Scalars["jsonb"];
  updatedAt: Scalars["timestamptz"];
};

export type ComponentInitialStateArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type ComponentPropsArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type ComponentQueriesArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type ComponentQueries_AggregateArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type ComponentRootArgs = {
  path?: Maybe<Scalars["String"]>;
};

export type Component_Aggregate = {
  __typename?: "Component_aggregate";
  aggregate?: Maybe<Component_Aggregate_Fields>;
  nodes: Array<Component>;
};

export type Component_Aggregate_Fields = {
  __typename?: "Component_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Component_Max_Fields>;
  min?: Maybe<Component_Min_Fields>;
};

export type Component_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Component_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Component_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Component_Max_Order_By>;
  min?: Maybe<Component_Min_Order_By>;
};

export type Component_Append_Input = {
  initialState?: Maybe<Scalars["jsonb"]>;
  props?: Maybe<Scalars["jsonb"]>;
  root?: Maybe<Scalars["jsonb"]>;
};

export type Component_Arr_Rel_Insert_Input = {
  data: Array<Component_Insert_Input>;
  on_conflict?: Maybe<Component_On_Conflict>;
};

export type Component_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Component_Bool_Exp>>>;
  _not?: Maybe<Component_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Component_Bool_Exp>>>;
  _project?: Maybe<Uuid_Comparison_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  initialState?: Maybe<Jsonb_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  page?: Maybe<Page_Bool_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  props?: Maybe<Jsonb_Comparison_Exp>;
  queries?: Maybe<ApiQuery_Bool_Exp>;
  root?: Maybe<Jsonb_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Component_Constraint {
  ComponentsPkey = "components_pkey",
}

export type Component_Delete_At_Path_Input = {
  initialState?: Maybe<Array<Maybe<Scalars["String"]>>>;
  props?: Maybe<Array<Maybe<Scalars["String"]>>>;
  root?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Component_Delete_Elem_Input = {
  initialState?: Maybe<Scalars["Int"]>;
  props?: Maybe<Scalars["Int"]>;
  root?: Maybe<Scalars["Int"]>;
};

export type Component_Delete_Key_Input = {
  initialState?: Maybe<Scalars["String"]>;
  props?: Maybe<Scalars["String"]>;
  root?: Maybe<Scalars["String"]>;
};

export type Component_Insert_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  initialState?: Maybe<Scalars["jsonb"]>;
  name?: Maybe<Scalars["String"]>;
  page?: Maybe<Page_Obj_Rel_Insert_Input>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  props?: Maybe<Scalars["jsonb"]>;
  queries?: Maybe<ApiQuery_Arr_Rel_Insert_Input>;
  root?: Maybe<Scalars["jsonb"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Component_Max_Fields = {
  __typename?: "Component_max_fields";
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Component_Max_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Component_Min_Fields = {
  __typename?: "Component_min_fields";
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Component_Min_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Component_Mutation_Response = {
  __typename?: "Component_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Component>;
};

export type Component_Obj_Rel_Insert_Input = {
  data: Component_Insert_Input;
  on_conflict?: Maybe<Component_On_Conflict>;
};

export type Component_On_Conflict = {
  constraint: Component_Constraint;
  update_columns: Array<Component_Update_Column>;
  where?: Maybe<Component_Bool_Exp>;
};

export type Component_Order_By = {
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  initialState?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  page?: Maybe<Page_Order_By>;
  project?: Maybe<Project_Order_By>;
  props?: Maybe<Order_By>;
  queries_aggregate?: Maybe<ApiQuery_Aggregate_Order_By>;
  root?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Component_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export type Component_Prepend_Input = {
  initialState?: Maybe<Scalars["jsonb"]>;
  props?: Maybe<Scalars["jsonb"]>;
  root?: Maybe<Scalars["jsonb"]>;
};

export enum Component_Select_Column {
  Project = "_project",
  CreatedAt = "createdAt",
  Id = "id",
  InitialState = "initialState",
  Name = "name",
  Props = "props",
  Root = "root",
  UpdatedAt = "updatedAt",
}

export type Component_Set_Input = {
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  initialState?: Maybe<Scalars["jsonb"]>;
  name?: Maybe<Scalars["String"]>;
  props?: Maybe<Scalars["jsonb"]>;
  root?: Maybe<Scalars["jsonb"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Component_Update_Column {
  Project = "_project",
  CreatedAt = "createdAt",
  Id = "id",
  InitialState = "initialState",
  Name = "name",
  Props = "props",
  Root = "root",
  UpdatedAt = "updatedAt",
}

export type Jsonb_Comparison_Exp = {
  _contained_in?: Maybe<Scalars["jsonb"]>;
  _contains?: Maybe<Scalars["jsonb"]>;
  _eq?: Maybe<Scalars["jsonb"]>;
  _gt?: Maybe<Scalars["jsonb"]>;
  _gte?: Maybe<Scalars["jsonb"]>;
  _has_key?: Maybe<Scalars["String"]>;
  _has_keys_all?: Maybe<Array<Scalars["String"]>>;
  _has_keys_any?: Maybe<Array<Scalars["String"]>>;
  _in?: Maybe<Array<Scalars["jsonb"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["jsonb"]>;
  _lte?: Maybe<Scalars["jsonb"]>;
  _neq?: Maybe<Scalars["jsonb"]>;
  _nin?: Maybe<Array<Scalars["jsonb"]>>;
};

export type Mutation_Root = {
  __typename?: "mutation_root";
  deleteApi?: Maybe<Api_Mutation_Response>;
  deleteApiQuery?: Maybe<ApiQuery_Mutation_Response>;
  deleteAuth?: Maybe<Auth_Mutation_Response>;
  deleteComponent?: Maybe<Component_Mutation_Response>;
  deleteOrganization?: Maybe<Organization_Mutation_Response>;
  deleteOrganizationUser?: Maybe<OrganizationUser>;
  deleteOrganizationUsers?: Maybe<OrganizationUser_Mutation_Response>;
  deletePage?: Maybe<Page_Mutation_Response>;
  deleteProject?: Maybe<Project_Mutation_Response>;
  deleteUsers?: Maybe<Users_Mutation_Response>;
  delete_ApiQuery_by_pk?: Maybe<ApiQuery>;
  delete_Api_by_pk?: Maybe<Api>;
  delete_Auth_by_pk?: Maybe<Auth>;
  delete_Component_by_pk?: Maybe<Component>;
  delete_Organization_by_pk?: Maybe<Organization>;
  delete_Page_by_pk?: Maybe<Page>;
  delete_Project_by_pk?: Maybe<Project>;
  delete_QeuryType?: Maybe<QeuryType_Mutation_Response>;
  delete_QeuryType_by_pk?: Maybe<QeuryType>;
  delete_Users_by_pk?: Maybe<Users>;
  insertApi?: Maybe<Api_Mutation_Response>;
  insertApiQuery?: Maybe<ApiQuery_Mutation_Response>;
  insertAuth?: Maybe<Auth_Mutation_Response>;
  insertComponent?: Maybe<Component_Mutation_Response>;
  insertOrganization?: Maybe<Organization_Mutation_Response>;
  insertOrganizationUser?: Maybe<OrganizationUser>;
  insertOrganizationUsers?: Maybe<OrganizationUser_Mutation_Response>;
  insertPage?: Maybe<Page_Mutation_Response>;
  insertProject?: Maybe<Project_Mutation_Response>;
  insertUsers?: Maybe<Users_Mutation_Response>;
  insert_ApiQuery_one?: Maybe<ApiQuery>;
  insert_Api_one?: Maybe<Api>;
  insert_Auth_one?: Maybe<Auth>;
  insert_Component_one?: Maybe<Component>;
  insert_Organization_one?: Maybe<Organization>;
  insert_Page_one?: Maybe<Page>;
  insert_Project_one?: Maybe<Project>;
  insert_QeuryType?: Maybe<QeuryType_Mutation_Response>;
  insert_QeuryType_one?: Maybe<QeuryType>;
  insert_Users_one?: Maybe<Users>;
  updateApi?: Maybe<Api_Mutation_Response>;
  updateApiQuery?: Maybe<ApiQuery_Mutation_Response>;
  updateAuth?: Maybe<Auth_Mutation_Response>;
  updateComponent?: Maybe<Component_Mutation_Response>;
  updateOrganization?: Maybe<Organization_Mutation_Response>;
  updateOrganizationUser?: Maybe<OrganizationUser>;
  updateOrganizationUsers?: Maybe<OrganizationUser_Mutation_Response>;
  updatePage?: Maybe<Page_Mutation_Response>;
  updateProject?: Maybe<Project_Mutation_Response>;
  updateUsers?: Maybe<Users_Mutation_Response>;
  update_ApiQuery_by_pk?: Maybe<ApiQuery>;
  update_Api_by_pk?: Maybe<Api>;
  update_Auth_by_pk?: Maybe<Auth>;
  update_Component_by_pk?: Maybe<Component>;
  update_Organization_by_pk?: Maybe<Organization>;
  update_Page_by_pk?: Maybe<Page>;
  update_Project_by_pk?: Maybe<Project>;
  update_QeuryType?: Maybe<QeuryType_Mutation_Response>;
  update_QeuryType_by_pk?: Maybe<QeuryType>;
  update_Users_by_pk?: Maybe<Users>;
};

export type Mutation_RootDeleteApiArgs = {
  where: Api_Bool_Exp;
};

export type Mutation_RootDeleteApiQueryArgs = {
  where: ApiQuery_Bool_Exp;
};

export type Mutation_RootDeleteAuthArgs = {
  where: Auth_Bool_Exp;
};

export type Mutation_RootDeleteComponentArgs = {
  where: Component_Bool_Exp;
};

export type Mutation_RootDeleteOrganizationArgs = {
  where: Organization_Bool_Exp;
};

export type Mutation_RootDeleteOrganizationUserArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDeleteOrganizationUsersArgs = {
  where: OrganizationUser_Bool_Exp;
};

export type Mutation_RootDeletePageArgs = {
  where: Page_Bool_Exp;
};

export type Mutation_RootDeleteProjectArgs = {
  where: Project_Bool_Exp;
};

export type Mutation_RootDeleteUsersArgs = {
  where: Users_Bool_Exp;
};

export type Mutation_RootDelete_ApiQuery_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Api_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Auth_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Component_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Organization_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Page_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_Project_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootDelete_QeuryTypeArgs = {
  where: QeuryType_Bool_Exp;
};

export type Mutation_RootDelete_QeuryType_By_PkArgs = {
  value: Scalars["String"];
};

export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars["uuid"];
};

export type Mutation_RootInsertApiArgs = {
  objects: Array<Api_Insert_Input>;
  on_conflict?: Maybe<Api_On_Conflict>;
};

export type Mutation_RootInsertApiQueryArgs = {
  objects: Array<ApiQuery_Insert_Input>;
  on_conflict?: Maybe<ApiQuery_On_Conflict>;
};

export type Mutation_RootInsertAuthArgs = {
  objects: Array<Auth_Insert_Input>;
  on_conflict?: Maybe<Auth_On_Conflict>;
};

export type Mutation_RootInsertComponentArgs = {
  objects: Array<Component_Insert_Input>;
  on_conflict?: Maybe<Component_On_Conflict>;
};

export type Mutation_RootInsertOrganizationArgs = {
  objects: Array<Organization_Insert_Input>;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

export type Mutation_RootInsertOrganizationUserArgs = {
  object: OrganizationUser_Insert_Input;
  on_conflict?: Maybe<OrganizationUser_On_Conflict>;
};

export type Mutation_RootInsertOrganizationUsersArgs = {
  objects: Array<OrganizationUser_Insert_Input>;
  on_conflict?: Maybe<OrganizationUser_On_Conflict>;
};

export type Mutation_RootInsertPageArgs = {
  objects: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};

export type Mutation_RootInsertProjectArgs = {
  objects: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};

export type Mutation_RootInsertUsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Mutation_RootInsert_ApiQuery_OneArgs = {
  object: ApiQuery_Insert_Input;
  on_conflict?: Maybe<ApiQuery_On_Conflict>;
};

export type Mutation_RootInsert_Api_OneArgs = {
  object: Api_Insert_Input;
  on_conflict?: Maybe<Api_On_Conflict>;
};

export type Mutation_RootInsert_Auth_OneArgs = {
  object: Auth_Insert_Input;
  on_conflict?: Maybe<Auth_On_Conflict>;
};

export type Mutation_RootInsert_Component_OneArgs = {
  object: Component_Insert_Input;
  on_conflict?: Maybe<Component_On_Conflict>;
};

export type Mutation_RootInsert_Organization_OneArgs = {
  object: Organization_Insert_Input;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

export type Mutation_RootInsert_Page_OneArgs = {
  object: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};

export type Mutation_RootInsert_Project_OneArgs = {
  object: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};

export type Mutation_RootInsert_QeuryTypeArgs = {
  objects: Array<QeuryType_Insert_Input>;
  on_conflict?: Maybe<QeuryType_On_Conflict>;
};

export type Mutation_RootInsert_QeuryType_OneArgs = {
  object: QeuryType_Insert_Input;
  on_conflict?: Maybe<QeuryType_On_Conflict>;
};

export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Mutation_RootUpdateApiArgs = {
  _append?: Maybe<Api_Append_Input>;
  _delete_at_path?: Maybe<Api_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Api_Delete_Elem_Input>;
  _delete_key?: Maybe<Api_Delete_Key_Input>;
  _prepend?: Maybe<Api_Prepend_Input>;
  _set?: Maybe<Api_Set_Input>;
  where: Api_Bool_Exp;
};

export type Mutation_RootUpdateApiQueryArgs = {
  _append?: Maybe<ApiQuery_Append_Input>;
  _delete_at_path?: Maybe<ApiQuery_Delete_At_Path_Input>;
  _delete_elem?: Maybe<ApiQuery_Delete_Elem_Input>;
  _delete_key?: Maybe<ApiQuery_Delete_Key_Input>;
  _prepend?: Maybe<ApiQuery_Prepend_Input>;
  _set?: Maybe<ApiQuery_Set_Input>;
  where: ApiQuery_Bool_Exp;
};

export type Mutation_RootUpdateAuthArgs = {
  _set?: Maybe<Auth_Set_Input>;
  where: Auth_Bool_Exp;
};

export type Mutation_RootUpdateComponentArgs = {
  _append?: Maybe<Component_Append_Input>;
  _delete_at_path?: Maybe<Component_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Component_Delete_Elem_Input>;
  _delete_key?: Maybe<Component_Delete_Key_Input>;
  _prepend?: Maybe<Component_Prepend_Input>;
  _set?: Maybe<Component_Set_Input>;
  where: Component_Bool_Exp;
};

export type Mutation_RootUpdateOrganizationArgs = {
  _set?: Maybe<Organization_Set_Input>;
  where: Organization_Bool_Exp;
};

export type Mutation_RootUpdateOrganizationUserArgs = {
  _set?: Maybe<OrganizationUser_Set_Input>;
  pk_columns: OrganizationUser_Pk_Columns_Input;
};

export type Mutation_RootUpdateOrganizationUsersArgs = {
  _set?: Maybe<OrganizationUser_Set_Input>;
  where: OrganizationUser_Bool_Exp;
};

export type Mutation_RootUpdatePageArgs = {
  _set?: Maybe<Page_Set_Input>;
  where: Page_Bool_Exp;
};

export type Mutation_RootUpdateProjectArgs = {
  _set?: Maybe<Project_Set_Input>;
  where: Project_Bool_Exp;
};

export type Mutation_RootUpdateUsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

export type Mutation_RootUpdate_ApiQuery_By_PkArgs = {
  _append?: Maybe<ApiQuery_Append_Input>;
  _delete_at_path?: Maybe<ApiQuery_Delete_At_Path_Input>;
  _delete_elem?: Maybe<ApiQuery_Delete_Elem_Input>;
  _delete_key?: Maybe<ApiQuery_Delete_Key_Input>;
  _prepend?: Maybe<ApiQuery_Prepend_Input>;
  _set?: Maybe<ApiQuery_Set_Input>;
  pk_columns: ApiQuery_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Api_By_PkArgs = {
  _append?: Maybe<Api_Append_Input>;
  _delete_at_path?: Maybe<Api_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Api_Delete_Elem_Input>;
  _delete_key?: Maybe<Api_Delete_Key_Input>;
  _prepend?: Maybe<Api_Prepend_Input>;
  _set?: Maybe<Api_Set_Input>;
  pk_columns: Api_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Auth_By_PkArgs = {
  _set?: Maybe<Auth_Set_Input>;
  pk_columns: Auth_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Component_By_PkArgs = {
  _append?: Maybe<Component_Append_Input>;
  _delete_at_path?: Maybe<Component_Delete_At_Path_Input>;
  _delete_elem?: Maybe<Component_Delete_Elem_Input>;
  _delete_key?: Maybe<Component_Delete_Key_Input>;
  _prepend?: Maybe<Component_Prepend_Input>;
  _set?: Maybe<Component_Set_Input>;
  pk_columns: Component_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Organization_By_PkArgs = {
  _set?: Maybe<Organization_Set_Input>;
  pk_columns: Organization_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Page_By_PkArgs = {
  _set?: Maybe<Page_Set_Input>;
  pk_columns: Page_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Project_By_PkArgs = {
  _set?: Maybe<Project_Set_Input>;
  pk_columns: Project_Pk_Columns_Input;
};

export type Mutation_RootUpdate_QeuryTypeArgs = {
  _set?: Maybe<QeuryType_Set_Input>;
  where: QeuryType_Bool_Exp;
};

export type Mutation_RootUpdate_QeuryType_By_PkArgs = {
  _set?: Maybe<QeuryType_Set_Input>;
  pk_columns: QeuryType_Pk_Columns_Input;
};

export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: Maybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

export enum Order_By {
  Asc = "asc",
  AscNullsFirst = "asc_nulls_first",
  AscNullsLast = "asc_nulls_last",
  Desc = "desc",
  DescNullsFirst = "desc_nulls_first",
  DescNullsLast = "desc_nulls_last",
}

export type Organization = {
  __typename?: "Organization";
  createdAt: Scalars["timestamptz"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  projects: Array<Project>;
  projects_aggregate: Project_Aggregate;
  updatedAt: Scalars["timestamptz"];
  users: Array<OrganizationUser>;
  users_aggregate: OrganizationUser_Aggregate;
};

export type OrganizationProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type OrganizationProjects_AggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type OrganizationUsersArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type OrganizationUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Organization_Aggregate = {
  __typename?: "Organization_aggregate";
  aggregate?: Maybe<Organization_Aggregate_Fields>;
  nodes: Array<Organization>;
};

export type Organization_Aggregate_Fields = {
  __typename?: "Organization_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Organization_Max_Fields>;
  min?: Maybe<Organization_Min_Fields>;
};

export type Organization_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Organization_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Organization_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Organization_Max_Order_By>;
  min?: Maybe<Organization_Min_Order_By>;
};

export type Organization_Arr_Rel_Insert_Input = {
  data: Array<Organization_Insert_Input>;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

export type Organization_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Organization_Bool_Exp>>>;
  _not?: Maybe<Organization_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Organization_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  projects?: Maybe<Project_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
  users?: Maybe<OrganizationUser_Bool_Exp>;
};

export enum Organization_Constraint {
  OrganizationNameKey = "Organization_name_key",
  OrganizationPkey = "Organization_pkey",
}

export type Organization_Insert_Input = {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  projects?: Maybe<Project_Arr_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
  users?: Maybe<OrganizationUser_Arr_Rel_Insert_Input>;
};

export type Organization_Max_Fields = {
  __typename?: "Organization_max_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Organization_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Organization_Min_Fields = {
  __typename?: "Organization_min_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Organization_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Organization_Mutation_Response = {
  __typename?: "Organization_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Organization>;
};

export type Organization_Obj_Rel_Insert_Input = {
  data: Organization_Insert_Input;
  on_conflict?: Maybe<Organization_On_Conflict>;
};

export type Organization_On_Conflict = {
  constraint: Organization_Constraint;
  update_columns: Array<Organization_Update_Column>;
  where?: Maybe<Organization_Bool_Exp>;
};

export type Organization_Order_By = {
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  projects_aggregate?: Maybe<Project_Aggregate_Order_By>;
  updatedAt?: Maybe<Order_By>;
  users_aggregate?: Maybe<OrganizationUser_Aggregate_Order_By>;
};

export type Organization_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum Organization_Select_Column {
  CreatedAt = "createdAt",
  Id = "id",
  Name = "name",
  UpdatedAt = "updatedAt",
}

export type Organization_Set_Input = {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Organization_Update_Column {
  CreatedAt = "createdAt",
  Id = "id",
  Name = "name",
  UpdatedAt = "updatedAt",
}

export type OrganizationUser = {
  __typename?: "OrganizationUser";
  _organization: Scalars["uuid"];
  _user: Scalars["uuid"];
  id: Scalars["uuid"];
  organization: Organization;
  user: Users;
};

export type OrganizationUser_Aggregate = {
  __typename?: "OrganizationUser_aggregate";
  aggregate?: Maybe<OrganizationUser_Aggregate_Fields>;
  nodes: Array<OrganizationUser>;
};

export type OrganizationUser_Aggregate_Fields = {
  __typename?: "OrganizationUser_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<OrganizationUser_Max_Fields>;
  min?: Maybe<OrganizationUser_Min_Fields>;
};

export type OrganizationUser_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<OrganizationUser_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type OrganizationUser_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<OrganizationUser_Max_Order_By>;
  min?: Maybe<OrganizationUser_Min_Order_By>;
};

export type OrganizationUser_Arr_Rel_Insert_Input = {
  data: Array<OrganizationUser_Insert_Input>;
  on_conflict?: Maybe<OrganizationUser_On_Conflict>;
};

export type OrganizationUser_Bool_Exp = {
  _and?: Maybe<Array<Maybe<OrganizationUser_Bool_Exp>>>;
  _not?: Maybe<OrganizationUser_Bool_Exp>;
  _or?: Maybe<Array<Maybe<OrganizationUser_Bool_Exp>>>;
  _organization?: Maybe<Uuid_Comparison_Exp>;
  _user?: Maybe<Uuid_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  organization?: Maybe<Organization_Bool_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

export enum OrganizationUser_Constraint {
  UserOrganizationPkey = "UserOrganization_pkey",
}

export type OrganizationUser_Insert_Input = {
  _organization?: Maybe<Scalars["uuid"]>;
  _user?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
  organization?: Maybe<Organization_Obj_Rel_Insert_Input>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
};

export type OrganizationUser_Max_Fields = {
  __typename?: "OrganizationUser_max_fields";
  _organization?: Maybe<Scalars["uuid"]>;
  _user?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
};

export type OrganizationUser_Max_Order_By = {
  _organization?: Maybe<Order_By>;
  _user?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

export type OrganizationUser_Min_Fields = {
  __typename?: "OrganizationUser_min_fields";
  _organization?: Maybe<Scalars["uuid"]>;
  _user?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
};

export type OrganizationUser_Min_Order_By = {
  _organization?: Maybe<Order_By>;
  _user?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
};

export type OrganizationUser_Mutation_Response = {
  __typename?: "OrganizationUser_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<OrganizationUser>;
};

export type OrganizationUser_Obj_Rel_Insert_Input = {
  data: OrganizationUser_Insert_Input;
  on_conflict?: Maybe<OrganizationUser_On_Conflict>;
};

export type OrganizationUser_On_Conflict = {
  constraint: OrganizationUser_Constraint;
  update_columns: Array<OrganizationUser_Update_Column>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type OrganizationUser_Order_By = {
  _organization?: Maybe<Order_By>;
  _user?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  organization?: Maybe<Organization_Order_By>;
  user?: Maybe<Users_Order_By>;
};

export type OrganizationUser_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum OrganizationUser_Select_Column {
  Organization = "_organization",
  User = "_user",
  Id = "id",
}

export type OrganizationUser_Set_Input = {
  _organization?: Maybe<Scalars["uuid"]>;
  _user?: Maybe<Scalars["uuid"]>;
  id?: Maybe<Scalars["uuid"]>;
};

export enum OrganizationUser_Update_Column {
  Organization = "_organization",
  User = "_user",
  Id = "id",
}

export type Page = {
  __typename?: "Page";
  _component: Scalars["uuid"];
  _project: Scalars["uuid"];
  component: Component;
  createdAt: Scalars["timestamptz"];
  id: Scalars["uuid"];
  path: Scalars["String"];
  project: Project;
  requireAuth: Scalars["Boolean"];
  updatedAt: Scalars["timestamptz"];
};

export type Page_Aggregate = {
  __typename?: "Page_aggregate";
  aggregate?: Maybe<Page_Aggregate_Fields>;
  nodes: Array<Page>;
};

export type Page_Aggregate_Fields = {
  __typename?: "Page_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Page_Max_Fields>;
  min?: Maybe<Page_Min_Fields>;
};

export type Page_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Page_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Page_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Page_Max_Order_By>;
  min?: Maybe<Page_Min_Order_By>;
};

export type Page_Arr_Rel_Insert_Input = {
  data: Array<Page_Insert_Input>;
  on_conflict?: Maybe<Page_On_Conflict>;
};

export type Page_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  _component?: Maybe<Uuid_Comparison_Exp>;
  _not?: Maybe<Page_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Page_Bool_Exp>>>;
  _project?: Maybe<Uuid_Comparison_Exp>;
  component?: Maybe<Component_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  path?: Maybe<String_Comparison_Exp>;
  project?: Maybe<Project_Bool_Exp>;
  requireAuth?: Maybe<Boolean_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Page_Constraint {
  PagesComponentKey = "pages_component_key",
  PagesIdKey = "pages_id_key",
  PagesPathProjectKey = "pages_path__project_key",
  PagesPkey = "pages_pkey",
}

export type Page_Insert_Input = {
  _component?: Maybe<Scalars["uuid"]>;
  _project?: Maybe<Scalars["uuid"]>;
  component?: Maybe<Component_Obj_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  project?: Maybe<Project_Obj_Rel_Insert_Input>;
  requireAuth?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Page_Max_Fields = {
  __typename?: "Page_max_fields";
  _component?: Maybe<Scalars["uuid"]>;
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Page_Max_Order_By = {
  _component?: Maybe<Order_By>;
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  path?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Page_Min_Fields = {
  __typename?: "Page_min_fields";
  _component?: Maybe<Scalars["uuid"]>;
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Page_Min_Order_By = {
  _component?: Maybe<Order_By>;
  _project?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  path?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Page_Mutation_Response = {
  __typename?: "Page_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Page>;
};

export type Page_Obj_Rel_Insert_Input = {
  data: Page_Insert_Input;
  on_conflict?: Maybe<Page_On_Conflict>;
};

export type Page_On_Conflict = {
  constraint: Page_Constraint;
  update_columns: Array<Page_Update_Column>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Page_Order_By = {
  _component?: Maybe<Order_By>;
  _project?: Maybe<Order_By>;
  component?: Maybe<Component_Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  path?: Maybe<Order_By>;
  project?: Maybe<Project_Order_By>;
  requireAuth?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Page_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum Page_Select_Column {
  Component = "_component",
  Project = "_project",
  CreatedAt = "createdAt",
  Id = "id",
  Path = "path",
  RequireAuth = "requireAuth",
  UpdatedAt = "updatedAt",
}

export type Page_Set_Input = {
  _component?: Maybe<Scalars["uuid"]>;
  _project?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  path?: Maybe<Scalars["String"]>;
  requireAuth?: Maybe<Scalars["Boolean"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Page_Update_Column {
  Component = "_component",
  Project = "_project",
  CreatedAt = "createdAt",
  Id = "id",
  Path = "path",
  RequireAuth = "requireAuth",
  UpdatedAt = "updatedAt",
}

export type Project = {
  __typename?: "Project";
  _organization: Scalars["uuid"];
  apis: Array<Api>;
  apis_aggregate: Api_Aggregate;
  auth?: Maybe<Auth>;
  components: Array<Component>;
  components_aggregate: Component_Aggregate;
  createdAt: Scalars["timestamptz"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  organization: Organization;
  owner: Scalars["String"];
  pages: Array<Page>;
  pages_aggregate: Page_Aggregate;
  slug: Scalars["String"];
  updatedAt: Scalars["timestamptz"];
};

export type ProjectApisArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type ProjectApis_AggregateArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type ProjectComponentsArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type ProjectComponents_AggregateArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type ProjectPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type ProjectPages_AggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Project_Aggregate = {
  __typename?: "Project_aggregate";
  aggregate?: Maybe<Project_Aggregate_Fields>;
  nodes: Array<Project>;
};

export type Project_Aggregate_Fields = {
  __typename?: "Project_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Project_Max_Fields>;
  min?: Maybe<Project_Min_Fields>;
};

export type Project_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Project_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Project_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Project_Max_Order_By>;
  min?: Maybe<Project_Min_Order_By>;
};

export type Project_Arr_Rel_Insert_Input = {
  data: Array<Project_Insert_Input>;
  on_conflict?: Maybe<Project_On_Conflict>;
};

export type Project_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  _not?: Maybe<Project_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Project_Bool_Exp>>>;
  _organization?: Maybe<Uuid_Comparison_Exp>;
  apis?: Maybe<Api_Bool_Exp>;
  auth?: Maybe<Auth_Bool_Exp>;
  components?: Maybe<Component_Bool_Exp>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  organization?: Maybe<Organization_Bool_Exp>;
  owner?: Maybe<String_Comparison_Exp>;
  pages?: Maybe<Page_Bool_Exp>;
  slug?: Maybe<String_Comparison_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Project_Constraint {
  ProjectNameOwnerKey = "Project_name_owner_key",
  ProjectSlugKey = "Project_slug_key",
  AppsPkey = "apps_pkey",
}

export type Project_Insert_Input = {
  _organization?: Maybe<Scalars["uuid"]>;
  apis?: Maybe<Api_Arr_Rel_Insert_Input>;
  auth?: Maybe<Auth_Obj_Rel_Insert_Input>;
  components?: Maybe<Component_Arr_Rel_Insert_Input>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  organization?: Maybe<Organization_Obj_Rel_Insert_Input>;
  owner?: Maybe<Scalars["String"]>;
  pages?: Maybe<Page_Arr_Rel_Insert_Input>;
  slug?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Project_Max_Fields = {
  __typename?: "Project_max_fields";
  _organization?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Project_Max_Order_By = {
  _organization?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Project_Min_Fields = {
  __typename?: "Project_min_fields";
  _organization?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Project_Min_Order_By = {
  _organization?: Maybe<Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner?: Maybe<Order_By>;
  slug?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Project_Mutation_Response = {
  __typename?: "Project_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Project>;
};

export type Project_Obj_Rel_Insert_Input = {
  data: Project_Insert_Input;
  on_conflict?: Maybe<Project_On_Conflict>;
};

export type Project_On_Conflict = {
  constraint: Project_Constraint;
  update_columns: Array<Project_Update_Column>;
  where?: Maybe<Project_Bool_Exp>;
};

export type Project_Order_By = {
  _organization?: Maybe<Order_By>;
  apis_aggregate?: Maybe<Api_Aggregate_Order_By>;
  auth?: Maybe<Auth_Order_By>;
  components_aggregate?: Maybe<Component_Aggregate_Order_By>;
  createdAt?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  organization?: Maybe<Organization_Order_By>;
  owner?: Maybe<Order_By>;
  pages_aggregate?: Maybe<Page_Aggregate_Order_By>;
  slug?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Project_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum Project_Select_Column {
  Organization = "_organization",
  CreatedAt = "createdAt",
  Id = "id",
  Name = "name",
  Owner = "owner",
  Slug = "slug",
  UpdatedAt = "updatedAt",
}

export type Project_Set_Input = {
  _organization?: Maybe<Scalars["uuid"]>;
  createdAt?: Maybe<Scalars["timestamptz"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  owner?: Maybe<Scalars["String"]>;
  slug?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Project_Update_Column {
  Organization = "_organization",
  CreatedAt = "createdAt",
  Id = "id",
  Name = "name",
  Owner = "owner",
  Slug = "slug",
  UpdatedAt = "updatedAt",
}

export type QeuryType = {
  __typename?: "QeuryType";
  comment: Scalars["String"];
  value: Scalars["String"];
};

export type QeuryType_Aggregate = {
  __typename?: "QeuryType_aggregate";
  aggregate?: Maybe<QeuryType_Aggregate_Fields>;
  nodes: Array<QeuryType>;
};

export type QeuryType_Aggregate_Fields = {
  __typename?: "QeuryType_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<QeuryType_Max_Fields>;
  min?: Maybe<QeuryType_Min_Fields>;
};

export type QeuryType_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<QeuryType_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type QeuryType_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<QeuryType_Max_Order_By>;
  min?: Maybe<QeuryType_Min_Order_By>;
};

export type QeuryType_Arr_Rel_Insert_Input = {
  data: Array<QeuryType_Insert_Input>;
  on_conflict?: Maybe<QeuryType_On_Conflict>;
};

export type QeuryType_Bool_Exp = {
  _and?: Maybe<Array<Maybe<QeuryType_Bool_Exp>>>;
  _not?: Maybe<QeuryType_Bool_Exp>;
  _or?: Maybe<Array<Maybe<QeuryType_Bool_Exp>>>;
  comment?: Maybe<String_Comparison_Exp>;
  value?: Maybe<String_Comparison_Exp>;
};

export enum QeuryType_Constraint {
  QeuryTypePkey = "QeuryType_pkey",
}

export enum QeuryType_Enum {
  Mutation = "mutation",
  Query = "query",
  Subscription = "subscription",
}

export type QeuryType_Enum_Comparison_Exp = {
  _eq?: Maybe<QeuryType_Enum>;
  _in?: Maybe<Array<QeuryType_Enum>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _neq?: Maybe<QeuryType_Enum>;
  _nin?: Maybe<Array<QeuryType_Enum>>;
};

export type QeuryType_Insert_Input = {
  comment?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type QeuryType_Max_Fields = {
  __typename?: "QeuryType_max_fields";
  comment?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type QeuryType_Max_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type QeuryType_Min_Fields = {
  __typename?: "QeuryType_min_fields";
  comment?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export type QeuryType_Min_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type QeuryType_Mutation_Response = {
  __typename?: "QeuryType_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<QeuryType>;
};

export type QeuryType_Obj_Rel_Insert_Input = {
  data: QeuryType_Insert_Input;
  on_conflict?: Maybe<QeuryType_On_Conflict>;
};

export type QeuryType_On_Conflict = {
  constraint: QeuryType_Constraint;
  update_columns: Array<QeuryType_Update_Column>;
  where?: Maybe<QeuryType_Bool_Exp>;
};

export type QeuryType_Order_By = {
  comment?: Maybe<Order_By>;
  value?: Maybe<Order_By>;
};

export type QeuryType_Pk_Columns_Input = {
  value: Scalars["String"];
};

export enum QeuryType_Select_Column {
  Comment = "comment",
  Value = "value",
}

export type QeuryType_Set_Input = {
  comment?: Maybe<Scalars["String"]>;
  value?: Maybe<Scalars["String"]>;
};

export enum QeuryType_Update_Column {
  Comment = "comment",
  Value = "value",
}

export type Query_Root = {
  __typename?: "query_root";
  QeuryType: Array<QeuryType>;
  QeuryType_aggregate: QeuryType_Aggregate;
  QeuryType_by_pk?: Maybe<QeuryType>;
  api?: Maybe<Api>;
  apiAggregate: Api_Aggregate;
  apiQueries: Array<ApiQuery>;
  apiQuery?: Maybe<ApiQuery>;
  apiQueryAggregate: ApiQuery_Aggregate;
  apis: Array<Api>;
  auth?: Maybe<Auth>;
  authAggregate: Auth_Aggregate;
  auths: Array<Auth>;
  component?: Maybe<Component>;
  componentAggregate: Component_Aggregate;
  components: Array<Component>;
  organization?: Maybe<Organization>;
  organizationAggregate: Organization_Aggregate;
  organizationUser?: Maybe<OrganizationUser>;
  organizationUserAggregate: OrganizationUser_Aggregate;
  organizationUsers: Array<OrganizationUser>;
  organizations: Array<Organization>;
  page?: Maybe<Page>;
  pageAggregate: Page_Aggregate;
  pages: Array<Page>;
  project?: Maybe<Project>;
  projectAggregate: Project_Aggregate;
  projects: Array<Project>;
  user?: Maybe<Users>;
  userAggregate: Users_Aggregate;
  users: Array<Users>;
};

export type Query_RootQeuryTypeArgs = {
  distinct_on?: Maybe<Array<QeuryType_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<QeuryType_Order_By>>;
  where?: Maybe<QeuryType_Bool_Exp>;
};

export type Query_RootQeuryType_AggregateArgs = {
  distinct_on?: Maybe<Array<QeuryType_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<QeuryType_Order_By>>;
  where?: Maybe<QeuryType_Bool_Exp>;
};

export type Query_RootQeuryType_By_PkArgs = {
  value: Scalars["String"];
};

export type Query_RootApiArgs = {
  id: Scalars["uuid"];
};

export type Query_RootApiAggregateArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type Query_RootApiQueriesArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type Query_RootApiQueryArgs = {
  id: Scalars["uuid"];
};

export type Query_RootApiQueryAggregateArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type Query_RootApisArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type Query_RootAuthArgs = {
  id: Scalars["uuid"];
};

export type Query_RootAuthAggregateArgs = {
  distinct_on?: Maybe<Array<Auth_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Auth_Order_By>>;
  where?: Maybe<Auth_Bool_Exp>;
};

export type Query_RootAuthsArgs = {
  distinct_on?: Maybe<Array<Auth_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Auth_Order_By>>;
  where?: Maybe<Auth_Bool_Exp>;
};

export type Query_RootComponentArgs = {
  id: Scalars["uuid"];
};

export type Query_RootComponentAggregateArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type Query_RootComponentsArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type Query_RootOrganizationArgs = {
  id: Scalars["uuid"];
};

export type Query_RootOrganizationAggregateArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};

export type Query_RootOrganizationUserArgs = {
  id: Scalars["uuid"];
};

export type Query_RootOrganizationUserAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Query_RootOrganizationUsersArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Query_RootOrganizationsArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};

export type Query_RootPageArgs = {
  id: Scalars["uuid"];
};

export type Query_RootPageAggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Query_RootPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Query_RootProjectArgs = {
  id: Scalars["uuid"];
};

export type Query_RootProjectAggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type Query_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type Query_RootUserArgs = {
  id: Scalars["uuid"];
};

export type Query_RootUserAggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars["String"]>;
  _gt?: Maybe<Scalars["String"]>;
  _gte?: Maybe<Scalars["String"]>;
  _ilike?: Maybe<Scalars["String"]>;
  _in?: Maybe<Array<Scalars["String"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _like?: Maybe<Scalars["String"]>;
  _lt?: Maybe<Scalars["String"]>;
  _lte?: Maybe<Scalars["String"]>;
  _neq?: Maybe<Scalars["String"]>;
  _nilike?: Maybe<Scalars["String"]>;
  _nin?: Maybe<Array<Scalars["String"]>>;
  _nlike?: Maybe<Scalars["String"]>;
  _nsimilar?: Maybe<Scalars["String"]>;
  _similar?: Maybe<Scalars["String"]>;
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  QeuryType: Array<QeuryType>;
  QeuryType_aggregate: QeuryType_Aggregate;
  QeuryType_by_pk?: Maybe<QeuryType>;
  api?: Maybe<Api>;
  apiAggregate: Api_Aggregate;
  apiQueries: Array<ApiQuery>;
  apiQuery?: Maybe<ApiQuery>;
  apiQueryAggregate: ApiQuery_Aggregate;
  apis: Array<Api>;
  auth?: Maybe<Auth>;
  authAggregate: Auth_Aggregate;
  auths: Array<Auth>;
  component?: Maybe<Component>;
  componentAggregate: Component_Aggregate;
  components: Array<Component>;
  organization?: Maybe<Organization>;
  organizationAggregate: Organization_Aggregate;
  organizationUser?: Maybe<OrganizationUser>;
  organizationUserAggregate: OrganizationUser_Aggregate;
  organizationUsers: Array<OrganizationUser>;
  organizations: Array<Organization>;
  page?: Maybe<Page>;
  pageAggregate: Page_Aggregate;
  pages: Array<Page>;
  project?: Maybe<Project>;
  projectAggregate: Project_Aggregate;
  projects: Array<Project>;
  user?: Maybe<Users>;
  userAggregate: Users_Aggregate;
  users: Array<Users>;
};

export type Subscription_RootQeuryTypeArgs = {
  distinct_on?: Maybe<Array<QeuryType_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<QeuryType_Order_By>>;
  where?: Maybe<QeuryType_Bool_Exp>;
};

export type Subscription_RootQeuryType_AggregateArgs = {
  distinct_on?: Maybe<Array<QeuryType_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<QeuryType_Order_By>>;
  where?: Maybe<QeuryType_Bool_Exp>;
};

export type Subscription_RootQeuryType_By_PkArgs = {
  value: Scalars["String"];
};

export type Subscription_RootApiArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootApiAggregateArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type Subscription_RootApiQueriesArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type Subscription_RootApiQueryArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootApiQueryAggregateArgs = {
  distinct_on?: Maybe<Array<ApiQuery_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<ApiQuery_Order_By>>;
  where?: Maybe<ApiQuery_Bool_Exp>;
};

export type Subscription_RootApisArgs = {
  distinct_on?: Maybe<Array<Api_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Api_Order_By>>;
  where?: Maybe<Api_Bool_Exp>;
};

export type Subscription_RootAuthArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootAuthAggregateArgs = {
  distinct_on?: Maybe<Array<Auth_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Auth_Order_By>>;
  where?: Maybe<Auth_Bool_Exp>;
};

export type Subscription_RootAuthsArgs = {
  distinct_on?: Maybe<Array<Auth_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Auth_Order_By>>;
  where?: Maybe<Auth_Bool_Exp>;
};

export type Subscription_RootComponentArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootComponentAggregateArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type Subscription_RootComponentsArgs = {
  distinct_on?: Maybe<Array<Component_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Component_Order_By>>;
  where?: Maybe<Component_Bool_Exp>;
};

export type Subscription_RootOrganizationArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootOrganizationAggregateArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};

export type Subscription_RootOrganizationUserArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootOrganizationUserAggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Subscription_RootOrganizationUsersArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Subscription_RootOrganizationsArgs = {
  distinct_on?: Maybe<Array<Organization_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Organization_Order_By>>;
  where?: Maybe<Organization_Bool_Exp>;
};

export type Subscription_RootPageArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootPageAggregateArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Subscription_RootPagesArgs = {
  distinct_on?: Maybe<Array<Page_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Page_Order_By>>;
  where?: Maybe<Page_Bool_Exp>;
};

export type Subscription_RootProjectArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootProjectAggregateArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type Subscription_RootProjectsArgs = {
  distinct_on?: Maybe<Array<Project_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Project_Order_By>>;
  where?: Maybe<Project_Bool_Exp>;
};

export type Subscription_RootUserArgs = {
  id: Scalars["uuid"];
};

export type Subscription_RootUserAggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars["timestamptz"]>;
  _gt?: Maybe<Scalars["timestamptz"]>;
  _gte?: Maybe<Scalars["timestamptz"]>;
  _in?: Maybe<Array<Scalars["timestamptz"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["timestamptz"]>;
  _lte?: Maybe<Scalars["timestamptz"]>;
  _neq?: Maybe<Scalars["timestamptz"]>;
  _nin?: Maybe<Array<Scalars["timestamptz"]>>;
};

export type Users = {
  __typename?: "Users";
  createdAt: Scalars["timestamptz"];
  email: Scalars["String"];
  id: Scalars["uuid"];
  name: Scalars["String"];
  oAuth: Scalars["String"];
  organizations: Array<OrganizationUser>;
  organizations_aggregate: OrganizationUser_Aggregate;
  updatedAt: Scalars["timestamptz"];
};

export type UsersOrganizationsArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type UsersOrganizations_AggregateArgs = {
  distinct_on?: Maybe<Array<OrganizationUser_Select_Column>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  order_by?: Maybe<Array<OrganizationUser_Order_By>>;
  where?: Maybe<OrganizationUser_Bool_Exp>;
};

export type Users_Aggregate = {
  __typename?: "Users_aggregate";
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

export type Users_Aggregate_Fields = {
  __typename?: "Users_aggregate_fields";
  count?: Maybe<Scalars["Int"]>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};

export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars["Boolean"]>;
};

export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  createdAt?: Maybe<Timestamptz_Comparison_Exp>;
  email?: Maybe<String_Comparison_Exp>;
  id?: Maybe<Uuid_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  oAuth?: Maybe<String_Comparison_Exp>;
  organizations?: Maybe<OrganizationUser_Bool_Exp>;
  updatedAt?: Maybe<Timestamptz_Comparison_Exp>;
};

export enum Users_Constraint {
  UsersEmailKey = "Users_email_key",
  UsersOAuthKey = "Users_oAuth_key",
  UsersPkey = "Users_pkey",
}

export type Users_Insert_Input = {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  oAuth?: Maybe<Scalars["String"]>;
  organizations?: Maybe<OrganizationUser_Arr_Rel_Insert_Input>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Users_Max_Fields = {
  __typename?: "Users_max_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  oAuth?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Users_Max_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  oAuth?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Users_Min_Fields = {
  __typename?: "Users_min_fields";
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  oAuth?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export type Users_Min_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  oAuth?: Maybe<Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Users_Mutation_Response = {
  __typename?: "Users_mutation_response";
  affected_rows: Scalars["Int"];
  returning: Array<Users>;
};

export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

export type Users_Order_By = {
  createdAt?: Maybe<Order_By>;
  email?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  oAuth?: Maybe<Order_By>;
  organizations_aggregate?: Maybe<OrganizationUser_Aggregate_Order_By>;
  updatedAt?: Maybe<Order_By>;
};

export type Users_Pk_Columns_Input = {
  id: Scalars["uuid"];
};

export enum Users_Select_Column {
  CreatedAt = "createdAt",
  Email = "email",
  Id = "id",
  Name = "name",
  OAuth = "oAuth",
  UpdatedAt = "updatedAt",
}

export type Users_Set_Input = {
  createdAt?: Maybe<Scalars["timestamptz"]>;
  email?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["uuid"]>;
  name?: Maybe<Scalars["String"]>;
  oAuth?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["timestamptz"]>;
};

export enum Users_Update_Column {
  CreatedAt = "createdAt",
  Email = "email",
  Id = "id",
  Name = "name",
  OAuth = "oAuth",
  UpdatedAt = "updatedAt",
}

export type Uuid_Comparison_Exp = {
  _eq?: Maybe<Scalars["uuid"]>;
  _gt?: Maybe<Scalars["uuid"]>;
  _gte?: Maybe<Scalars["uuid"]>;
  _in?: Maybe<Array<Scalars["uuid"]>>;
  _is_null?: Maybe<Scalars["Boolean"]>;
  _lt?: Maybe<Scalars["uuid"]>;
  _lte?: Maybe<Scalars["uuid"]>;
  _neq?: Maybe<Scalars["uuid"]>;
  _nin?: Maybe<Array<Scalars["uuid"]>>;
};
