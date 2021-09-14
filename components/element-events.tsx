import ReactDom from "react-dom";
import React, {
  ReactNode,
  useState,
  useMemo,
  ComponentProps,
  useRef,
} from "react";
import { ComponentNodeModel, ElementNodeModel, NodeModel } from "../NodeModel";
import {
  NodeEventModel,
  ActionModel,
  TriggerMutationAction,
  ComponentEventModel,
  NavigationAction,
} from "../EventModel";
import { ComponentModel, NodeData } from "../ComponentModel";
import { applyFormula, isFormula, valueToString } from "../formula/formula";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "./react-components/DropDown";

import { FormulaEditButton } from "./react-components/FormulaEditor";
import { mapValues, omit } from "lodash";
import {
  SelectList,
  SelectOption,
  SelectTrigger,
  Select,
} from "./react-components/Select";
import {
  Crumb,
  CrumbButton,
  Crumbs,
  CrumbSeparator,
} from "./react-components/Crumbs";
import InputGroup from "./react-components/InputGroup";
import InputLabel from "./react-components/InputLabel";
import Input from "./react-components/Input";

type NodeEventSectionProps = {
  node: ElementNodeModel;
  updateNode: (update: ElementNodeModel) => void;
  nodeData: NodeData;
  component: ComponentModel;
};

export const NodeEventPanel = (props: NodeEventSectionProps) => {
  const { node, updateNode, nodeData } = props;
  const [selectedEventIndex, setSelectedEventIndex] = useState<
    number | undefined
  >();

  const eventTriggers = [
    "click",
    "mouseenter",
    "mouseleave",
    "change",
    "input",
    ...(node.tag === "form" ? ["submit"] : []),
    ...(["button", "input", "textarea"].includes(node.tag)
      ? ["focus", "blur"]
      : []),
    "<custom>",
  ].filter(
    (a): a is string =>
      typeof a === "string" && !node.events.some((e) => e.trigger === a)
  );

  const selectedEvent =
    selectedEventIndex !== undefined
      ? node.events[selectedEventIndex]
      : undefined;

  if (selectedEventIndex !== undefined && selectedEvent) {
    return (
      <NodeEvent
        component={props.component}
        event={selectedEvent}
        deleteEvent={() => {
          updateNode({
            ...node,
            events: node.events.filter((e) => e !== selectedEvent),
          });
          setSelectedEventIndex(undefined);
        }}
        inputData={nodeData}
        updateEvent={(update) =>
          updateNode({
            ...node,
            events: node.events.map((e) => (e === selectedEvent ? update : e)),
          })
        }
      >
        <Crumb>
          <CrumbButton onClick={() => setSelectedEventIndex(undefined)}>
            Events
          </CrumbButton>
          <CrumbSeparator />
        </Crumb>
      </NodeEvent>
    );
  }

  return (
    <div style={{ padding: "8px 0" }}>
      <SectionHeader>
        <SectionTitle>Events</SectionTitle>
        <Dropdown>
          <DropdownTrigger className="text-xs text-grey-200">
            ADD
          </DropdownTrigger>
          <DropdownContent>
            {eventTriggers.map((trigger) => (
              <DropdownItem
                className="!text-grey-200"
                key={trigger}
                onSelect={() => {
                  updateNode({
                    ...node,
                    events: [
                      ...node.events,
                      {
                        type: "NodeEvent",
                        trigger,
                        stopPropagation: false,
                        preventDefault: trigger === "Submit",
                        actions: [],
                      },
                    ],
                  });
                  setSelectedEventIndex(node.events.length);
                }}
              >
                {trigger}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </SectionHeader>
      <ul>
        {node.events.map((event, i) => (
          <ListItem
            key={i}
            onClick={(e) => {
              setSelectedEventIndex(i);
            }}
          >
            <ListItemLabel>on {event.trigger}</ListItemLabel>
            <ListItemName>
              {event.actions.length === 1
                ? event.actions[0].type
                : `${event.actions.length} Actions`}
            </ListItemName>
            <button
              style={{
                gridRow: "1 /span 2",
                gridColumn: 2,
                alignSelf: "center",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEventIndex(i);
              }}
            >
              {">"}
            </button>
          </ListItem>
        ))}
      </ul>
    </div>
  );
};
type ComponentEventSectionProps = {
  node: ComponentNodeModel;
  updateNode: (update: ComponentNodeModel) => void;
  nodeData: NodeData;
};

const InputSection = ({ className = "", ...props }: ComponentProps<"div">) => (
  <div className={`grid gap-2 px-4 ${className}`} {...props} />
);

const SectionHeader = ({
  className = "",
  ...props
}: ComponentProps<"section">) => (
  <section
    className={`grid grid-cols-1 grid-flow-col gap-2 px-4 py-2 m-0 border-b border-grey-700 ${className}`}
    {...props}
  />
);
const DeleteSection = ({
  className = "",
  ...props
}: ComponentProps<"section">) => (
  <section
    className={` grid p-4 pb-0 border-t border-grey-700 self-end ${className}`}
    {...props}
  />
);

const SectionTitle = ({ className = "", ...props }: ComponentProps<"h2">) => (
  <h2 className={`m-0 p-0 font-bold text-grey-100 ${className}`} {...props} />
);

const getComponentTriggers = (component: ComponentModel) => {
  const triggers = new Set<string>();
  const events = [
    ...component.events,
    ...Object.values(component.nodes as Record<string, NodeModel>).flatMap(
      (node: any) => (Array.isArray(node.events) ? node.events : [])
    ),
  ];

  const addTriggerFromAction = (action: ActionModel) => {
    switch (action.type) {
      case "Logout":
      case "Navigation":
      case "Save to local storage":
      case "Update Variable":
        break;
      case "Trigger Event":
        triggers.add(action.event);
        break;
      case "Trigger Mutation": {
        action.onCompleted?.actions.forEach(addTriggerFromAction);
        action.onFailed?.actions.forEach(addTriggerFromAction);
      }
    }
  };
  events.forEach((event) => {
    event.actions.forEach(addTriggerFromAction);
  });

  console.log("TRIGGERS", component, triggers);
  return Array.from(triggers);
};

type NodeEventProps = {
  event: NodeEventModel;
  updateEvent: (update: NodeEventModel) => void;
  deleteEvent: () => void;
  inputData: NodeData;
  children: ReactNode;
  component: ComponentModel;
};

const NodeEvent = (props: NodeEventProps) => {
  const { event, updateEvent, deleteEvent, inputData, children } = props;
  const [selectedActionIndex, setSelectedActionIndex] = useState<
    { index: number } | undefined
  >(undefined);

  const selectedAction = selectedActionIndex
    ? event.actions[selectedActionIndex.index]
    : undefined;

  if (selectedAction) {
    return (
      <ActionPanel
        component={props.component}
        action={selectedAction}
        updateAction={(update) =>
          updateEvent({
            ...event,
            actions: event.actions.map((action) =>
              action === selectedAction ? update : action
            ),
          })
        }
        deleteAction={() => {
          setSelectedActionIndex(undefined);
          updateEvent({
            ...event,
            actions: event.actions.filter(
              (action) => action !== selectedAction
            ),
          });
        }}
        inputData={{
          ...inputData,
          Event: { target: { value: undefined }, detail: undefined },
        }}
      >
        {children}
        <Crumb>
          <CrumbButton onClick={() => setSelectedActionIndex(undefined)}>
            {event.trigger}
          </CrumbButton>
          <CrumbSeparator />
        </Crumb>
      </ActionPanel>
    );
  }
  return (
    <div className="grid gap-2 grid-rows-[auto,auto,1fr,auto] px-4 py-2 min-h-full">
      <div className="px-4 grid gap-1">
        <Crumbs>{children}</Crumbs>
        <SectionTitle>{event.trigger}</SectionTitle>
      </div>

      <InputSection>
        <InputGroup>
          <InputLabel>Tigger</InputLabel>
          <Input
            value={event.trigger}
            onChange={(trigger) => updateEvent({ ...event, trigger })}
          />
        </InputGroup>
        <label className="text-grey-200">
          <input
            className="mr-2"
            type="checkbox"
            checked={event.stopPropagation}
            onChange={(e) =>
              updateEvent({ ...event, stopPropagation: e.target.checked })
            }
          />
          Stop event Bubbling?
        </label>
        <label className="text-grey-200">
          <input
            type="checkbox"
            checked={event.preventDefault}
            onChange={(e) =>
              updateEvent({ ...event, preventDefault: e.target.checked })
            }
          />
          Block default behavior?
        </label>
      </InputSection>
      <div className="col-start-1">
        <SectionHeader>
          <SectionTitle>Actions</SectionTitle>
          <ActionSelect
            component={props.component}
            data={inputData}
            onSelect={(action) => {
              updateEvent({
                ...event,
                actions: [...event.actions, action],
              });
              setSelectedActionIndex({ index: event.actions.length });
            }}
          />
        </SectionHeader>
        <ul>
          {event.actions.map((action, actionIndex) => {
            return (
              <ListItem
                key={actionIndex}
                onClick={() => {
                  setSelectedActionIndex({ index: actionIndex });
                }}
              >
                <ListItemLabel>{action.type}</ListItemLabel>
                <ListItemName>
                  {getActionName(action, props.inputData)}
                </ListItemName>
                <button
                  style={{
                    gridRow: "1 / span 2",
                    gridColumn: 2,
                    alignSelf: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActionIndex({ index: actionIndex });
                  }}
                >
                  {">"}
                </button>
              </ListItem>
            );
          })}
        </ul>
      </div>

      <DeleteSection>
        <button onClick={deleteEvent}>Delete Event</button>
      </DeleteSection>
    </div>
  );
};

type ComponentEventProps = {
  event: ComponentEventModel;
  updateEvent: (update: ComponentEventModel) => void;
  deleteEvent: () => void;
  inputData: NodeData;
  children: ReactNode;
  component: ComponentModel;
};

const ComponentEvent = (props: ComponentEventProps) => {
  const { event, updateEvent, deleteEvent, inputData, children } = props;
  const [selectedActionIndex, setSelectedActionIndex] = useState<
    { index: number } | undefined
  >(undefined);

  const selectedAction = selectedActionIndex
    ? event.actions[selectedActionIndex.index]
    : undefined;

  if (selectedAction) {
    return (
      <ActionPanel
        component={props.component}
        action={selectedAction}
        updateAction={(update) =>
          updateEvent({
            ...event,
            actions: event.actions.map((action) =>
              action === selectedAction ? update : action
            ),
          })
        }
        deleteAction={() => {
          setSelectedActionIndex(undefined);
          updateEvent({
            ...event,
            actions: event.actions.filter(
              (action) => action !== selectedAction
            ),
          });
        }}
        inputData={{
          ...inputData,
          Event: { target: { value: undefined }, detail: undefined },
        }}
      >
        {children}
        <Crumb>
          <button onClick={() => setSelectedActionIndex(undefined)}>
            {event.trigger}
          </button>
          <CrumbSeparator />
        </Crumb>
      </ActionPanel>
    );
  }
  return (
    <div className="grid gap-4 grid-rows-[auto,auto,1fr,auto] py-4 min-h-full">
      <div className="px-4 grid gap-1">
        <Crumbs>{children}</Crumbs>
        <SectionTitle>{event.trigger}</SectionTitle>
      </div>

      <div
        style={{
          gridColumn: "1",
        }}
      >
        <SectionHeader>
          <SectionTitle>Actions</SectionTitle>
          <ActionSelect
            component={props.component}
            data={inputData}
            onSelect={(action) => {
              updateEvent({
                ...event,
                actions: [...event.actions, action],
              });
              setSelectedActionIndex({ index: event.actions.length });
            }}
          />
        </SectionHeader>
        <ul>
          {event.actions.map((action, actionIndex) => {
            return (
              <ListItem
                key={actionIndex}
                onClick={() => {
                  setSelectedActionIndex({ index: actionIndex });
                }}
              >
                <ListItemLabel>{action.type}</ListItemLabel>
                <ListItemName>
                  {getActionName(action, props.inputData)}
                </ListItemName>
                <button
                  style={{
                    gridRow: "1 / span 2",
                    gridColumn: 2,
                    alignSelf: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActionIndex({ index: actionIndex });
                  }}
                >
                  {">"}
                </button>
              </ListItem>
            );
          })}
        </ul>
      </div>

      <DeleteSection>
        <button onClick={deleteEvent}>Delete Event</button>
      </DeleteSection>
    </div>
  );
};

const getActionName = (action: ActionModel, data: NodeData) => {
  switch (action.type) {
    case "Debug":
      return applyFormula(action.data, data);
    case "Logout":
      return "Logout";
    case "Navigation":
      return (
        action.to.page?.path ??
        applyFormula(action.to.url, data) ??
        "Choose Location"
      );
    case "Trigger Event":
      return action.event ?? "Choose Event";
    case "Trigger Mutation":
      return action.mutationName ?? "Choose Mutation";
    case "Update Variable":
      return action.variableName ?? "Choose Variable";
    case "Save to local storage":
      return action.key ?? "Choose Key";
  }
};

type ActionSelectProps = {
  data: NodeData;
  onSelect: (action: ActionModel) => void;
  component: ComponentModel;
};
const ActionSelect = (props: ActionSelectProps) => {
  const mutations =
    props.component?.queries.filter((q) => q.type === "mutation") ?? [];

  const actionList = [
    ...Object.keys(props.data.Variables)
      .slice(0, 1)
      .map((variableName) => ({
        type: "Update Variable",
        variableName,
        value: "",
      })),
    {
      type: "Save to local storage",
      key: "",
      value: "",
    },
    {
      type: "Logout",
    },
    {
      type: "Navigation",
      to: {},
    },

    {
      type: "Trigger Event",
      event: "On Change",
    },
    ...mutations.slice(0, 1).map((m) => ({
      type: "Trigger Mutation",
      mutationName: m.name,
      variables: m.variables,
      onCompleted: {
        actions: [],
        trigger: "Completed",
        type: "QueryEvent",
      },
      onFailed: {
        actions: [],
        trigger: "Failed",
        type: "QueryEvent",
      },
    })),
    {
      type: "Debug",
      label: "",
      data: { type: "path", name: "Event", path: ["Event"] },
    },
  ] as ActionModel[];

  return (
    <Dropdown>
      <DropdownTrigger className="text-xs text-grey-200">ADD</DropdownTrigger>
      <DropdownContent>
        {actionList.map((action, i) => (
          <DropdownItem
            className="!text-grey-200"
            key={i}
            onSelect={() => {
              props.onSelect(action);
            }}
          >
            {action.type}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

type ActionPanelProps = {
  action: ActionModel;
  updateAction: (update: ActionModel) => void;
  deleteAction: () => void;
  inputData: NodeData;
  children: ReactNode;
  component: ComponentModel;
};
const ActionPanel = (props: ActionPanelProps) => {
  const { action, updateAction, deleteAction, inputData } = props;

  if (action.type === "Trigger Mutation") {
    return (
      <MutationAction
        component={props.component}
        action={action}
        updateAction={updateAction}
        deleteAction={props.deleteAction}
        nodeData={inputData}
      >
        {props.children}
      </MutationAction>
    );
  }
  return (
    <StyledActionPanel>
      <div className="px-4 grid gap-1">
        <Crumbs>{props.children}</Crumbs>
        <SectionTitle>{props.action.type}</SectionTitle>
      </div>
      {action.type === "Update Variable" && (
        <InputSection>
          <InputGroup>
            <InputLabel>Condition</InputLabel>
            <Input
              disabled={true}
              value={
                action.condition
                  ? applyFormula(action.condition, props.inputData)
                    ? "True"
                    : "False"
                  : ""
              }
              onChange={() => {}}
            />
            <FormulaEditButton
              component={props.component}
              input={props.inputData}
              formula={action.condition}
              onChange={(condition) =>
                updateAction({
                  ...action,
                  condition: condition?.type === "null" ? undefined : condition,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <Select className="!static">
              <SelectTrigger className="!text-right">
                {action.variableName}
              </SelectTrigger>
              <SelectList>
                {Object.keys(inputData.Variables).map((variableName) => (
                  <SelectOption
                    onSelect={() => updateAction({ ...action, variableName })}
                  >
                    {variableName}
                  </SelectOption>
                ))}
              </SelectList>
            </Select>
          </InputGroup>
          <InputGroup>
            <InputLabel>Value</InputLabel>
            <Input
              value={String(
                isFormula(action.value)
                  ? applyFormula(action.value, inputData)
                  : action.value
              )}
              onChange={(value) => updateAction({ ...action, value })}
            />
            <FormulaEditButton
              component={props.component}
              input={inputData}
              formula={isFormula(action.value) ? action.value : undefined}
              onChange={(formula) =>
                updateAction({
                  ...action,
                  value: formula ?? { type: "null", name: "Null" },
                })
              }
            />
          </InputGroup>
        </InputSection>
      )}
      {action.type === "Update Query" && (
        <InputSection>
          <InputGroup>
            <InputLabel>Condition</InputLabel>
            <Input
              disabled={true}
              value={
                action.condition
                  ? applyFormula(action.condition, props.inputData)
                    ? "True"
                    : "False"
                  : ""
              }
              onChange={() => {}}
            />
            <FormulaEditButton
              component={props.component}
              input={props.inputData}
              formula={action.condition}
              onChange={(condition) =>
                updateAction({
                  ...action,
                  condition: condition?.type === "null" ? undefined : condition,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Name</InputLabel>
            <Select className="!static">
              <SelectTrigger className="!text-right">
                {action.paramName}
              </SelectTrigger>
              <SelectList>
                {Object.keys(inputData.Props).map((paramName) => (
                  <SelectOption
                    onSelect={() => updateAction({ ...action, paramName })}
                  >
                    {paramName}
                  </SelectOption>
                ))}
              </SelectList>
            </Select>
          </InputGroup>
          <InputGroup>
            <InputLabel>Value</InputLabel>
            <Input
              value={String(
                isFormula(action.value)
                  ? applyFormula(action.value, inputData)
                  : action.value
              )}
              onChange={(value) => updateAction({ ...action, value })}
            />
            <FormulaEditButton
              component={props.component}
              input={inputData}
              formula={isFormula(action.value) ? action.value : undefined}
              onChange={(formula) =>
                updateAction({
                  ...action,
                  value: formula ?? { type: "null", name: "Null" },
                })
              }
            />
          </InputGroup>
        </InputSection>
      )}
      {action.type === "Save to local storage" && (
        <InputSection>
          <InputGroup>
            <InputLabel>Condition</InputLabel>
            <Input
              disabled={true}
              value={
                action.condition
                  ? applyFormula(action.condition, props.inputData)
                    ? "True"
                    : "False"
                  : ""
              }
              onChange={() => {}}
            />
            <FormulaEditButton
              component={props.component}
              input={props.inputData}
              formula={action.condition}
              onChange={(condition) =>
                updateAction({
                  ...action,
                  condition: condition?.type === "null" ? undefined : condition,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Key</InputLabel>
            <Input
              value={action.key}
              onChange={(key) => updateAction({ ...action, key: String(key) })}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Value</InputLabel>
            <Input
              value={String(
                isFormula(action.value)
                  ? applyFormula(action.value, inputData)
                  : action.value
              )}
              onChange={(value) => updateAction({ ...action, value })}
            />
            <FormulaEditButton
              component={props.component}
              input={inputData}
              formula={isFormula(action.value) ? action.value : undefined}
              onChange={(formula) =>
                updateAction({ ...action, value: formula })
              }
            />
          </InputGroup>
        </InputSection>
      )}

      {action.type === "Trigger Event" && (
        <InputSection>
          <InputGroup>
            <InputLabel>Condition</InputLabel>
            <Input
              disabled={true}
              value={
                action.condition
                  ? applyFormula(action.condition, props.inputData)
                    ? "True"
                    : "False"
                  : ""
              }
              onChange={() => {}}
            />
            <FormulaEditButton
              component={props.component}
              input={props.inputData}
              formula={action.condition}
              onChange={(condition) =>
                updateAction({
                  ...action,
                  condition: condition?.type === "null" ? undefined : condition,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Event Name</InputLabel>
            <Input
              value={action.event}
              onChange={(event) => updateAction({ ...action, event })}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Event Data</InputLabel>
            <Input
              value={String(
                isFormula(action.data)
                  ? applyFormula(action.data, inputData)
                  : action.data
              )}
              onChange={(data) => updateAction({ ...action, data })}
            />
            <FormulaEditButton
              component={props.component}
              input={inputData}
              formula={isFormula(action.data) ? action.data : undefined}
              onChange={(data) => updateAction({ ...action, data })}
            />
          </InputGroup>
        </InputSection>
      )}
      {action.type === "Debug" && (
        <InputSection>
          <InputGroup>
            <InputLabel>Label</InputLabel>
            <Input
              value={action.label ?? ""}
              onChange={(label) => updateAction({ ...action, label })}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Condition</InputLabel>
            <Input
              disabled={true}
              value={
                action.condition
                  ? applyFormula(action.condition, props.inputData)
                    ? "True"
                    : "False"
                  : ""
              }
              onChange={() => {}}
            />
            <FormulaEditButton
              component={props.component}
              input={props.inputData}
              formula={action.condition}
              onChange={(condition) =>
                updateAction({
                  ...action,
                  condition: condition?.type === "null" ? undefined : condition,
                })
              }
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>Event Data</InputLabel>
            <Input
              value={String(
                isFormula(action.data)
                  ? applyFormula(action.data, inputData)
                  : action.data
              )}
              onChange={(data) => updateAction({ ...action, data })}
            />
            <FormulaEditButton
              component={props.component}
              input={inputData}
              formula={isFormula(action.data) ? action.data : undefined}
              onChange={(data) => updateAction({ ...action, data })}
            />
          </InputGroup>
        </InputSection>
      )}
      {action.type === "Logout" && <div />}
      <DeleteSection>
        <button onClick={props.deleteAction}>Delete Action </button>
      </DeleteSection>
    </StyledActionPanel>
  );
};

const StyledActionPanel = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div
    className={`py-4 grid gap-2 grid-rows-[auto,auto,1fr] min-h-full items-start ${className}`}
    {...props}
  />
);

const ListItem = ({ className = "", ...props }: ComponentProps<"li">) => (
  <li
    className={`grid grid-cols-[1fr,auto] text-grey-200 text-sm items-start h-12 content-center px-4 even:bg-white even:bg-opacity-5 ${className}`}
    {...props}
  />
);

const ListItemLabel = ({
  className = "",
  ...props
}: ComponentProps<"span">) => (
  <span
    className={`col-start-1 row-start-1 text-xs uppercase text-grey-400 ${className}`}
    {...props}
  />
);

const ListItemName = ({ className = "", ...props }: ComponentProps<"span">) => (
  <span
    className={` col-start-1 row-start-2 text-xs text-grey-200 p-0 ${className}`}
    {...props}
  />
);

type MutationActionProps = {
  action: TriggerMutationAction;
  updateAction: (update: TriggerMutationAction) => void;
  deleteAction: () => void;
  nodeData: NodeData;
  children: ReactNode;
  component: ComponentModel;
};

const MutationAction = (props: MutationActionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { action, updateAction, nodeData } = props;
  const [selectedActionIndex, setSelectedActionIndex] = useState<
    { type: "success" | "fail"; index: number } | undefined
  >();
  const mutations =
    props.component.queries?.filter((q) => q.type === "mutation") ?? [];
  const mutation = mutations?.find((q) => q.name === action.mutationName);

  const selectedAction =
    selectedActionIndex?.type === "success"
      ? action.onCompleted?.actions[selectedActionIndex.index]
      : selectedActionIndex?.type === "fail"
      ? action.onFailed?.actions[selectedActionIndex.index]
      : undefined;

  if (selectedAction) {
    return (
      <ActionPanel
        component={props.component}
        action={selectedAction}
        deleteAction={() => {
          switch (selectedActionIndex?.type) {
            case "success":
              props.updateAction({
                ...action,
                onCompleted: {
                  trigger: "Completed",
                  type: "QueryEvent",
                  actions:
                    action.onCompleted?.actions.filter(
                      (a, i) => i !== selectedActionIndex.index
                    ) ?? [],
                },
              });
              break;
            case "fail":
              props.updateAction({
                ...action,
                onFailed: {
                  trigger: "Failed",
                  type: "QueryEvent",
                  actions:
                    action.onFailed?.actions.filter(
                      (a, i) => i !== selectedActionIndex.index
                    ) ?? [],
                },
              });
              break;
          }
          setSelectedActionIndex(undefined);
        }}
        inputData={props.nodeData}
        updateAction={(update) => {
          switch (selectedActionIndex?.type) {
            case "success":
              return props.updateAction({
                ...action,
                onCompleted: {
                  ...action.onCompleted,
                  actions: action.onCompleted.actions.map((a, i) =>
                    i === selectedActionIndex.index ? update : a
                  ),
                },
              });
            case "fail":
              return props.updateAction({
                ...action,
                onFailed: {
                  ...action.onFailed,
                  actions:
                    action.onFailed?.actions.map((a, i) =>
                      i === selectedActionIndex.index ? update : a
                    ) ?? [],
                },
              });
          }
        }}
      >
        {props.children}
        <Crumb>
          <button onClick={() => setSelectedActionIndex(undefined)}>
            {getActionName(action, props.nodeData)}
          </button>
          <CrumbSeparator />
        </Crumb>
      </ActionPanel>
    );
  }

  return (
    <StyledActionPanel className="grid-rows-[repeat(5,auto),1fr]">
      <div className="px-4 grid gap-1">
        <Crumbs>{props.children}</Crumbs>
        <SectionTitle>{props.action.type}</SectionTitle>
      </div>
      <InputSection>
        <Select>
          <SelectTrigger>{props.action.mutationName}</SelectTrigger>
          <SelectList>
            {mutations.map((mutation) => (
              <SelectOption
                onSelect={() => {
                  if (mutation) {
                    updateAction({
                      type: "Trigger Mutation",
                      mutationName: mutation.name,
                      variables: Object.fromEntries(
                        Object.entries(mutation.variables).map(
                          ([key, { value }]) => [key, value]
                        )
                      ),
                      onCompleted: {
                        actions: [],
                        trigger: "Completed",
                        type: "QueryEvent",
                      },
                      onFailed: {
                        actions: [],
                        trigger: "Failed",
                        type: "QueryEvent",
                      },
                    });
                  }
                }}
              >
                {mutation.name}
              </SelectOption>
            ))}
          </SelectList>
        </Select>
        <InputGroup>
          <InputLabel>Condition</InputLabel>
          <Input
            disabled={true}
            value={
              action.condition
                ? applyFormula(action.condition, props.nodeData)
                  ? "True"
                  : "False"
                : ""
            }
            onChange={(value) => {}}
          />
          <FormulaEditButton
            component={props.component}
            input={props.nodeData}
            formula={action.condition}
            onChange={(condition) =>
              updateAction({
                ...action,
                condition: condition?.type === "null" ? undefined : condition,
              })
            }
          />
        </InputGroup>
      </InputSection>
      <SectionHeader>
        <SectionTitle>Input</SectionTitle>
      </SectionHeader>
      <InputSection>
        {Object.entries(action.variables).map(([key, value]) => {
          const name = mutation?.variables[key]?.name;
          return (
            <InputGroup ref={ref}>
              <InputLabel>{name}</InputLabel>
              <Input
                key={key}
                value={String(
                  isFormula(value)
                    ? valueToString(applyFormula(value, nodeData))
                    : value
                )}
                onChange={(value) =>
                  updateAction({
                    ...action,
                    variables: { ...action.variables, [key]: value },
                  })
                }
              />
              <FormulaEditButton
                component={props.component}
                formula={isFormula(value) ? value : undefined}
                onChange={(formula) =>
                  updateAction({
                    ...action,
                    variables: {
                      ...action.variables,
                      [key]: formula ?? { type: "null", name: "Null" },
                    },
                  })
                }
                input={nodeData}
              />
            </InputGroup>
          );
        })}
      </InputSection>
      <div>
        <SectionHeader>
          <SectionTitle>On Success</SectionTitle>
          <ActionSelect
            component={props.component}
            data={props.nodeData}
            onSelect={(action) => {
              props.updateAction({
                ...props.action,
                onCompleted: {
                  trigger: "Completed",
                  type: "QueryEvent",
                  actions: [
                    ...(props.action.onCompleted?.actions ?? []),
                    action,
                  ],
                },
              });
              setSelectedActionIndex({
                type: "success",
                index: (props.action.onCompleted?.actions ?? []).length,
              });
            }}
          />
        </SectionHeader>
        <ul>
          {action.onCompleted.actions.map((action, actionIndex) => {
            return (
              <ListItem
                key={actionIndex}
                onClick={() => {
                  setSelectedActionIndex({
                    type: "success",
                    index: actionIndex,
                  });
                }}
              >
                <ListItemLabel>{action.type}</ListItemLabel>
                <ListItemName>
                  {getActionName(action, props.nodeData)}
                </ListItemName>
                <button
                  style={{
                    gridRow: "1 / span 2",
                    gridColumn: 2,
                    alignSelf: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActionIndex({
                      type: "success",
                      index: actionIndex,
                    });
                  }}
                >
                  {">"}
                </button>
              </ListItem>
            );
          })}
        </ul>
      </div>
      <div>
        <SectionHeader>
          <SectionTitle>On Fail</SectionTitle>
          <ActionSelect
            component={props.component}
            data={props.nodeData}
            onSelect={(action) => {
              props.updateAction({
                ...props.action,
                onFailed: {
                  trigger: "Failed",
                  type: "QueryEvent",
                  actions: [...(props.action.onFailed?.actions ?? []), action],
                },
              });
              setSelectedActionIndex({
                type: "fail",
                index: (props.action.onFailed?.actions ?? []).length,
              });
            }}
          />
        </SectionHeader>
        <ul>
          {action.onFailed.actions.map((action, actionIndex) => {
            return (
              <ListItem
                key={actionIndex}
                onClick={() => {
                  setSelectedActionIndex({ type: "fail", index: actionIndex });
                }}
              >
                <ListItemLabel>{action.type}</ListItemLabel>
                <ListItemName>
                  {getActionName(action, props.nodeData)}
                </ListItemName>
                <button
                  style={{
                    gridRow: "1 / span 2",
                    gridColumn: 2,
                    alignSelf: "center",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedActionIndex({
                      type: "fail",
                      index: actionIndex,
                    });
                  }}
                >
                  {">"}
                </button>
              </ListItem>
            );
          })}
        </ul>
      </div>
      <DeleteSection>
        <button onClick={props.deleteAction}>Delete Action </button>
      </DeleteSection>
    </StyledActionPanel>
  );
};

type NavigationActionProps = {
  action: NavigationAction;
  updateAction: (action: NavigationAction) => void;
  inputData: NodeData;
};

export class ElementEvents extends HTMLElement {
  _node?: ElementNodeModel;
  _nodeData?: NodeData;
  _component?: ComponentModel;
  constructor() {
    super();
    this.render();
  }
  get node() {
    return this._node;
  }
  set node(node: ElementNodeModel | undefined) {
    this._node = node;
    this.render();
  }
  get nodeData() {
    return this._nodeData;
  }
  set nodeData(nodeData: NodeData | undefined) {
    this._nodeData = nodeData;
    this.render();
  }
  get component() {
    return this._component;
  }
  set component(component) {
    this._component = component;
    this.render();
  }

  render() {
    if (this.component && this.node && this.nodeData) {
      ReactDom.render(
        <NodeEventPanel
          nodeData={this.nodeData}
          node={this.node}
          component={this.component}
          updateNode={(node) => {
            this.dispatchEvent(new CustomEvent("update", { detail: node }));
          }}
        />,
        this
      );
    }
  }
}
