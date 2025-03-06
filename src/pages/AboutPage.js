// src/pages/AboutPage.js
import React from 'react';

function AboutPage() {
  return (
    <div style={styles.container}>
      <section style={styles.heroSection}>
        <h1 style={styles.title}>Let's delve deeper into understanding Pizzeria</h1>
        <img
          src="https://via.placeholder.com/800x300?text=About+Hero"
          alt="About Hero"
          style={{ width: '100%', borderRadius: '8px', marginTop: '1rem' }}
        />
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>About Us</h2>
        <p>
          We strive to bring you the finest pizza experience with fresh ingredients
          and authentic recipes from our skilled chefs.
        </p>
        <div style={styles.imageWrapper}>
          <img
            src="https://via.placeholder.com/400x250?text=Our+Pizza+Dough"
            alt="Pizza Dough"
            style={styles.img}
          />
          <img
            src="https://via.placeholder.com/400x250?text=Chef+In+Action"
            alt="Chef in Action"
            style={styles.img}
          />
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Why choose Pizzeria?</h2>
        <ul style={styles.benefits}>
          <li>Handmade dough with secret recipes</li>
          <li>Fresh toppings from local farms</li>
          <li>Professional, friendly staff</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subtitle}>Contact & Location</h2>
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
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  section: {
    marginBottom: '3rem',
  },
  imageWrapper: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  img: {
    width: '100%',
    borderRadius: '8px',
  },
  benefits: {
    listStyle: 'disc inside',
    margin: '0 auto',
    maxWidth: '600px',
    textAlign: 'left',
    lineHeight: '1.5',
  },
  contactInfo: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
};
