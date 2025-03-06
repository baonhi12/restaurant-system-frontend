// src/pages/MenuDetailPage.js
import React from 'react';

function MenuDetailPage() {
  // Dữ liệu tạm. Thực tế bạn có thể lấy id từ URL (React Router) rồi fetch chi tiết.
  const pizza = {
    id: 99,
    name: 'Cheese Overload',
    price: '$8',
    description: 'A pizza loaded with multiple layers of cheese for true cheese lovers.',
    img: 'https://via.placeholder.com/400?text=Cheese+Overload'
  };

  const relatedPizzas = [
    { id: 1, name: 'Pepperoni Deluxe', price: '$9', img: 'https://via.placeholder.com/100?text=Pepperoni' },
    { id: 2, name: 'Hawaiian Special', price: '$10', img: 'https://via.placeholder.com/100?text=Hawaiian' },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{pizza.name}</h1>
      <div style={styles.detailWrapper}>
        <div style={styles.imgWrapper}>
          <img
            src={pizza.img}
            alt={pizza.name}
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>
        <div style={styles.infoWrapper}>
          <h2>{pizza.price}</h2>
          <p>{pizza.description}</p>
          <button style={styles.button}>Add to Cart</button>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      <div style={styles.relatedSection}>
        <h3>Related Products</h3>
        <div style={styles.relatedGrid}>
          {relatedPizzas.map((rp) => (
            <div key={rp.id} style={styles.card}>
              <img src={rp.img} alt={rp.name} style={{ width: '60px' }} />
              <h4>{rp.name}</h4>
              <p style={{ color: '#ff6600', fontWeight: 'bold' }}>{rp.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuDetailPage;

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  detailWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  imgWrapper: {
    flex: 1,
    minWidth: '300px',
  },
  infoWrapper: {
    flex: 1,
    minWidth: '300px',
  },
  button: {
    backgroundColor: '#ff6600',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  relatedSection: {
    marginTop: '3rem',
  },
  relatedGrid: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1rem',
    textAlign: 'center',
  },
};
