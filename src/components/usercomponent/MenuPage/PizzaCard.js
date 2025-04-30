// src/components/usercomponent/MenuPage/PizzaCard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineReadMore } from "react-icons/md";
// Xoá import ảnh cố định (nếu không còn dùng nữa)
// import Pizza_01 from '../../../assets/images/pizza-card-1.png';
// import burger_03 from '../../../assets/images/burger-03.svg';

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
          mnuImage: image, // Truyền image sang chi tiết
          mnuDescription: description,
          rating: rating,
        },
      },
    });
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.imgContainer}>
          {/* Hiển thị ảnh từ prop `image` */}
          <img src={image} alt={name} style={styles.pizzaImage} />
        </div>
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
        <p style={styles.productDesc}>{description}</p>
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
    overflow: 'visible',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  cardTop: {
    position: 'relative',
    height: '15rem',
    overflow: 'visible',
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  pizzaImage: {
    position: 'absolute',
    zIndex: 2,
    width: '100%',
    height: '14rem',
    objectFit: 'contain', // Tuỳ chỉnh hiển thị ảnh
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
    // background: 'linear-gradient(to top, #FF5B5B, transparent)',
    zIndex: 1,
  },
  hamburgerButton: {
    position: 'absolute',
    top: '14rem',
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
    // backgroundColor: '#fff',
    background: 'linear-gradient(to top, #FF5B5B, transparent)',
    padding: '1rem',
    minHeight: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px',
  },
  productName: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '0.3rem 0',
    color: '#303030',
  },
  productPrice: {
    fontSize: '17px',
    fontWeight: 'bold',
    margin: '0.3rem 0',
    color: '#fff',
  },
  productDesc: {
    fontSize: '15px',
    color: '#efefef',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
};
