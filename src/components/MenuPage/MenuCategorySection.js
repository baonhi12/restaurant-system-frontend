// src/components/MenuPage/MenuCategorySection.js
import React from 'react';
import PizzaCard from './PizzaCard'; // Cùng thư mục
import pizzaCard1 from '../../assets/images/pizza-card-1.svg';

function MenuCategorySection() {
  const products = [
    {
      id: 1,
      name: 'Sausage Pizza',
      price: '7.49',
      time: '2 minutes',
      persons: '4 persons',
      image: pizzaCard1,
    },
    {
      id: 2,
      name: 'Cheese Overload',
      price: '18.30',
      time: '22 minutes',
      persons: '3 persons',
      image: pizzaCard1,
    },
    {
      id: 3,
      name: 'Italian Pizza',
      price: '6.99',
      time: '10 minutes',
      persons: '1 persons',
      image: pizzaCard1,
    },
    {
      id: 4,
      name: 'Italian Pizza',
      price: '6.99',
      time: '10 minutes',
      persons: '1 persons',
      image: pizzaCard1,
    },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>MENU</h2>
        <p style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit...
        </p>

        <div style={styles.grid}>
          {products.map(p => (
            <PizzaCard
              key={p.id}
              name={p.name}
              price={p.price}
              time={p.time}
              persons={p.persons}
              image={p.image}
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
    backgroundColor: '#fff',
    textAlign: 'center',
    padding: '3rem 1rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textTransform: 'uppercase',
    color: '#333',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto 2rem',
    lineHeight: 1.5,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.2rem',
    justifyItems: 'center',
  },
};
