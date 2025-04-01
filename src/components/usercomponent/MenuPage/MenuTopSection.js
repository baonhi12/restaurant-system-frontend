import React, { useState } from 'react';
import pizzaRoll from '../../../assets/images/pizza-roll.png';

function MenuTopSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>
          A Menu That Will Always <br />
          Capture Your Heart
        </h2>
      </div>

      <div
        style={styles.pizzaContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={pizzaRoll}
          alt="Pizza Roll"
          style={{
            ...styles.pizzaImage,
            transform: isHovered
              ? 'translateX(-50%) rotate(-360deg)'
              : 'translateX(-50%) rotate(180deg)',
          }}
        />
      </div>
    </section>
  );
}

export default MenuTopSection;

const styles = {
  section: {
    position: 'relative',
    backgroundColor: '#F5E2BA',
    textAlign: 'center',
    padding: '5rem 1rem',
    minHeight: '600px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    marginBottom: '2rem',
    lineHeight: 1.3,
  },
  pizzaContainer: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '700px',
    height: '350px',
    transform: 'translateX(-50%)',
    overflow: 'hidden',
  },
  pizzaImage: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: '700px', 
    height: '700px', 
    transform: 'translateX(-50%) rotate(180deg)',
    transition: 'transform 15s ease-in-out',
  },
};
