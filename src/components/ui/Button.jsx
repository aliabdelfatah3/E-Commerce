// On login/register forms → “Submit”

// On product cards → “Add to cart”

// On checkout → “Pay Now”

// Maybe also for filters, pagination, etc.

// src/components/ui/Button.jsx
import React from "react";
import clsx from "clsx"; // يساعد في دمج الكلاسات بسهولة

/**
 * Button Component
 * Props:
 * - variant: "primary" | "secondary" | "danger" | "ghost"
 * - size: "sm" | "md" | "lg"
 * - fullWidth: boolean
 * - disabled: boolean
 * - type: "button" | "submit" | "reset"
 */
const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "btn",
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth && "w-full", // optional full width
        
      )}
    >
      {children}
    </button>
  );
};

export default Button;
