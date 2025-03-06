import React from 'react';
import '../assets/css/Button.css';


const Button = ({ type = 'button', onClick, children, className = '' }) => {
    return (
      <button type={type} onClick={onClick} className={`custom-button ${className}`}>
        {children}
      </button>
    );
  };
  
export default Button;