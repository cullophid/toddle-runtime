import React, { ComponentProps, HTMLAttributes, useState } from "react";
import { OperationSelect } from "./OperationSelect";
import {
  applyFormula,
  BooleanOperation,
  Formula,
  FunctionArgument,
  FunctionOperation,
  NumberOperation,
  PathOperation,
  StringOperation,
  valueToString,
} from "../../formula/formula";
import { ComponentModel, NodeData } from "../../ComponentModel";
import { functions } from "../../formula/functions";
import { OperationArgInput } from "./OperationArgInput";

export const Operation = (props: {
  operation: Formula;
  path: string;
  onChange: (expression?: Formula) => void;
  component: ComponentModel;
  data: NodeData;
}) => {
  const { operation } = props;

  if (operation.type === "function") {
    return <FunctionOp {...props} operation={operation} />;
  }

  return (
    <StyledOperation data-node-path={props.path}>
      <OperationHeader
        className={
          operation.type === "path"
            ? "!text-orange-800 !bg-orange-300"
            : "!text-blue-800 !bg-blue-300"
        }
        data-color={operation.type === "path" ? "orange" : "blue"}
      >
        <OperationSelect
          operation={props.operation}
          onChange={props.onChange}
        />
      </OperationHeader>
      {operation.type === "path" && <PathOp {...props} operation={operation} />}
      {operation.type === "number" && (
        <NumberOp {...props} operation={operation} />
      )}
      {operation.type === "string" && (
        <StringOp {...props} operation={operation} />
      )}
      {operation.type === "boolean" && (
        <BooleanOp {...props} operation={operation} />
      )}

      <OutputHandle
        style={{ top: 20 }}
        path={props.path}
        onClick={() =>
          props.onChange({
            type: "function",
            name: "ID",
            arguments: [
              {
                formula: props.operation,
              },
            ],
          })
        }
      />
    </StyledOperation>
  );
};

const Crumb = ({ className = "", ...props }: ComponentProps<"button">) => (
  <button
    className={`bg-transparent border border-transparent focus:border-primary-300 p-0 inline-block text-xs text-grey-400 font-bold cursor-pointer hover:text-grey-100 ${className}`}
    {...props}
  />
);

const PathKey = ({
  className = "",
  selected,
  ...props
}: ComponentProps<"button"> & { selected: boolean }) => (
  <button
    aria-selected={selected}
    className={`border border-transparent h-8 w-full text-left px-4 block text-sm focus:outline-none focus:border-primary-300 
      ${selected ? "bg-grey-500" : "bg-transparent"}
      ${className}
    `}
    {...props}
  />
);

const PathOp = (props: {
  data: NodeData;
  path: string;
  operation: PathOperation;
  component: ComponentModel;
  onChange: (operation: Formula) => void;
}) => {
  // const getName = (key: string, i: number) => {
  //   if (i !== 1) {
  //     return key;
  //   }
  //   const [parent] = props.operation.path;

  //   switch (parent) {
  //     case "Variables":
  //       return (
  //         props.component.variables?.find((v) => v.id === key)?.name ?? key
  //       );
  //     case "Queries":
  //       return props.component.queries?.find((v) => v.id === key)?.name ?? key;
  //     case "Variables":
  //       return props.component.props?.find((v) => v.id === key)?.name ?? key;
  //     default: {
  //       return key;
  //     }
  //   }
  // };
  const result = applyFormula(props.operation, props.data);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const objectKeys =
    typeof result === "object" && result !== null
      ? Object.keys(result)
      : undefined;

  return (
    <div
      style={{
        minHeight: 40,
      }}
    >
      {props.operation.path.length > 0 && (
        <div
          className="px-4 py-2"
          tabIndex={0}
          onFocus={(e) => {
            const crumbs = e.target?.querySelectorAll("button");
            crumbs[crumbs.length - 2]?.focus();
          }}
        >
          <Crumb
            tabIndex={-1}
            onClick={(e) => {
              props.onChange({
                ...props.operation,
                path: [],
              });
              setHighlightedIndex(0);
              (e.target as any).parentElement?.nextElementSibling?.focus();
            }}
            onKeyDown={(e) => {
              switch (e.key) {
                case "ArrowRight":
                  if (props.operation.path.length > 2) {
                    (e.target as any).nextElementSibling?.focus();
                  }
                  break;
              }
            }}
          >
            Data
          </Crumb>

          {props.operation.path.map((key, i) => (
            <React.Fragment key={i}>
              <span className="mx-2 text-grey-400 text-sm">/</span>
              <Crumb
                tabIndex={-1}
                disabled={i === props.operation.path.length - 1}
                onClick={(e) => {
                  props.onChange({
                    ...props.operation,
                    path: props.operation.path.slice(0, i + 1),
                  });
                  (e.target as any).parentElement?.nextElementSibling?.focus();
                }}
                onKeyDown={(e) => {
                  switch (e.key) {
                    case "ArrowLeft":
                      (e.target as any).previousElementSibling?.focus();
                      break;
                    case "ArrowRight":
                      if (i < props.operation.path.length - 2) {
                        (e.target as any).nextElementSibling?.focus();
                      }
                      break;
                  }
                }}
              >
                {key}
              </Crumb>
            </React.Fragment>
          ))}
        </div>
      )}
      <div
        className="focus:outline-none"
        tabIndex={-1}
        onFocus={(e) => {
          setTimeout(() => {
            const button = e.target.querySelector("button");
            button?.focus();
          }, 20);
        }}
      >
        {objectKeys && objectKeys.length > 0 ? (
          objectKeys.map((key, index) => (
            <PathKey
              key={key}
              selected={index === highlightedIndex}
              tabIndex={index === highlightedIndex ? 0 : -1}
              onClick={(e) => {
                props.onChange({
                  ...props.operation,
                  path: [...props.operation.path, key],
                });
                (e.target as any).parentElement?.focus();
              }}
              onMouseOver={() => setHighlightedIndex(index)}
              onFocus={() => setHighlightedIndex(index)}
              onKeyDown={(e) => {
                switch (e.key) {
                  case "ArrowDown":
                    (e.target as any).nextElementSibling?.focus();
                    break;
                  case "ArrowUp":
                    (e.target as any).previousElementSibling?.focus();
                    break;
                }
              }}
            >
              {key}
            </PathKey>
          ))
        ) : (
          <OperationSection>
            {objectKeys ? (
              <span className="text-grey-500">Empty</span>
            ) : (
              valueToString(result)
            )}
          </OperationSection>
        )}
      </div>
    </div>
  );
};

const Input = ({ className = "", ...props }: ComponentProps<"input">) => (
  <input
    className={`block bg-grey-500 text-grey-200 rounded h-6 py-0 px-2 border border-transparent focus:border-primary-300 focus:outline-none${className}`}
    {...props}
  />
);

const NumberOp = (props: {
  path: string;
  operation: NumberOperation;
  onChange: (operation: Formula) => void;
}) => {
  return (
    <OperationSection>
      <Input
        value={props.operation.value}
        onChange={(e) =>
          props.onChange({
            ...props.operation,
            value: Number(e.target.value),
          })
        }
        onFocus={(e) => e.target.select()}
        onKeyDown={(e) => {
          switch (e.key) {
            case "ArrowUp":
              e.preventDefault();
              props.onChange({
                ...props.operation,
                value:
                  props.operation.value +
                  (e.shiftKey ? 10 : e.altKey ? 0.1 : 1),
              });
              break;
            case "ArrowDown":
              e.preventDefault();
              props.onChange({
                ...props.operation,
                value:
                  props.operation.value -
                  (e.shiftKey ? 10 : e.altKey ? 0.1 : 1),
              });
              break;
          }
        }}
      />
    </OperationSection>
  );
};

const StringOp = (props: {
  path: string;
  operation: StringOperation;
  onChange: (expression: Formula) => void;
}) => {
  return (
    <OperationSection>
      <Input
        value={props.operation.value}
        onChange={(e) =>
          props.onChange({
            ...props.operation,
            value: e.target.value,
          })
        }
      />
    </OperationSection>
  );
};
const BooleanOp = (props: {
  path: string;
  operation: BooleanOperation;
  onChange: (operation: Formula) => void;
}) => {
  return (
    <OperationSection>
      <select
        value={props.operation.value ? "True" : "False"}
        onChange={(e) =>
          props.onChange({
            ...props.operation,
            value: e.target.value === "True",
          })
        }
      >
        <option>True</option>
        <option>False</option>
      </select>
    </OperationSection>
  );
};
const FunctionOp = (props: {
  data: NodeData;
  path: string;
  operation: FunctionOperation;
  component: ComponentModel;
  onChange: (operation?: Formula) => void;
}) => {
  const updateArg = (i: number, arg: FunctionArgument) => {
    props.onChange({
      ...props.operation,
      arguments: [
        ...props.operation.arguments.slice(0, i),
        arg,
        ...props.operation.arguments.slice(i + 1),
      ],
    });
  };

  return (
    <OperationGroup>
      <OperationChildren>
        {props.operation.arguments.map((arg, i) => {
          if (
            ["number", "string", "boolean", "null"].includes(arg.formula.type)
          ) {
            return null;
          }
          return (
            <Operation
              key={i}
              operation={arg.formula}
              component={props.component}
              path={`${props.path}.${i}`}
              data={
                props.operation.type === "function" &&
                functions[props.operation.name]?.getArgumentInputData
                  ? functions[props.operation.name]?.getArgumentInputData?.(
                      props.operation,
                      i,
                      props.data
                    )
                  : props.data
              }
              onChange={(formula) =>
                props.onChange({
                  ...props.operation,
                  arguments: [
                    ...props.operation.arguments.slice(0, i),
                    {
                      ...arg,
                      formula: formula ?? { type: "null", name: "Null" },
                    },
                    ...props.operation.arguments.slice(i + 1),
                  ],
                })
              }
            />
          );
        })}
      </OperationChildren>
      <StyledOperation data-node-path={props.path}>
        <OperationHeader className="!text-green-800 !bg-green-300">
          <OperationSelect
            operation={props.operation}
            onChange={(operation) => {
              if (
                (operation.type === "function" && operation.name === "ID") ||
                operation.type === "null"
              ) {
                props.onChange(
                  props.operation.arguments[0]?.formula ?? {
                    type: "null",
                    name: "None",
                  }
                );
                return;
              }
              if (operation.type === "function") {
                const firstArg = props.operation.arguments[0];
                props.onChange({
                  ...operation,
                  arguments:
                    firstArg && firstArg.formula.type !== "null"
                      ? [
                          {
                            ...operation.arguments[0],
                            formula: firstArg.formula,
                          },
                          ...operation.arguments.slice(1),
                        ]
                      : operation.arguments,
                });
                return;
              }
              props.onChange(operation);
            }}
          />
        </OperationHeader>
        {props.operation.arguments.map((arg, i) => (
          <OperationSection key={i}>
            <InputHandle
              path={`${props.path}.${i}`}
              onClick={() => {
                updateArg(i, {
                  ...arg,
                  formula: {
                    type: "function",
                    name: "ID",
                    arguments: [
                      {
                        formula: { type: "path", name: "Data", path: [] },
                      },
                    ],
                  },
                });
              }}
            />
            <OperationArgInput
              index={i}
              formula={arg.formula}
              name={arg.name ?? String(i)}
              onChange={(formula) => {
                updateArg(i, { ...arg, formula });
              }}
              data={props.data}
            />
          </OperationSection>
        ))}

        {props.operation.varArgs && (
          <button
            onClick={() =>
              props.onChange({
                ...props.operation,
                arguments: [
                  ...props.operation.arguments,
                  props.operation.arguments[
                    props.operation.arguments.length - 1
                  ],
                ],
              })
            }
          >
            add
          </button>
        )}
        <OutputHandle
          style={{ top: 20 }}
          path={props.path}
          onClick={() =>
            props.onChange({
              type: "function",
              name: "ID",
              arguments: [
                {
                  formula: props.operation,
                },
              ],
            })
          }
        />
      </StyledOperation>
    </OperationGroup>
  );
};

export const ResultNode = (props: {
  data: NodeData;
  path: string;
  operation: Formula;
  component: ComponentModel;
  onChange: (operation?: Formula) => void;
}) => {
  return (
    <OperationGroup>
      <OperationChildren>
        <Operation {...props} />
      </OperationChildren>
      <StyledOperation data-node-path={props.path}>
        {/* <OperationHeader className="bg-grey-500 text-grey-300 px-4 py-2">
          Result
        </OperationHeader> */}
        <p className="px-4 py-2 text-right">
          {valueToString(applyFormula(props.operation, props.data))}
        </p>
        <InputHandle
          path={`0`}
          onClick={() => {
            props.onChange({
              type: "function",
              name: "ID",
              arguments: [
                {
                  formula: props.operation,
                },
              ],
            });
          }}
        />
      </StyledOperation>
    </OperationGroup>
  );
};

const OperationChildren = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div
    className={`flex flex-col gap-8 mr-8 items-end ${className}`}
    {...props}
  />
);

const OperationGroup = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div
    className={`inline-flex flex-row items-center ${className}`}
    {...props}
  />
);

const StyledOperation = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div
    className={` relative bg-grey-600 rounded flex-grow-0 flex-shrink-0 w-72 text-grey-300
    shadow-md ${className}`}
    {...props}
  />
);

const OperationHeader = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div
    className={`relative rounded-t grid content-center bg-grey-700 text-grey-200 ${className}`}
    {...props}
  />
);

const OperationSection = ({
  className = "",
  selected = false,
  ...props
}: ComponentProps<"div"> & { selected?: boolean }) => (
  <div
    className={`relative px-4 py-2 text-grey-200 ${
      selected ? "bg-grey-500" : ""
    } ${className}`}
    {...props}
  />
);

const StyledHandle = ({
  className = "",
  input,
  output,
  ...props
}: ComponentProps<"button"> & { input?: string; output?: string }) => (
  <button
    data-node-input={input}
    data-node-output={output}
    className={`
    border-none p-0 block w-3 h-3 absolute rounded-full bg-grey-400 top-1/2 transition-all duration-300 border border-transparent origin-center
    focus:w-6 focus:h-6 focus:border-primary-300 focus:shadow-md
    ${input ? "left-0 -translate-x-1/2 -translate-y-1/2" : ""}
    ${output ? "right-0 translate-x-1/2 -translate-y-1/2" : ""}
    ${className}`}
    {...props}
  />
);

export const InputHandle = (
  props: HTMLAttributes<HTMLButtonElement> & { path: string }
) => {
  const { path, ...buttonProps } = props;

  return <StyledHandle input={path} {...buttonProps} />;
};

export const OutputHandle = (
  props: HTMLAttributes<HTMLButtonElement> & { path: string }
) => {
  const { path, ...buttonProps } = props;
  return <StyledHandle output={path} {...buttonProps} />;
};
