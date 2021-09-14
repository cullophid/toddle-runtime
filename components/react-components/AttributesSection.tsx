import React from "react";
import { SectionHeader, SectionTitle } from "./PanelSection";
import { omit } from "lodash";
import { NodeModel, ElementNodeModel } from "../../NodeModel";
import { isFormula, applyFormula } from "../../formula/formula";
import { FormulaEditButton } from "./FormulaEditor";
import { ComponentModel, NodeData } from "../../ComponentModel";
import InputGroup from "./InputGroup";
import InputLabel from "./InputLabel";
import Input from "./Input";
import StatefulInput from "./StatefulInput";

type Props = {
  node: ElementNodeModel;
  component: ComponentModel;
  updateNode: (node: ElementNodeModel) => void;
  nodeData: NodeData;
};
export const AttributeSection = (props: Props) => {
  const { node, updateNode, nodeData } = props;

  return (
    <>
      <SectionHeader>
        <SectionTitle>Attributes</SectionTitle>
        <button
          className="text-grey-200 text-xs"
          onClick={() =>
            updateNode({
              ...node,
              attrs: {
                ...node.attrs,
                [`Attribute ${Object.keys(node.attrs).length}`]: "Value",
              },
            })
          }
        >
          ADD
        </button>
      </SectionHeader>
      <div
        style={{
          display: "grid",
          gridGap: "8px",
        }}
      >
        <InputGroup>
          <InputLabel>ID</InputLabel>
          <Input
            value={node.attrs.id ?? ""}
            onChange={(id) =>
              updateNode({ ...node, attrs: { ...node.attrs, id } })
            }
          />
        </InputGroup>

        <ClassList {...props} />
        {Object.entries((node.attrs as Record<string, any>) ?? {})
          .filter(
            ([attr]) => !["href", "value", "id", "classList"].includes(attr)
          )
          .map(([key, value], i) => {
            return (
              <div key={i} className="grid grid-columns-[1fr,1fr,auto]">
                <InputGroup>
                  <StatefulInput
                    value={key}
                    onChange={(newName) => {
                      if (newName === key || node.attrs[newName]) {
                        return false;
                      }
                      updateNode({
                        ...node,
                        attrs: {
                          ...omit(node.attrs, [key]),
                          [newName]: value,
                        },
                      });
                      return true;
                    }}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    value={applyFormula(value, nodeData)}
                    onChange={(value) =>
                      updateNode({
                        ...node,
                        attrs: {
                          ...node.attrs,
                          [key]: value,
                        },
                      })
                    }
                  />
                  <FormulaEditButton
                    component={props.component}
                    formula={isFormula(value) ? value : undefined}
                    input={nodeData}
                    onChange={(formula) =>
                      updateNode({
                        ...node,
                        attrs: {
                          ...node.attrs,
                          [key]: formula,
                        },
                      })
                    }
                  />
                </InputGroup>
                <button
                  className="bg-grey-700 text-grey-200 rounded"
                  onClick={() =>
                    updateNode({
                      ...node,
                      attrs: omit(node.attrs, [key]),
                    })
                  }
                >
                  Delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export const ClassList = (props: Props) => {
  const { node, updateNode, nodeData } = props;

  return (
    <div className="grid gap-2 bg-grey-700 p-2">
      <div className="flex justify-between items-center">
        <h3 className="text-grey-100">Classes</h3>
        <button
          className="text-grey-200 text-xs"
          onClick={() =>
            updateNode({
              ...node,
              attrs: {
                ...node.attrs,
                classList: [...(node.attrs.classList ?? []), { name: "class" }],
              },
            })
          }
        >
          ADD
        </button>
      </div>
      <ul className="grid gap-2">
        {node?.type === "element" &&
          node?.attrs.classList?.map((nodeClass, i) => (
            <li key={i} className="flex gap-2 items-center">
              <input
                className="block bg-grey-800 text-grey-200 flex-1 w-0 px-2 rounded focus:border-primary-300 border border-transparent focus:outline-none"
                value={nodeClass.name}
                onChange={(e) => {
                  updateNode({
                    ...node,
                    attrs: {
                      ...node.attrs,
                      classList: node.attrs.classList?.map((nc) =>
                        nc === nodeClass ? { ...nc, name: e.target.value } : nc
                      ),
                    },
                  });
                }}
                onBlur={() => {
                  if (nodeClass.name === "") {
                    updateNode({
                      ...node,
                      attrs: {
                        ...node.attrs,
                        classList: node.attrs.classList?.filter(
                          (nc) => nc !== nodeClass
                        ),
                      },
                    });
                  }
                }}
              />
              <FormulaEditButton
                component={props.component}
                input={nodeData}
                formula={nodeClass.formula}
                onChange={(formula) => {
                  updateNode({
                    ...node,
                    attrs: {
                      ...node.attrs,
                      classList: node.attrs.classList?.map((nc) =>
                        nc === nodeClass ? { ...nc, formula } : nc
                      ),
                    },
                  });
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
