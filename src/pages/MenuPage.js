// src/pages/MenuPage.js
import React from 'react';

function MenuPage() {
  // Dữ liệu tạm
  const pizzas = [
    { id: 1, name: 'Cheese Overload', price: '$8', img: 'https://via.placeholder.com/200?text=Cheese+Pizza' },
    { id: 2, name: 'Pepperoni Deluxe', price: '$9', img: 'https://via.placeholder.com/200?text=Pepperoni' },
    { id: 3, name: 'Hawaiian Special', price: '$10', img: 'https://via.placeholder.com/200?text=Hawaiian' },
    // ... thêm nhiều nếu muốn
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Menu</h1>
      <p>Choose your best flavors!</p>

      <div style={styles.menuGrid}>
        {pizzas.map(pizza => (
          <div key={pizza.id} style={styles.card}>
            <img
              src={pizza.img}
              alt={pizza.name}
              style={{ width: '100%', borderRadius: '8px' }}
            />
            <h3>{pizza.name}</h3>
            <p style={styles.price}>{pizza.price}</p>
            <button style={styles.button}>View Detail</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  menuGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))',
    gap: '1rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1rem',
  },
  price: {
    color: '#ff6600',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ff6600',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
