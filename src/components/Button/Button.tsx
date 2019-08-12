import React, { ReactNode } from 'react';

interface IButtonProps {
  disabled?: boolean;
  children?: ReactNode | string;
  name?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<IButtonProps> = ({
  children,
  disabled = false,
  name,
  onClick,
  type = 'button',
}) => (
  <button
    className="bg-moon-gray ph3 pv2 dim fw4 f3 dark-gray pointer br2 flex items-center center"
    disabled={disabled}
    name={name}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
