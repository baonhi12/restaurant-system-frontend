import React from 'react';
import logo from '../../assets/images/logo.png'; 
import footerLeft from '../../assets/images/footer-left.png';
import footerRight from '../../assets/images/footer-right.svg';
import Button from '../admincomponent/Button';

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
          <p style={{ marginBottom: '0.8rem', lineHeight: 1.4, width: '15rem'  }}>Do you have any message you would like to send to us?</p>
          <div style={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email"        
              style={styles.newsletterInput} 
            />
            <Button style={styles.newsletterButton}>SUBMIT</Button>
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
    // backgroundColor: '#fef9f2',
    position: 'relative',
    backgroundImage: `url(${footerLeft}), url(${footerRight})`,     // Chèn 2 ảnh nền ở góc trái-dưới và góc phải-trên
    backgroundPosition: 'left bottom, right top',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundSize: '300px auto, 250px auto', // Tăng kích thước ảnh nền để rõ hơn
    padding: '3rem 2rem', // Tăng padding để footer thoáng hơn
  },

  footerContent: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    maxWidth: '1200px',
    margin: '0 auto',
    gap: '1.5rem',
    fontSize: '15px',
  },

  column: {
    flex: '1 1 200px',
    minWidth: '180px',
    marginBottom: '1.5rem',
  },

  logo: {
    maxWidth: '140px',
    height: 'auto',
    marginTop: '-2.5rem',
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
    fontSize: '16px',
  },

  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    margin: 0,
  },

  listItem: {
    marginBottom: '0.5rem',
    cursor: 'pointer',
    fontSize: '15px',
    color: '#555',
  },

  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '200px',
  },

  newsletterInput: {
    padding: '0.5rem 1rem',
    fontSize: '15px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },

  newsletterButton: {
    backgroundColor: '#FF5B5B',
    color: '#fff',
  },

  footerBottom: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: '#666',
    borderTop: 'none', // Bỏ viền trên, chỉ hiển thị text
  },
};
