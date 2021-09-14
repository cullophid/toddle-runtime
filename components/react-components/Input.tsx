import React, { InputHTMLAttributes, forwardRef } from "react";

const Input = forwardRef<
  HTMLInputElement,
  Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: (value: string) => void;
  }
>(({ onChange, className = "", ...props }, ref) => {
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    props.onKeyDown?.(e);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(e.target.value);
  };
  return (
    <input
      className={`bg-transparent border-none flex-1 p-0 last:pr-2 first:pl-2 w-0 focus:outline-none text-grey-100 text-sm font-bold ${className}`}
      {...props}
      onChange={handleOnChange}
      onKeyDown={handleOnKeyDown}
      ref={ref}
    />
  );
});

export default Input;
