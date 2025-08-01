import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', type = 'button', ...rest }) => {
  return (
    <button type={type} className={`px-3 py-2 border rounded cursor-pointer ${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
