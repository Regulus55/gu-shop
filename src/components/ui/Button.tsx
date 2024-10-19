import React from "react";

interface ButtonProps {
  text: string;
  onClick?: (e?: any) => void;
  disabled?: boolean;
  className?: string;
  icon?: IconType;
  type?: "button" | "submit";
}
type IconType = () => JSX.Element;

const Button = ({ text, onClick, disabled, className, icon }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex max-h-[44px] items-center justify-center rounded-md transition-all ${
        className ?? ""
      }`}
      disabled={disabled}
      aria-label={text}
    >
      {icon && React.createElement(icon)}
      {text}
    </button>
  );
};

export default Button;
