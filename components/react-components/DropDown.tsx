import * as Radix from "@radix-ui/react-dropdown-menu";
import React, { ComponentProps } from "react";

export const Dropdown = Radix.Root;
export const DropdownTrigger = Radix.Trigger;

export const DropdownContent = ({
  className = "",
  ...props
}: ComponentProps<typeof Radix.Content>) => (
  <Radix.Content
    className={` min-w-[130px] bg-grey-700 rounded shadow-lg ${className}`}
    {...props}
  />
);

export const DropdownItem = ({
  className = "",
  ...props
}: ComponentProps<typeof Radix.Item>) => (
  <Radix.Item
    className={`px-2 py-1 cursor-default focus:bg-grey-600 focus:text-grey-200 ${className}`}
    {...props}
  />
);

export const DropdownArrow = ({
  className = "",
  ...props
}: ComponentProps<typeof Radix.Arrow>) => (
  <Radix.Arrow
    className={`text-grey-700 fill-current ${className}`}
    {...props}
  />
);
