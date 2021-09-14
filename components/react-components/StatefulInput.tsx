import React, { useState, InputHTMLAttributes, forwardRef } from "react";
import Input from "./Input";

const StatefulInput = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: (value: string) => boolean;
  }
>(({ onChange, onKeyDown, onBlur, ...props }, ref) => {
  const [currentValue, setCurrentValue] = useState(props.value ?? undefined);
  return (
    <Input
      ref={ref}
      {...props}
      title={String(props.value)}
      value={currentValue}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") {
          if (!onChange(String(currentValue))) {
            setCurrentValue(props.value);
          }
        }
        onKeyDown?.(e);
      }}
      onBlur={(e) => {
        if (!onChange(String(currentValue))) {
          setCurrentValue(props.value);
        }
        onBlur?.(e);
      }}
      onChange={(value) => setCurrentValue(value)}
    />
  );
});

export default StatefulInput;
