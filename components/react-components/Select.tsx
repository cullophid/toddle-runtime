import React from "react";
import {
  createContext,
  Dispatch,
  memo,
  RefObject,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import { HTMLAttributes, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

type SelectState = {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  selectId: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  buttonRef: RefObject<HTMLButtonElement>;
};

const SelectContext = createContext<SelectState>(null as any);

type SelectProps = HTMLAttributes<HTMLDivElement>;
export const Select = memo(
  ({ children, className = "", ...rest }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const selectId = useMemo(uuid, []);
    const searchTimer = useRef<any>(undefined);

    useEffect(() => {
      clearTimeout(searchTimer.current);
      searchTimer.current = setTimeout(() => setSearch(""), 500);
      if (search !== "") {
        const options = Array.from(
          ref.current?.querySelectorAll("[role=option]") ?? []
        );
        const option = options.find((el) =>
          el.textContent?.includes(search)
        ) as HTMLElement;
        option?.focus();
      }
    }, [search]);

    useEffect(() => {
      const onClickOutside = () => {
        setIsOpen(false);
      };
      document.addEventListener("click", onClickOutside);
      return () => document.removeEventListener("click", onClickOutside);
    }, []);

    return (
      <SelectContext.Provider
        value={{ isOpen, selectId, setIsOpen, search, setSearch, buttonRef }}
      >
        <div
          className={`relative flex-1 ${className}`}
          {...rest}
          ref={ref}
          onClick={(e) => {
            rest.onClick?.(e);
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </SelectContext.Provider>
    );
  }
);
export const SelectTrigger = ({
  className = "",
  onClick,
  onKeyDown,
  children = "Select Option",
  ...props
}: HTMLAttributes<HTMLButtonElement>) => {
  const { setIsOpen, selectId, buttonRef } = useContext(SelectContext);

  return (
    <button
      ref={buttonRef}
      className={`border-none bg-transparent w-full px-2 text-left text-grey-100 ${className}`}
      aria-controls={selectId}
      {...props}
      onClick={(e) => {
        onClick?.(e);
        if (e.isDefaultPrevented() === false) {
          setIsOpen(true);
        }
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.isDefaultPrevented() === false) {
          if (e.key === " " || e.key === "Enter") {
            setIsOpen(true);
          }
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
export const SelectList = ({
  className = "",
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const { isOpen } = useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        (ref.current?.firstChild as HTMLElement)?.focus?.();
      }, 100);
    }
  }, [isOpen]);
  return isOpen ? (
    <div
      ref={ref}
      className={`bg-grey-700 rounded absolute z-50 top-0 left-0 min-w-full shadow-lg max-h-72 overflow-y-auto border border-primary-300 ${className}`}
      {...props}
    />
  ) : null;
};

type OptionProps = HTMLAttributes<HTMLDivElement> & {
  onSelect: () => void;
};

export const SelectOption = ({
  onSelect,
  className = "",
  onClick,
  onMouseOver,
  onKeyDown,
  ...rest
}: OptionProps) => {
  const { setIsOpen, setSearch, buttonRef } = useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      role="option"
      tabIndex={-1}
      className={`p-2 text-grey-200 ${className} focus:bg-grey-800`}
      ref={ref}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.isDefaultPrevented() === false) {
          onSelect();
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onMouseOver={(e) => {
        onMouseOver?.(e);
        if (e.isDefaultPrevented() === false) {
          ref.current?.focus();
        }
      }}
      onKeyDown={(e) => {
        onKeyDown?.(e);
        if (e.isDefaultPrevented()) {
          return;
        }
        e.stopPropagation();
        e.preventDefault();
        switch (e.key) {
          case " ":
          case "Enter":
            onSelect();
            setIsOpen(false);
            buttonRef.current?.focus();
            break;
          case "Escape":
            setIsOpen(false);
            buttonRef.current?.focus();
            break;
          case "ArrowDown":
            (ref.current?.nextElementSibling as HTMLElement)?.focus?.();
            break;
          case "ArrowUp":
            (ref.current?.previousElementSibling as HTMLElement)?.focus?.();
            break;
          case "Home":
            (ref.current?.parentElement?.firstChild as HTMLElement)?.focus?.();
            break;
          case "End":
            (ref.current?.parentElement?.lastChild as HTMLElement)?.focus?.();
            break;
          default:
            setSearch((search) => search + e.key);
        }
      }}
    />
  );
};
