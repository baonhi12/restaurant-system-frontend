// src/components/MenuPage/MenuCategorySection.js
import React from 'react';
import PizzaCard from './PizzaCard'; // Cùng thư mục
import pizzaCard1 from '../../assets/images/pizza-card-1.svg';
import pizzaCard2 from '../../assets/images/pizza-card-2.svg';
import pizzaCard3 from '../../assets/images/pizza-card-3.svg';

function MenuCategorySection() {
  // Dữ liệu mock, mỗi pizza có thêm 'description' riêng
  const products = [
    {
      id: 1,
      name: 'Sausage Pizza',
      price: '7.49',
      time: '2 minutes',
      persons: '4 persons',
      image: pizzaCard1,
      description: 'A delicious sausage pizza topped with mozzarella and tangy tomato sauce.',
      rating: 4.2,
    },
    {
      id: 2,
      name: 'Cheese Overload',
      price: '18.30',
      time: '22 minutes',
      persons: '3 persons',
      image: pizzaCard2,
      description: 'A pizza loaded with multiple layers of cheese for true cheese lovers.',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'Italian Pizza',
      price: '6.99',
      time: '10 minutes',
      persons: '1 persons',
      image: pizzaCard3,
      description: 'Classic Italian style pizza with fresh basil, tomatoes, and olive oil.',
      rating: 4.0,
    },
    {
      id: 4,
      name: 'Veggie Garden',
      price: '6.99',
      time: '10 minutes',
      persons: '1 persons',
      image: pizzaCard1,
      description: 'A healthy option packed with fresh vegetables and a light cheese topping.',
      rating: 3.9,
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
          {products.map((p) => (
            <PizzaCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              time={p.time}
              persons={p.persons}
              image={p.image}
              description={p.description}  // <-- Truyền xuống
              rating={p.rating}
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
