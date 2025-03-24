// src/components/usercomponent/MenuPage/MenuCategorySection.js
import React, { useState } from 'react';
import PizzaCard from './PizzaCard'; 
import Button from '../../admincomponent/Button';
import cate_pizza from '../../../assets/images/cate_pizza.png';
import cate_burger from '../../../assets/images/cate_burger.png';
import cate_desserts from '../../../assets/images/cate_sweets.png';
import cate_beverages from '../../../assets/images/cate_drink.png';
import cate_noodles from '../../../assets/images/cate_ramen.png';
import cate_salad from '../../../assets/images/cate_salad.png';

function MenuCategorySection({ items = [], selectedCategory, onCategoryClick, onClearFilter  }) {
  const ClearButton = ({ onClick, style }) => {
    const [hover, setHover] = useState(false);
    const combinedStyle = {
      ...style,
      backgroundColor: hover ? '#FF5B5B' : style.backgroundColor,
      color: hover ? '#FFFFFF' : style.color,
    };

    return (
      <button
        style={combinedStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onClick}
      >
        x
      </button>
    );
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>MENU</h2>
        <p style={styles.description}>
          Explore our delicious menu. There's something for everyone!
        </p>

        <div style={styles.filter}>
          <Button
            className={`custom-button ${selectedCategory === 'Pizza' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Pizza')}
          >
            <img src={cate_pizza} alt='cate_pizza' width='21rem' height='21rem' />
            Pizza
          </Button>
          <Button
            className={`custom-button ${selectedCategory === 'Burger' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Burger')}
          >
            <img src={cate_burger} alt='cate_burger' width='21rem' height='21rem' />
            Burger
          </Button>
          <Button
            className={`custom-button ${selectedCategory === 'Dessert' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Dessert')}
          >
            <img src={cate_desserts} alt='cate_desserts' width='21rem' height='21rem' />
            Desserts
          </Button>
          <Button
            className={`custom-button ${selectedCategory === 'Beverage' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Beverage')}
          >
            <img src={cate_beverages} alt='cate_beverages' width='21rem' height='21rem' />
            Beverages
          </Button>
          <Button
            className={`custom-button ${selectedCategory === 'Noodles' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Noodles')}
          >
            <img src={cate_noodles} alt='cate_noodles' width='21rem' height='21rem' />
            Noodles
          </Button>
          <Button
            className={`custom-button ${selectedCategory === 'Salad' ? 'active' : ''}`}
            onClick={() => onCategoryClick('Salad')}
          >
            <img src={cate_salad} alt='cate_salad' width='21rem' height='21rem' />
            Salad
          </Button>
          {/* Nút Clear */}
          {selectedCategory && (
            <ClearButton 
              style={styles.clearButton}
              onClick={onClearFilter}
            />
          )}
        </div>

        <div style={styles.grid}>
          {items.map((item) => (
            <PizzaCard
              key={item.mnuId}
              id={item.mnuId}
              name={item.mnuName}
              price={item.mnuPrice}
              image={item.mnuImage}
              description={item.mnuDescription}
              time="10 minutes"
              persons="1 person"
              rating={4.5}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuCategorySection;

const styles = {
  section: {
    backgroundColor: '#F3F2F7',
    textAlign: 'center',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    color: '#FF5B5B',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    margin: '0 auto',
    lineHeight: 1.5,
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    margin: '3rem 0 4rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '3.5rem 1.5rem',
    justifyItems: 'center',
  },
  clearButton: {
    width: '45px',
    height: '45px',
    backgroundColor: '#FFFFFF',
    color: '#FF5B5B',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: '5px',
    textAlign: 'center',
    transition: 'all 0.3s',
  },
};
