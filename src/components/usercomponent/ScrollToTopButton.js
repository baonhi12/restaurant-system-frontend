// src/components/usercomponent/ScrollToTopButton.js
import React, { useState, useEffect } from 'react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Style nút vuông 50x50, bo góc 8px
  const buttonStyle = {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    width: '50px',
    height: '50px',
    display: isVisible ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5B5B',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',  // bo nhẹ, hoặc '0px' nếu muốn vuông hẳn
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    zIndex: 1000,
  };

  const arrowStyle = {
    fontSize: '1.5rem'
  };

  return (
    <button style={buttonStyle} onClick={scrollToTop}>
      <span style={arrowStyle}>↑</span>
    </button>
  );
}

export default ScrollToTopButton;
