// src/pages/userpage/ThankYouPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ThankYouPage() {
  const navigate = useNavigate();

  // Khi trang load, cuộn lên đầu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackToHome = () => {
    navigate('/');  // Chuyển về trang home
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Thank You!</h1>
      <p style={styles.text}>
        Thank you for reserving a table at our restaurant. We look forward to meeting and serving you soon.
      </p>
      <button style={styles.homeButton} onClick={handleBackToHome}>
        Back to Home
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: '#FFF7ED',
    padding: '2rem'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#FF5B5B'
  },
  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    maxWidth: '600px',
    lineHeight: '1.6',
  },
  homeButton: {
    marginTop: '2rem',
    padding: '1rem 2rem',
    backgroundColor: '#FF5B5B',
    width: '13rem',
    height: '3rem',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '13px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    textTransform: 'uppercase',
  }
};

export default ThankYouPage;