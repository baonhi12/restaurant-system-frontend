// src/components/QrPhoneSection.js
import React from 'react';
import phoneImage from '../../../assets/images/Frame304.svg'; // Ảnh điện thoại
import Button from '../../admincomponent/Button';

function QrPhoneSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* Hộp chứa toàn bộ nội dung */}
        <div style={styles.contentBox}>

          {/* Cột trái: Text */}
          <div style={styles.leftCol}>
            <p style={styles.scanText}>SCAN QR CODE TO RESERVE A TABLE</p>
            <h2 style={styles.title}>Begin Your Pizza Daay Journey Now!</h2>
            <p style={styles.description}>
              Explore cuisine anytime, anywhere, and enjoy swift delivery of
              your food. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
            <Button style={styles.ctaButton}>Get Started</Button>
          </div>

          {/* Cột phải: Ảnh điện thoại */}
          <div style={styles.rightCol}>
            <img
              src={phoneImage}
              alt="Phone with app"
              style={styles.phoneImage}
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default QrPhoneSection;

/* ---------------- Inline Styles ---------------- */
const styles = {
  // Vùng nền bên ngoài
  section: {
    backgroundColor: '#fff',  // Hoặc màu nền trang tổng
    padding: '3rem 1rem',
  },
  // Giới hạn chiều rộng
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  // Hộp bọc toàn bộ nội dung (text + ảnh)
  contentBox: {
    backgroundColor: '#FFEFC7',  // Màu giống ảnh
    borderRadius: '30px',       // Bo góc (tuỳ chỉnh)
    padding: '1rem 3rem',
    display: 'flex',
    flexDirection: 'row',   // Ngang
    flexWrap: 'nowrap',     // Không rơi xuống hàng
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    margin: '0 1rem',      
  },

  /* Cột trái */
  leftCol: {
    flex: '1 1 60%',
    minWidth: '280px',
  },
  scanText: {
    textTransform: 'uppercase',
    fontSize: '15px',
    color: '#FF5B5B',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
  },
  title: {
    fontSize: '30px',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: 1.5,
    marginBottom: '1.5rem',
  },
  /* Cột phải */
  rightCol: {
    flex: '1 1 40%',
    minWidth: '280px',
    display: 'flex',
    justifyContent: 'center',
  },
  phoneImage: {
    maxWidth: '400px',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};
