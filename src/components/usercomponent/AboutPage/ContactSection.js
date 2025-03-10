// src/components/AboutPages/ContactSection.js
import React from 'react';

function ContactSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.subtitle}>Contact &amp; Location</h2>
      <div style={styles.contactInfo}>
        <div style={{ flex: 1 }}>
          <h3>Address</h3>
          <p>123 Pizza Street, Food City</p>
          <h3>Phone</h3>
          <p>+1 234 567 890</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <img
            src="https://via.placeholder.com/400x300?text=Map"
            alt="Map"
            style={styles.mapImg}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

const styles = {
  section: {
    marginBottom: '3rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  mapImg: {
    width: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  },
};
