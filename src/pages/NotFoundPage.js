// src/pages/NotFoundPage.js
import React from 'react';

function NotFoundPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.errorCode}>404</h1>
      <p>Whoops... Page not Found!</p>
      <a href="/" style={styles.link}>Back to Home</a>
    </div>
  );
}

export default NotFoundPage;

const styles = {
  container: {
    textAlign: 'center',
    padding: '4rem 1rem',
  },
  errorCode: {
    fontSize: '5rem',
    marginBottom: '1rem',
  },
  link: {
    color: '#ff6600',
    textDecoration: 'none',
    fontWeight: '600',
  },
};
