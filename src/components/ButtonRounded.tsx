import React, { FC } from "react";

type ButtonProps = {
  color: string;
  text: string;
  padding?: string;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
};

const ButtonRounded: FC<ButtonProps> = ({
  padding,
  color,
  text,
  onClick,
  isActive,
  disabled,
}) => {
  const buttonClass = isActive
    ? "button-rounded active-button"
    : `button-rounded button-${color}`;

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={{ padding: padding ? padding : "12px 24px" }}
    >
      {text}
    </button>
  );
};

export default ButtonRounded;
