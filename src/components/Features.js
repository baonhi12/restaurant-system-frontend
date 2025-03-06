// src/components/Features.js
import React from 'react';
import pizzaFeast from '../assets/images/images.svg'; // Pizza + topping
import pizzaBG from '../assets/images/images2.svg';   // Vùng loang
import italiaIcon from '../assets/icons/italiaIcon.svg';
import tomatoIcon from '../assets/icons/tomatoIcon.svg';
import shrimpIcon from '../assets/icons/shrimpIcon.svg';
import likeIcon from '../assets/icons/likeIcon.svg';

function Features() {
  const featureList = [
    {
      id: 1,
      icon: italiaIcon,
      title: 'Italian Oil',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 2,
      icon: tomatoIcon,
      title: 'Tomatoes',
      description: 'Integer eget nisl ac lacus efficitur imperdiet non eget risus.',
    },
    {
      id: 3,
      icon: shrimpIcon,
      title: 'Fresh Ingredients',
      description: 'Donec nec justo consequat, faucibus nulla at, interdum elit.',
    },
    {
      id: 4,
      icon: likeIcon,
      title: 'Top Chefs',
      description: 'Phasellus commodo nulla sit amet nisl consectetur, et vehicula nisl dapibus.',
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* BÊN TRÁI: Pizza to hơn, vùng loang thấp hơn */}
        <div style={styles.leftSide}>
          <div style={styles.imageWrapper}>
            {/* Vùng loang (dưới) */}
            <img
              src={pizzaBG}
              alt="Background Loang"
              style={styles.bgImage}
            />
            {/* Pizza + topping (trên) */}
            <img
              src={pizzaFeast}
              alt="Pizza Feast"
              style={styles.mainImage}
            />
          </div>
        </div>

        {/* BÊN PHẢI: Tiêu đề + 4 tính năng */}
        <div style={styles.rightSide}>
          <h2 style={styles.title}>FEED THE BEAST WITH A PIZZA FEAST</h2>
          <div style={styles.featureGrid}>
            {featureList.map(item => (
              <div key={item.id} style={styles.featureItem}>
                <img src={item.icon} alt={item.title} style={styles.icon} />
                <div>
                  <h3 style={styles.featureItemTitle}>{item.title}</h3>
                  <p style={styles.featureItemDesc}>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features;

/* ---------------- Inline Styles ---------------- */
const styles = {
  section: {
    backgroundColor: '#fff',
    padding: '3rem 1rem',
    height: '500px',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '2rem',
  },
  /* ==== BÊN TRÁI ==== */
  leftSide: {
    flex: '0 0 50%',
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
    width: '500px',     
    height: '400px',    
    maxWidth: '100%',
    overflow: 'visible',
  },
  bgImage: {
    position: 'absolute',
    width: '150%',     
    bottom: '-110%',       
    left: '-10%',
    zIndex: 0,
  },
  mainImage: {
    position: 'absolute',
    width: '800px',      // Pizza to hơn container
    left: '50%',  
    top: '-10%',           // Bắt đầu từ trên cùng container
    transform: 'translateX(-50%)',
    zIndex: 1,
  },
  /* ==== BÊN PHẢI ==== */
  rightSide: {
    flex: '0 0 50%',
    minWidth: '300px',
  },
  title: {
    fontSize: '2rem',
    color: '#B32E2E',
    marginBottom: '2rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: '1.5rem',
    columnGap: '2rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  icon: {
    width: '40px',
    height: '40px',
  },
  featureItemTitle: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#B32E2E',
    margin: 0,
    marginBottom: '0.2rem',
  },
  featureItemDesc: {
    fontSize: '0.95rem',
    color: '#666',
    margin: 0,
  },
};
