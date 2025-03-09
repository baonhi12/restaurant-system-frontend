// src/components/AboutPages/WhyChooseSection.js
import React from 'react';

function WhyChooseSection() {
  return (
    <section style={styles.section}>
      <h2 style={styles.subtitle}>Why choose Pizzeria?</h2>
      <ul style={styles.benefits}>
        <li>Handmade dough with secret recipes</li>
        <li>Fresh toppings from local farms</li>
        <li>Professional, friendly staff</li>
      </ul>
    </section>
  );
}

export default WhyChooseSection;

const styles = {
  section: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  benefits: {
    listStyle: 'disc inside',
    margin: '0 auto',
    maxWidth: '600px',
    textAlign: 'left',
    lineHeight: '1.5',
  },
};
