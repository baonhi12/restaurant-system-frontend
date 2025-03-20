// src/components/usercomponent/MenuPage/PizzaCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineReadMore } from "react-icons/md";

function PizzaCard({ id, name, price, image, time, persons, description, rating }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleHamburgerClick = () => {
    navigate(`/menu/${id}`, {
      state: {
        mainPizza: {
          mnuId: id,
          mnuName: name,
          mnuPrice: price,
          mnuImage: image,
          mnuDescription: description,
          rating: rating,
        },
      },
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <img src={image} alt={name} style={styles.pizzaImage} />
        <div
          onClick={toggleFavorite}
          style={{
            ...styles.favoriteIconBase,
            ...(isFavorite ? styles.favoriteIconActive : styles.favoriteIconDefault),
          }}
        >
          ♥
        </div>
        <div style={styles.overlay}></div>
      </div>

      <button style={styles.hamburgerButton} onClick={handleHamburgerClick}>
        <MdOutlineReadMore />
      </button>

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
    backgroundColor: '#FF5B5B',
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
    fontSize: '16px',
    fontWeight: '600',
    margin: '0.3rem 0',
    color: '#333',
  },
  productPrice: {
    fontSize: '17px',
    fontWeight: 'bold',
    margin: '0.3rem 0',
    color: '#FF5B5B',
  },
  infoRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '15px',
    color: '#666',
  },
  dot: {
    color: '#ccc',
  },
};
