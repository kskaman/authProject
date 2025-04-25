import { ReactNode } from "react";
import clsx from "clsx";

import InfoIcon from "../assets/Icons/InfoIcon";

export interface TextInputProps {
  type?: "text" | "password" | "email" | "number";
  /** onChange */
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** main label text */
  label?: string;
  /** sub-label text */
  subLabel?: string | ReactNode;
  /** default value */
  name?: string;
  /* value for controlled input */
  value?: string;
  /** input placeholder */
  placeholder?: string;
  /** optional icon at start */
  startIcon?: ReactNode;
  /** optional icon button at end */
  endIcon?: ReactNode;
  /** disable the input */
  disabled?: boolean;
  /** error object */
  error?: { message?: string };
  /** informational text (shown when no error) */
  infoText?: string;
}

const TextInput = ({
  type = "text",
  onChange,
  label,
  subLabel,
  name,
  value,
  placeholder = "",
  startIcon,
  endIcon,
  error,
  infoText,
  disabled = false,
}: TextInputProps) => {
  const hasError = Boolean(error?.message);
  const borderColorClass = hasError
    ? "border border-(--warning-color)"
    : "border border-(--input-field-border)";

  // choose the message to show
  const message = hasError ? error!.message : infoText ? infoText : "";

  return (
    <div className="w-full flex flex-col gap-[2px]">
      <div className="mb-[2px] flex justify-between items-center">
        {label && (
          <span className="text-preset-4 text-(--input-field-label-color)">
            {label}
          </span>
        )}
        {subLabel && (
          <span className="text-preset-7 text-(--input-field-subLabel-color)">
            {subLabel}
          </span>
        )}
      </div>

      <div
        className={clsx(
          "flex items-center rounded-[12px] h-[44px]",
          disabled
            ? "bg-(--input-field-disabled-bg)"
            : "hover:bg-(--input-field-hover-bg)",
          borderColorClass,
          "active:ring-[2px] active:ring-(--btn-outer-shadow-color) active:ring-offset-[2px] active:ring-offset-(--btn-inner-shadow-color)"
        )}
      >
        {startIcon && <span className="ml-3 mr-2">{startIcon}</span>}

        <input
          type={type}
          name={name}
          value={value}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          className="
            flex-1 
            bg-transparent 
            outline-none 
            h-full 
            px-[8px] 
            text-preset-5"
        />

        {endIcon && (
          <span
            className={clsx(
              "mr-4 ml-2 flex align-center",
              disabled && "cursor-not-allowed"
            )}
          >
            <button type="button" disabled={disabled}>
              {endIcon}
            </button>
          </span>
        )}
      </div>

      <span
        className="flex gap-1 items-start
       min-h-5 mb-1"
      >
        {message && (
          <>
            <InfoIcon
              color={
                hasError
                  ? "var(--warning-color)"
                  : "var(--input-field-info-text)"
              }
            />
            <p
              className={clsx(
                hasError
                  ? "text-(--warning-color)"
                  : "text-(--input-field-info-text)",
                "text-preset-7"
              )}
            >
              {message}
            </p>
          </>
        )}
      </span>
    </div>
  );
};

export default TextInput;
