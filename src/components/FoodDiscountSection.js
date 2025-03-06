// src/components/FoodPromotionSection.js
import React from 'react';

// Ảnh topBlock
import container1 from '../assets/images/Container1.svg';
import container2 from '../assets/images/Container2.svg';
import container3 from '../assets/images/Container3.svg';
import circleText from '../assets/images/circle-text.svg';

// Ảnh bottomBlock
import food1 from '../assets/images/food1.svg';
import discount20 from '../assets/images/discount20.svg';

function FoodPromotionSection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* ========== KHỐI TRÊN (TopBlock) ========== */}
        <div style={styles.topBlock}>
          {/* BÊN TRÁI: container1 */}
          <div style={styles.leftSide}>
            <img
              src={container1}
              alt="Container 1"
              style={styles.containerLeft}
            />
          </div>

          {/* Ở GIỮA: Text */}
          <div style={styles.centerCol}>
            <p style={styles.smallTitle}>WELCOME TO PIZZA DAAY</p>
            <h2 style={styles.mainTitle}>Feel The Taste of Foods</h2>
            <p style={styles.topDescription}>
              Nisi quam vestibulum eu quam nec odio elementum. Curabitur in risus malesuada purus.
              Etiam nec metus at mi.
            </p>
            <p style={styles.schedule}>Tuesday - Saturday 12:00pm - 23:00pm</p>
            <button style={styles.bookButton}>BOOK NOW</button>
          </div>

          {/* BÊN PHẢI: container2 + (circleText + container3) */}
          <div style={styles.rightSide}>
            <img
              src={container2}
              alt="Container 2"
              style={styles.topRightImage}
            />
            <div style={styles.container3Wrapper}>
              <img
                src={circleText}
                alt="Circle Text"
                style={styles.circleTextImage}
              />
              <img
                src={container3}
                alt="Container 3"
                style={styles.container3Image}
              />
            </div>
          </div>
        </div>

        {/* ========== KHỐI DƯỚI (bottomBlock) ========== */}
        <div style={styles.bottomBlock}>
          
          {/* CỘT TRÁI: Tiêu đề */}
          <div style={styles.leftSideBottom}>
            <h2 style={styles.bottomTitle}>
              Good Food <br /> PIZZA DAAY <br /> Restaurant
            </h2>
          </div>

          {/* CỘT GIỮA: food1 + discount20 */}
          <div style={styles.centerSideBottom}>
            <div style={styles.foodWrapper}>
              <img src={food1} alt="Food 1" style={styles.foodImage} />
              <img
                src={discount20}
                alt="Discount 20%"
                style={styles.discountImage}
              />
            </div>
          </div>

          {/* CỘT PHẢI: bullet list */}
          <div style={styles.rightSideBottom}>
            <ul style={styles.featureList}>
              <li>Quality foods natural gradient</li>
              <li>Award winning restaurant</li>
              <li>Healthy Food</li>
              <li>Individually styled bedrooms</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}

export default FoodPromotionSection;

/* ---------------- Inline Styles ---------------- */
const styles = {
  section: {
    backgroundColor: '#faf9f4',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
  },

  /* ========== KHỐI TRÊN (TopBlock) ========== */
  topBlock: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '2rem',
    textAlign: 'left',
    position: 'relative',
    padding: '2rem 1rem',
  },
  leftSide: {
    flex: '0 0 auto',
  },
  containerLeft: {
    maxWidth: '300px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  centerCol: {
    flex: '1 1 auto',
    textAlign: 'center',
    maxWidth: '550px',
    width: '550px',
    margin: '0 auto',
  },
  smallTitle: {
    fontSize: '0.9rem',
    color: '#f06e00',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginBottom: '0.5rem',
  },
  mainTitle: {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  topDescription: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: 1.5,
    marginBottom: '1rem',
  },
  schedule: {
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1.5rem',
  },
  bookButton: {
    backgroundColor: '#f06e00',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
  },
  rightSide: {
    flex: '0 0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  topRightImage: {
    maxWidth: '220px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  container3Wrapper: {
    position: 'relative',
    width: '200px',
    height: '200px',
  },

  /* 
    circleTextImage lớn hơn 
    => width, height = 200px 
    container3Image nhỏ hơn 
    => width, height = 140px 
    => top, left = 30px (200 - 140 = 60 => 60/2 = 30) 
  */
  circleTextImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '200px',
    height: '200px',
    objectFit: 'contain',
    zIndex: 1,
  },
  container3Image: {
    position: 'absolute',
    top: '30px',
    left: '30px',
    width: '140px',
    height: '140px',
    borderRadius: '50%',
    objectFit: 'cover',
    zIndex: 2,
  },

  /* ========== KHỐI DƯỚI (bottomBlock) ========== */
  bottomBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Cột trái: Tiêu đề
  leftSideBottom: {
    flex: '0 0 auto',
    minWidth: '200px',
  },
  bottomTitle: {
    fontSize: '2rem',
    color: '#B32E2E',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },

  // Cột giữa: food + discount
  centerSideBottom: {
    flex: '1 1 auto',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '250px',
  },
  foodWrapper: {
    position: 'relative',
    width: '300px',
    height: '300px',
  },
  foodImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  discountImage: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },

  // Cột phải: bullet
  rightSideBottom: {
    flex: '0 0 auto',
    minWidth: '200px',
  },
  featureList: {
    listStyle: 'disc',
    paddingLeft: '1.5rem',
    lineHeight: 1.5,
    color: '#666',
  },
};
