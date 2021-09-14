import React, { ComponentProps, HTMLAttributes } from "react";

export const SectionHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <header
      className={`grid grid-cols-1 auto-cols-auto grid-flow-col gap-2 py-2 ${
        className ?? ""
      }`}
      {...props}
    />
  );
};

export const SectionTitle = (props: HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className="font-sans m-0 p-0 font-bold text-grey-100" {...props} />
);

export const PanelSectionHeader = ({
  className = "",
  ...props
}: ComponentProps<"header">) => (
  <header
    className={`grid h-8 grid-cols-[1fr,auto] items-center className text-grey-100`}
    {...props}
  />
);

export const PanelSectionContent = ({
  className = "",
  ...props
}: ComponentProps<"div">) => (
  <div className={`mt-2 mb-4 relative grid ${className}`} {...props} />
);
