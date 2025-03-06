// src/components/Footer.js
import React from 'react';

function Footer() {
  return (
    <footer style={styles.footer} id="about">
      <div style={{ marginBottom: '1rem' }}>
        <h3>Pizza Restaurant</h3>
        <p>123 Pizza Street, Food City</p>
        <p>Phone: +1 234 567 890</p>
        <p>Email: info@pizzarestaurant.com</p>
      </div>
      <div>
        © 2025 Pizza Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

const styles = {
  footer: {
    backgroundColor: '#f8f8f8',
    padding: '2rem',
    textAlign: 'center',
  },
};
