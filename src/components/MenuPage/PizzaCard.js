import React from 'react';

function PizzaCard({ name, price, image, time, persons }) {
  return (
    <div style={styles.card}>
      {/* Phần trên: ảnh pizza + overlay + icon trái tim */}
      <div style={styles.cardTop}>
        <img src={image} alt={name} style={styles.pizzaImage} />
        
        {/* Icon trái tim (favorite) góc trên bên phải */}
        <div style={styles.favoriteIcon}>♥</div>
        
        {/* Overlay màu đỏ ở nửa dưới ảnh */}
        <div style={styles.overlay}></div>
      </div>

      {/* Nút hamburger tách ra ngoài cardTop, để không bị overflow */}
      <button style={styles.hamburgerButton}>☰</button>

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
    overflow: 'hidden', // ảnh + overlay vẫn bị cắt gọn
  },
  pizzaImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  favoriteIcon: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    color: '#fff',
    fontSize: '1.2rem',
    cursor: 'pointer',
    userSelect: 'none',
  },
  // Overlay đỏ nửa dưới ảnh
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '50%',
    background: 'linear-gradient(to top, #f44336, transparent)',
    zIndex: 1,
  },
  /* Nút hamburger: đặt tuyệt đối, "neo" vào toàn bộ card */
  hamburgerButton: {
    position: 'absolute',
    top: '160px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 2,
  
    /* Kích thước tròn: chiều rộng và cao bằng nhau */
    width: '2.2rem',
    height: '2.2rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f44336',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    
    /* Canh icon chính giữa */
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
