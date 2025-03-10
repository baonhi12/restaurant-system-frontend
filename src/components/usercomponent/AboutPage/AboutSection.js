// src/components/AboutPages/AboutSection.js
import React from 'react';
import about1 from '../../../assets/images/about1.svg';
import about2 from '../../../assets/images/about2.svg';
import about3 from '../../../assets/images/about3.svg';
import about4 from '../../../assets/images/about4.svg';

function AboutSection() {
  return (
    <section style={styles.section}>
      {/* Tiêu đề chính & mô tả ngắn */}
      <h2 style={styles.title}>ABOUT US</h2>
      <p style={styles.description}>
        Pizza Station is a comfortable and friendly place, offering a wide selection of 
        delicious pizzas served with a variety of fresh ingredients. Each slice is carefully 
        prepared to ensure you have a satisfying dining experience. We pride ourselves on 
        delivering top-quality pizzas that bring warmth and joy to every table.
      </p>

      {/* Vùng About 1: Ảnh to, giữ nguyên */}
      <div style={styles.blockWide}>
        <img src={about1} alt="Pizza Day" style={styles.wideImg} />
      </div>

      {/* About 2: Ảnh bên phải, text bên trái */}
      <div style={styles.flexRow}>
        <div style={styles.textWrapper}>
          <h3 style={styles.blockTitle}>We Invite You to Visit Our Pizza Daay</h3>
          <p style={styles.blockText}>
            Every pizza is made with top-quality ingredients, ensuring a consistently 
            delicious taste. We follow strict standards to guarantee hygiene and safety 
            in every bite. From our classic Margherita to our signature gourmet pizzas, 
            we use only the freshest produce, so every mouthful bursts with flavor. 
            Experience a unique dining atmosphere where friends and family can share 
            moments together.
          </p>
        </div>
        <img src={about2} alt="Professional Chefs" style={styles.infoImg} />
      </div>

      {/* About 3: Ảnh bên trái, text bên phải */}
      <div style={styles.flexRow}>
        <img src={about3} alt="Innovation" style={styles.infoImg} />
        <div style={styles.textWrapper}>
            <h3 style={styles.blockTitle}>Standard Quality</h3>
            <p style={styles.blockText}>
              Learn from our talented chefs, who are eager to share their secrets 
              and cooking techniques. Impress your friends and family with pizzas 
              made at home just like in our restaurant! We believe in constant 
              innovation, using creative topping combinations to keep your taste 
              buds excited. Our team is committed to ensuring that each pizza 
              delivers a truly memorable flavor.
            </p>
        </div>
      </div>

      {/* About 4: Ảnh bên phải, text bên trái */}
      <div style={styles.flexRow}>
        <div style={styles.textWrapper}>
          <h3 style={styles.blockTitle}>Use the Tips &amp; Recipes from Professional Chefs</h3>
          <p style={styles.blockText}>
            Every pizza is made with top-quality ingredients, ensuring a consistently 
            delicious taste. We follow strict standards to guarantee hygiene and safety 
            in every bite. Our expert chefs have spent years perfecting techniques that 
            bring out the best in every ingredient, and now you can apply these tips at 
            home. Whether you’re hosting a party or enjoying a quiet evening, our recipes 
            ensure every pizza you create will taste just like it came out of our oven.
          </p>
        </div>
        <img src={about4} alt="Professional Chefs" style={styles.infoImg} />
      </div>
    </section>
  );
}

export default AboutSection;

const styles = {
  section: {
    marginBottom: '3rem',
    backgroundColor: '#fff',
    padding: '2rem 1rem',  // Thêm khoảng trống xung quanh
  },
  title: {
    textAlign: 'center',
    fontSize: '2.4rem',    // Tăng cỡ chữ tiêu đề lớn
    marginBottom: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  description: {
    maxWidth: '700px',
    margin: '0 auto 2.5rem',
    lineHeight: 1.8,
    textAlign: 'center',
    color: '#555',
    fontSize: '1.3rem',    // Tăng cỡ chữ cho đoạn mô tả
  },

  /* About 1 (wide image) */
  blockWide: {
    marginBottom: '3rem',
    textAlign: 'center',
  },
  wideImg: {
    width: '100%',
    borderRadius: '16px',
    objectFit: 'cover',
    marginBottom: '1rem',
  },

  /* About 2,3,4: Ảnh + text side by side */
  flexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    marginBottom: '3rem',
    flexWrap: 'wrap',
  },
  textWrapper: {
    flex: 1,
  },
  blockTitle: {
    fontSize: '1.8rem',   // Tăng cỡ chữ tiêu đề cho các khối
    marginBottom: '1rem',
    fontWeight: '600',
  },
  blockText: {
    lineHeight: 1.8,
    color: '#666',
    fontSize: '1.2rem',   // Tăng cỡ chữ đoạn text
  },
  infoImg: {
    width: '450px',       // Tăng kích thước ảnh
    maxWidth: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  },
};
