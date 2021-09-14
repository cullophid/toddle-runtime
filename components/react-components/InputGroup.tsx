import React, { ComponentProps, forwardRef } from "react";

export const InputGroup = forwardRef<HTMLDivElement, ComponentProps<"div">>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`items-center rounded border border-transparent bg-grey-700 flex h-7 relative hover:border-grey-800 focus-within:border-primary-300 hover:focus-within:border-primary-300 ${
          className ?? ""
        }`}
        {...props}
      />
    );
  }
);

export default InputGroup;
