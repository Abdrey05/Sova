import React from "react";
import styles from "./Button.module.css";

type Props = {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({
  variant = "primary",
  size = "medium",
  disabled = false,
  children,
  onClick = () => {},
  type = "button",
  className = "",
}: Props) {
  const buttonClasses = `button ${styles[variant]} ${styles[size]} ${className}`;
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
}
