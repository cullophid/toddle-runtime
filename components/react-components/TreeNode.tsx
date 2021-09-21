import React, { ReactChild, ReactNode, useState } from "react";

type Props = {
  initialExpanded?: boolean;
  header: ReactChild;
  children?: ReactNode;
  className?: string;
};

export const TreeNode = (props: Props) => {
  const { header, children } = props;
  const [expanded, setExpanded] = useState(props.initialExpanded);
  return (
    <li
      style={{
        marginTop: 4,
        display: "grid",
        gridTemplateColumns: "18px auto",
        gridTemplateRows: "auto auto",
        justifyContent: "start",
        alignItems: "center",
        justifyItems: "start",
        fontWeight: 300,
        gridGap: 8,
        fontFamily: "'Fira Code', monospace",
      }}
    >
      <button onClick={() => setExpanded((expanded) => !expanded)}>
        {expanded ? "-" : "+"}
      </button>
      {header}
      {expanded && (
        <ul
          style={{
            gridColumn: "1 / span 2",
            listStyleType: "none",
            paddingLeft: "8px",
            borderLeft: "1px solid #2f2f2f",
            marginLeft: "9px",
          }}
        >
          {children}
        </ul>
      )}
    </li>
  );
};
