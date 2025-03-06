import React from 'react';
import pizzaWithTray from '../assets/images/pizza-with-tray.svg';
import avt from '../assets/images/Ellipse 9.svg';

function Testimonials() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* Bên trái */}
        <div style={styles.leftSide}>
          <p style={styles.smallHeading}>CUSTOMER TESTIMONIALS</p>
          <h2 style={styles.mainHeading}>What Customers Have to Say About Us</h2>
          
          <p style={styles.quote}>
            “Fusce viverrra, metus sed fringilla congue, eros erat facilisis nulla, 
            nec placerat magna sem nec ex. Nam quis ex nec orci maximus pharetra. 
            Pellentesque vulputate massa. Best buy ever.”
          </p>

          <div style={styles.authorRow}>
            <img src={avt} alt="Author Avatar" style={styles.avatar} />
            <div style={styles.authorInfo}>
              <h4 style={styles.authorName}>Dorothy Andrews</h4>
              <p style={styles.authorRole}>Chef at Pizzarette</p>
              <p style={styles.stars}>⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>

        {/* Bên phải */}
        <div style={styles.rightSide}>
          <img
            src={pizzaWithTray}
            alt="Pizza with tray"
            style={styles.pizzaImage}
          />
        </div>

      </div>
    </section>
  );
}

export default Testimonials;

/* ---------------- Inline Styles ---------------- */
const styles = {
  section: {
    backgroundColor: '#f44336', // Màu đỏ
    color: '#fff',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1400px',    // Tăng chiều rộng nếu cần
    margin: '0 auto',
    display: 'flex',
    // KHÔNG dùng wrap, để 2 div cố định cạnh nhau
    flexWrap: 'nowrap',
    // Canh theo chiều dọc: top (flex-start) hoặc center
    alignItems: 'flex-start',
    // Khoảng cách ngang
    justifyContent: 'space-between',
    gap: '2rem',
  },
  
  /* ========== BÊN TRÁI ========== */
  leftSide: {
    // Chia 50% - 50% hoặc tuỳ ý
    flex: '0 0 50%',
    minWidth: '300px',
  },
  smallHeading: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontSize: '0.8rem',
    opacity: 0.8,
    marginBottom: '1rem',
  },
  mainHeading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    fontWeight: 'bold',
  },
  quote: {
    fontStyle: 'italic',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
    maxWidth: '600px',
  },

  authorRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  authorInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.2rem',
  },
  authorName: {
    fontWeight: 'bold',
    marginBottom: '0.25rem',
  },
  authorRole: {
    margin: 0,
    opacity: 0.9,
  },
  stars: {
    fontSize: '1.2rem',
    margin: 0,
  },

  /* ========== BÊN PHẢI ========== */
  rightSide: {
    flex: '0 0 50%',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  pizzaImage: {
    width: '400px',
    maxWidth: '100%',
    objectFit: 'contain',
  },
};
