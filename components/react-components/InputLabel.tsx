import React, { forwardRef } from "react";
import { ComponentProps } from "react";

const InputLabel = forwardRef<
  HTMLLabelElement,
  ComponentProps<"label"> & { isSet?: boolean }
>(({ className = "", isSet = false, ...props }, ref) => (
  <label
    ref={ref}
    className={`  font-sans text-xs px-2 flex items-center ${
      isSet ? "text-primary-300" : "text-grey-300"
    } ${className}`}
    {...props}
  />
));

export default InputLabel;
