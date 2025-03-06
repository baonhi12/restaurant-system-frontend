// src/components/MenuSection.js
import React from 'react';
import pizza01 from '../assets/images/Pizza-01.svg';
import pizza02 from '../assets/images/Pizza-02.svg';
import pizza03 from '../assets/images/Pizza-03.svg';

// Import khay
import trayIcon from '../assets/images/Tray.svg'; // Đổi thành tên file khay thực tế

function MenuSection() {
  // Dữ liệu pizza
  const pizzas = [
    {
      id: 1,
      name: 'Pepperoni',
      price: '$12.99',
      img: pizza01,
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      name: 'Veggie Pizza',
      price: '$11.99',
      img: pizza02,
      description: 'Sed vitae metus, mauris id vestibulum.',
    },
    {
      id: 3,
      name: 'Margherita',
      price: '$10.99',
      img: pizza03,
      description: 'Fusce ultrices, urna at scelerisque vestibulum.',
    },
  ];

  return (
    <section style={styles.section} id="menu">
      <div style={styles.container}>

        {/* CỘT TRÁI: Tiêu đề + mô tả */}
        <div style={styles.leftSide}>
          <h2 style={styles.title}>PIZZA WITH GREAT TASTE</h2>
          <p style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed vitae metus, mauris id vestibulum.
          </p>
        </div>

        {/* CỘT PHẢI: Ba thẻ pizza */}
        <div style={styles.rightSide}>
          {pizzas.map((pizza) => (
            <div key={pizza.id} style={styles.card}>
              {/* Gói khay + pizza chung một wrapper */}
              <div style={styles.pizzaWrapper}>
                <img
                  src={trayIcon}
                  alt="Tray"
                  style={styles.trayImage}
                />
                <img
                  src={pizza.img}
                  alt={pizza.name}
                  style={styles.pizzaImage}
                />
              </div>

              <h3 style={styles.cardName}>{pizza.name}</h3>
              <p style={styles.cardDesc}>{pizza.description}</p>
              <p style={styles.cardPrice}>{pizza.price}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default MenuSection;

/* -------------- Inline Styles -------------- */
const styles = {
  section: {
    backgroundColor: '#fff',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    flexWrap: 'wrap', // Cho phép xuống hàng nếu màn hình nhỏ
  },
  /* ========== CỘT TRÁI ========== */
  leftSide: {
    flex: '0 0 30%', // Chiếm 30% bề ngang
    minWidth: '250px',
  },
  title: {
    fontSize: '2rem',
    color: '#B32E2E',
    marginBottom: '1rem',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: 1.5,
  },
  /* ========== CỘT PHẢI ========== */
  rightSide: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap', // Để 3 thẻ pizza xuống hàng nếu màn hình nhỏ
  },
  card: {
    backgroundColor: '#fff',
    textAlign: 'center',
    width: '200px',
  },

  /* ========== Khay + Pizza ========== */
  pizzaWrapper: {
    position: 'relative',
    width: '150px',    // Kích thước khung chung
    height: '150px',
    margin: '0 auto',
    marginBottom: '1rem',
  },
  trayImage: {
    position: 'absolute',
    top: 0,
    left: 44,
    width: '150px',
    height: '230px',
    objectFit: 'contain',
    zIndex: 0,
  },
  pizzaImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '150px',
    height: '150px',
    objectFit: 'contain',
    zIndex: 1,
  },

  cardName: {
    fontSize: '1.2rem',
    color: '#B32E2E',
    margin: '0.5rem 0 0.25rem 0',
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#666',
    margin: 0,
    marginBottom: '0.5rem',
    lineHeight: 1.4,
  },
  cardPrice: {
    fontSize: '1rem',
    color: '#f06e00',
    fontWeight: 'bold',
    margin: 0,
  },
};
