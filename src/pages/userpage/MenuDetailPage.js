// src/pages/MenuDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Import ảnh cục bộ (mock). Bạn có thể thay bằng đường dẫn thật hoặc fetch API
import pizzaCard2 from '../../assets/images/pizza-card-2.svg';

// Import component PizzaCard để hiển thị dạng thẻ
import PizzaCard from '../../components/usercomponent/MenuPage/PizzaCard';

function MenuDetailPage() {
  // Lấy ID từ URL (vd: /menu/2 => id=2)
  const { id } = useParams();

  // State lưu danh sách pizzas, loading, error
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect để giả lập fetch dữ liệu
  useEffect(() => {
    async function fetchPizzas() {
      try {
        // Dữ liệu mock. Khi kết nối CSDL/API thật, bạn thay bằng fetch(url)
        const mockData = [
          {
            id: 1,
            name: 'Sausage Pizza',
            price: 7.49,
            description: 'A delicious sausage pizza topped with mozzarella.',
            image: pizzaCard2,
            rating: 4.2,
          },
          {
            id: 2,
            name: 'Cheese Overload',
            price: 18.3,
            description: 'A pizza loaded with multiple layers of cheese.',
            image: pizzaCard2,
            rating: 4.8,
          },
          {
            id: 3,
            name: 'Veggie Garden',
            price: 6.99,
            description: 'Packed with fresh vegetables and a light cheese topping.',
            image: pizzaCard2,
            rating: 3.9,
          },
          {
            id: 4,
            name: 'Seafood Deluxe',
            price: 8.0,
            description: 'Shrimp, squid, fish with fresh herbs and cheese.',
            image: pizzaCard2,
            rating: 4.3,
          },
        ];
        setPizzas(mockData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching pizzas');
        setLoading(false);
      }
    }
    fetchPizzas();
  }, []);

  // Xử lý loading / error
  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.loading}>Error: {error}</div>;

  // Tìm món chính dựa trên id
  const mainPizza = pizzas.find((p) => p.id === Number(id));
  if (!mainPizza) {
    return <div style={styles.loading}>Pizza not found!</div>;
  }

  // Lọc ra các sản phẩm liên quan (trừ món chính)
  const relatedPizzas = pizzas.filter((p) => p.id !== Number(id));
  const numericPrice = Number(mainPizza.price || 0);

  return (
    <div style={styles.container}>
      {/* Breadcrumb / Nhãn nhỏ */}
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbItem}>Pizza</span>
      </div>

      {/* Tiêu đề món */}
      <h1 style={styles.title}>{mainPizza.name}</h1>

      <div style={styles.topSection}>
        {/* Cột trái: Thông tin, mô tả, rating */}
        <div style={styles.infoCol}>
          <h2 style={styles.price}>${numericPrice.toFixed(2)}</h2>
          <div style={styles.ratingRow}>
            {renderStarRating(mainPizza.rating)}
            <span style={styles.ratingValue}>{mainPizza.rating}</span>
          </div>
          <h3 style={styles.subHeading}>Description</h3>
          <p style={styles.description}>{mainPizza.description}</p>
        </div>

        {/* Cột phải: Ảnh */}
        <div style={styles.imageCol}>
          <img
            src={mainPizza.image}
            alt={mainPizza.name}
            style={styles.mainPizzaImg}
          />
        </div>
      </div>

      {/* Related Products hiển thị dạng thẻ PizzaCard */}
      <div style={styles.relatedSection}>
        <h3 style={styles.subHeading}>Related Products</h3>
        <div style={styles.relatedGrid}>
          {relatedPizzas.map((rp) => (
            <PizzaCard
              key={rp.id}
              id={rp.id}
              name={rp.name}
              price={rp.price}
              image={rp.image}
              description={rp.description}
              rating={rp.rating}
              // Giả lập time / persons. Bạn có thể thay bằng dữ liệu thật
              time="10 minutes"
              persons="2 persons"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Hàm hiển thị rating dạng sao
function renderStarRating(rating = 0) {
  const fullStar = '★';
  const emptyStar = '☆';
  const stars = [];
  const fullCount = Math.floor(rating);
  for (let i = 0; i < 5; i++) {
    stars.push(i < fullCount ? fullStar : emptyStar);
  }
  return <span style={styles.starContainer}>{stars.join('')}</span>;
}

export default MenuDetailPage;

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'sans-serif',
  },
  loading: {
    textAlign: 'center',
    marginTop: '2rem',
    fontSize: '1.2rem',
  },
  breadcrumb: {
    fontSize: '0.9rem',
    color: '#999',
    marginBottom: '1rem',
  },
  breadcrumbItem: {
    cursor: 'pointer',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  topSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  infoCol: {
    flex: 1,
    minWidth: '280px',
    display: 'flex',
    flexDirection: 'column',
  },
  price: {
    fontSize: '2rem',
    color: '#f44336',
    margin: '0 0 1rem',
    fontWeight: 'bold',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },
  starContainer: {
    color: '#FFD700',
    fontSize: '1.2rem',
  },
  ratingValue: {
    color: '#666',
  },
  subHeading: {
    margin: '1.5rem 0 0.5rem',
    fontSize: '1.2rem',
    fontWeight: '600',
  },
  description: {
    lineHeight: 1.5,
    color: '#444',
  },
  imageCol: {
    flex: 1,
    minWidth: '280px',
  },
  mainPizzaImg: {
    width: '100%',
    borderRadius: '8px',
    objectFit: 'cover',
  },
  relatedSection: {
    marginTop: '3rem',
  },
  relatedGrid: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
};

