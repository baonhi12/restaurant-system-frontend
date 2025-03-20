// src/components/usercomponent/MenuPage/MenuCategorySection.js
import React from 'react';
import PizzaCard from './PizzaCard'; 
import Button from '../../admincomponent/Button';
import cate_pizza from '../../../assets/images/cate_pizza.png';
import cate_burger from '../../../assets/images/cate_burger.png';
import cate_desserts from '../../../assets/images/cate_sweets.png';
import cate_beverages from '../../../assets/images/cate_drink.png';
import cate_noodles from '../../../assets/images/cate_ramen.png';
import cate_salad from '../../../assets/images/cate_salad.png';

function MenuCategorySection({ items = [] }) {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>MENU</h2>
        <p style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>

        <div style={styles.filter}>
          <Button><img src={cate_pizza} alt='cate_pizza' width='21rem' height='21rem' />Pizza</Button>
          <Button><img src={cate_burger} alt='cate_burger' width='21rem' height='21rem' />Burger</Button>
          <Button><img src={cate_desserts} alt='cate_desserts' width='21rem' height='21rem' />Desserts</Button>
          <Button><img src={cate_beverages} alt='cate_beverages' width='21rem' height='21rem' />Beverages</Button>
          <Button><img src={cate_noodles} alt='cate_noodles' width='21rem' height='21rem' />Noodles</Button>
          <Button><img src={cate_salad} alt='cate_salad' width='21rem' height='21rem' />Salad</Button>
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
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.5,
  },
  filter: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3rem',
    margin: '3rem 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.2rem',
    justifyItems: 'center',
  },
};
