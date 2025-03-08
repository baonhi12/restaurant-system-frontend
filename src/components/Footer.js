import React from 'react';
import logo from '../assets/images/logo.png'; 
import footerLeft from '../assets/images/footer-left.png';
import footerRight from '../assets/images/footer-right.svg';

function Footer() {
  return (
    <footer style={styles.footer}>
      {/* Khu vực chứa các cột chính */}
      <div style={styles.footerContent}>
        
        {/* Cột 1: Logo/Tên nhà hàng + giờ mở cửa */}
        <div style={styles.column}>
          <div style={styles.logoContainer}>
            <img src={logo} alt="Pizza Diary" style={styles.logo} />
          </div>
          <p style={styles.openingHours}>Tuesday - Saturday 10:00am - 20:00pm</p>
          <p style={styles.closedDay}>Closed on Sunday</p>
        </div>
        
        {/* Cột 2: About Us */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>ABOUT US</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>Menu</li>
            <li style={styles.listItem}>Special Dish</li>
            <li style={styles.listItem}>Pizza station</li>
            <li style={styles.listItem}>Contact</li>
          </ul>
        </div>

        {/* Cột 3: Menu */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>MENU</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}>Burgers</li>
            <li style={styles.listItem}>Pizza</li>
            <li style={styles.listItem}>Cakes</li>
            <li style={styles.listItem}>Desserts</li>
          </ul>
        </div>

        {/* Cột 4: Newsletter */}
        <div style={styles.column}>
          <h4 style={styles.columnTitle}>NEWSLETTER</h4>
          <p style={{ marginBottom: '0.5rem' }}>Chủ đề, khuyến mãi, v.v.</p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              style={styles.newsletterInput} 
            />
            <button style={styles.newsletterButton}>SUBMIT</button>
          </div>
        </div>
      </div>

      {/* Dòng bản quyền */}
      <div style={styles.footerBottom}>
        © 2025 Pizza Restaurant. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

const styles = {
  footer: {
    // Màu nền kem nhạt
    backgroundColor: '#fef9f2',
    position: 'relative',
    // Chèn 2 ảnh nền ở góc trái-dưới và góc phải-trên
    backgroundImage: `url(${footerLeft}), url(${footerRight})`,
    backgroundPosition: 'left bottom, right top',
    backgroundRepeat: 'no-repeat, no-repeat',
    // Tăng kích thước ảnh nền để rõ hơn
    backgroundSize: '300px auto, 250px auto',
    // Tăng padding để footer thoáng hơn
    padding: '3rem 2rem',
  },

  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1.5rem',
  },

  column: {
    flex: '1 1 200px',
    minWidth: '180px',
    marginBottom: '1.5rem',
  },

  logoContainer: {
    marginBottom: '1rem',
  },

  logo: {
    // Logo to hơn
    maxWidth: '140px',
    height: 'auto',
  },

  openingHours: {
    margin: '0 0 0.3rem 0',
    fontWeight: 'bold',
    color: '#444',
  },

  closedDay: {
    margin: 0,
    color: 'red',
    fontWeight: 'bold',
  },

  columnTitle: {
    marginBottom: '0.75rem',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#333',
  },

  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0,
  },

  listItem: {
    marginBottom: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.95rem',
    color: '#555',
  },

  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    maxWidth: '200px',
  },

  newsletterInput: {
    padding: '0.5rem',
    fontSize: '0.95rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },

  newsletterButton: {
    padding: '0.5rem',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
  },

  footerBottom: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#666',
    // Bỏ viền trên, chỉ hiển thị text
    borderTop: 'none',
  },
};
