// src/components/MenuPage/PizzaCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PizzaCard({ id, name, price, image, time, persons, description, rating }) {
  // State lưu trạng thái favorite
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Khi click vào nút hamburger, điều hướng sang trang chi tiết kèm dữ liệu (có description)
  const handleHamburgerClick = () => {
    navigate(`/menu/${id}`, {
      state: {
        id,
        name,
        price,
        image,
        time,
        persons,
        description, // <-- Truyền sang MenuDetailPage
        rating,
      },
    });
  };

  return (
    <div style={styles.card}>
      {/* Phần trên: ảnh pizza + overlay + icon trái tim */}
      <div style={styles.cardTop}>
        <img src={image} alt={name} style={styles.pizzaImage} />

        {/* Icon trái tim (click để toggle favorite) */}
        <div
          onClick={toggleFavorite}
          style={{
            ...styles.favoriteIconBase,
            ...(isFavorite ? styles.favoriteIconActive : styles.favoriteIconDefault),
          }}
        >
          ♥
        </div>

        {/* Overlay màu đỏ nửa dưới ảnh */}
        <div style={styles.overlay}></div>
      </div>

      {/* Nút hamburger: click => sang trang chi tiết */}
      <button style={styles.hamburgerButton} onClick={handleHamburgerClick}>
        ☰
      </button>

      {/* Phần dưới: tên, giá, time, persons */}
      <div style={styles.cardBottom}>
        <h3 style={styles.productName}>{name}</h3>
        <p style={styles.productPrice}>${price}</p>

        <div style={styles.infoRow}>
          <span>{time}</span>
          <span style={styles.dot}>•</span>
          <span>{persons}</span>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;

/* -------------- Inline Styles -------------- */
const styles = {
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: '260px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  cardTop: {
    position: 'relative',
    height: '180px',
    overflow: 'hidden',
  },
  pizzaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  // ---------------- Trái tim ------------------
  favoriteIconBase: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid #fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
  },
  favoriteIconDefault: {
    color: 'transparent',
    WebkitTextStroke: '1px #fff',
  },
  favoriteIconActive: {
    color: '#fff',
    WebkitTextStroke: '0',
  },
  // -------------------------------------------
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    background: 'linear-gradient(to top, #f44336, transparent)',
    zIndex: 1,
  },
  hamburgerButton: {
    position: 'absolute',
    top: '160px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBottom: {
    backgroundColor: '#fff',
    padding: '1rem',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: '1rem',
    fontWeight: '600',
    margin: '0.3rem 0',
    color: '#333',
  },
  productPrice: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    margin: '0.3rem 0',
    color: '#f44336',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: '#666',
  },
  dot: {
    color: '#ccc',
  },
};
