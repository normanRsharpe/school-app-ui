import React, { ReactNode } from 'react';

interface IButtonProps {
  disabled?: boolean;
  children?: ReactNode | string;
  name?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  style?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  name,
  onClick,
  type = 'button',
  style,
}) => (
  <button
    className={`${style? style : "bg-moon-gray"} dim ph3 pv2 fw4 f3 dark-gray br2 flex items-center center`}
    disabled={disabled}
    name={name}
    onClick={onClick}
    type={type}
    style={{outline: 0 }}
  >
    {children}
  </button>
);

export default Button;
