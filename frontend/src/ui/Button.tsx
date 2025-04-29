import { ReactNode, CSSProperties } from "react";
import clsx from "clsx";
import { ButtonVariant, buttonVariants } from "../constants/buttonVariants";

interface ButtonProps {
  variant?: ButtonVariant;
  children: string | ReactNode;
  icon?: ReactNode;
  /** only used for text‑only or icon‑only variants */
  color?: string;
  /** only used for "regular" variants */
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  variant = "primary",
  children,
  icon,
  color,
  width = "100%",
  height = "44px",
  onClick,
  disabled = false,
}: ButtonProps) => {
  // classify the variant
  const isTextOnly = variant === "text";
  const isIconOnly = variant === "icon";
  const isRegular = !isTextOnly && !isIconOnly;

  // base: flex + center
  const base = `
    flex
    items-center
    justify-center
    gap-2 
    cursor-pointer`;

  // only “regular” variants get rounded corners + transitions + active/focus styles
  const regularShape = isRegular
    ? "rounded-[12px] transition-colors duration-200 ease"
    : "";

  const activeFocus =
    isRegular && !disabled
      ? `
      active:ring-[2px]
      active:ring-(--btn-outer-shadow-color)
      active:ring-offset-[2px]
      active:ring-offset-(--btn-inner-shadow-color)
      focus-visible:outline-none
    `
      : "";

  const disabledClasses = disabled
    ? `
      bg-(--btn-disabled-bg)
      text-(--btn-disabled-text)
      border-none
      cursor-not-allowed
    `
    : "";

  // pull in your variant styles (hover, bg, text, border, etc.)
  const variantClasses = !disabled ? buttonVariants[variant] : "";

  // inline style overrides:
  // - color only for unstyled variants
  // - width/height only for regular variants
  const style: CSSProperties = {};
  if (isTextOnly || isIconOnly) {
    if (color) style.color = color;
    style.width = "auto";
    style.height = "auto";
  } else {
    style.width = width;
    style.height = height;
  }

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={clsx(
        base,
        regularShape,
        variantClasses,
        activeFocus,
        disabledClasses
      )}
    >
      {isIconOnly && icon}
      {isTextOnly && <span className="text-base text-nowrap">{children}</span>}
      {isRegular && (
        <>
          {icon && <span>{icon}</span>}
          <span className="text-preset-4 text-nowrap">{children}</span>
        </>
      )}
    </button>
  );
};

export default Button;
