import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string; // Tekst do wyświetlenia na przycisku
  onClick: () => void; // Funkcja do wykonania po kliknięciu
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className, ...props }) => {
  const buttonClass = className ? `btn ${className}` : 'btn';

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;
