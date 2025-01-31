import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  overrideStyles?: boolean; // Czy nadpisywać domyślne style
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className, 
  overrideStyles = false, 
  ...props 
}) => {
  // Klasa końcowa zależna od `overrideStyles`
  const buttonClass = overrideStyles 
    ? className || '' // Używa wyłącznie dostarczonych stylów
    : `btn btn-primary btn-lg ${className || ''}`; // Dodaje dostarczone style do domyślnych

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
