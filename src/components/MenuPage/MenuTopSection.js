// src/components/MenuPage/MenuTopSection.js
import React from 'react';
import pizzaRoll from '../../assets/images/pizza-roll.svg';

function MenuTopSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Tiêu đề (2 dòng) */}
        <h2 style={styles.title}>
          A Menu That Will Always <br />
          Capture Your Heart
        </h2>

        {/* Đoạn mô tả */}
        <p style={styles.subtitle}>
          From cheese lovers to supreme fans, our pizzas promise
          to satisfy every craving.
        </p>

        {/* Ảnh pizza */}
        <img
          src={pizzaRoll}
          alt="Pizza Roll"
          style={styles.pizzaImage}
        />
      </div>
    </section>
  );
}

export default MenuTopSection;

/* ------------------ Inline Styles ------------------ */
const styles = {
  // Màu nền be/kem. Điều chỉnh mã màu cho giống thiết kế:
  section: {
    backgroundColor: '#F5E2BA',
    textAlign: 'center',
    padding: '4rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  // Tiêu đề 2 dòng, đậm, màu #333
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    margin: 0,
    marginBottom: '1.5rem',
    lineHeight: 1.3,
  },
  // Đoạn mô tả, canh giữa, màu xám
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.5,
  },
  // Ảnh pizza, nằm dưới đoạn mô tả
  pizzaImage: {
    maxWidth: '850px',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};
