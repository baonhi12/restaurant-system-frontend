// src/pages/NotFoundPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');  // Chuyển về trang home
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <p>Whoops... Page not Found!</p>
      <button style={styles.link} onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
}

export default NotFoundPage;

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem 1rem',
    backgroundColor: '#F3F2F7',
  },
  errorCode: {
    fontSize: '5rem',
    marginBottom: '1rem',
  },
  link: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    backgroundColor: '#FF5B5B',
    width: '11rem',
    height: '3rem',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '13px',
    cursor: 'pointer',
    fontSize: '15px',
  },
};
