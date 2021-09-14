import React, { ComponentProps } from "react";

export const Crumb = ({ className = "", ...props }: ComponentProps<"li">) => (
  <li className={`text-grey-400 text-xs ${className}`} {...props} />
);

export const CrumbButton = ({
  className = "",
  ...props
}: ComponentProps<"button">) => (
  <button
    className={`p-0 text-xs bg-transparent text-grey-400 cursor-pointer hover:text-grey-200 ${className}`}
    {...props}
  />
);

export const CrumbSeparator = ({
  className = "",
  children = "/",
  ...props
}: ComponentProps<"span">) => (
  <span className={`text-xs mx-1 ${className}`} {...props}>
    {children}
  </span>
);

export const Crumbs = ({ className = "", ...props }: ComponentProps<"ul">) => (
  <ul className={` flex items-center m-0 p-0 ${className}`} {...props} />
);
