// src/pages/MenuDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PizzaCard from '../../components/usercomponent/MenuPage/PizzaCard';

function MenuDetailPage() {
  const { id } = useParams();
  const location = useLocation();

  // Dữ liệu món chính (nếu được truyền từ route state)
  const pizzaFromRoute = location.state?.mainPizza || null;

  // State cho món chính
  const [mainPizza, setMainPizza] = useState(pizzaFromRoute);
  // State cho danh sách liên quan
  const [relatedPizzas, setRelatedPizzas] = useState([]);
  // Loading/error
  const [loading, setLoading] = useState(!pizzaFromRoute); 
  const [error, setError] = useState(null);

  // 1) Nếu không có pizzaFromRoute => fetch món theo id
  useEffect(() => {
    if (!pizzaFromRoute) {
      setLoading(true);
      fetch(`https://localhost:7115/api/Menu/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Không thể lấy dữ liệu chi tiết món');
          }
          return res.json();
        })
        .then((data) => {
          setMainPizza(data); // data phải có dạng { mnuId, mnuName, mnuPrice, ... }
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, pizzaFromRoute]);

  // 2) Sau khi đã có mainPizza, fetch danh sách món để tạo related
  useEffect(() => {
    if (mainPizza) {
      fetch('https://localhost:7115/api/Menu/get-all-menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "pageIndex": 1,
          "pageSize": 20,
          "filterColumns": [
            {
              "searchColumns": [],
              "searchTerms": [],
              "operator": 5
            }
          ],
          "sortColumnsDictionary": {},
          "filterRangeColumns": [],
          "filterOption": 0,
          "export": {
            "chosenColumnNameList": {},
            "pageName": "string"
          }
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.items) {
            // Lọc món khác với mainPizza
            const related = data.items.filter(
              (p) => p.mnuId !== mainPizza.mnuId
            );
            setRelatedPizzas(related);
          }
        })
        .catch((err) => console.error(err));
    }
  }, [mainPizza]);

  // Hiển thị loading / error
  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (error) return <div style={styles.loading}>Error: {error}</div>;
  if (!mainPizza) return <div style={styles.loading}>Không tìm thấy món!</div>;

  // Chuẩn bị dữ liệu hiển thị
  const numericPrice = Number(mainPizza.mnuPrice) || 0;

  return (
    <div style={styles.container}>
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbItem}>Pizza</span>
      </div>

      <div style={styles.topSection}>
        <div style={styles.infoCol}>
          <h1 style={styles.title}>{mainPizza.mnuName}</h1>
          <h2 style={styles.price}>${numericPrice.toFixed(2)}</h2>
          <div style={styles.ratingRow}>
            {renderStarRating(mainPizza.rating || 4.5)}
            <span style={styles.ratingValue}>{mainPizza.rating || 4.5}</span>
          </div>
          <h3 style={styles.subHeading}>Description</h3>
          <p style={styles.description}>{mainPizza.mnuDescription}</p>
        </div>

        <div style={styles.imageCol}>
          <img
            src={mainPizza.mnuImage}
            alt={mainPizza.mnuName}
            style={styles.mainPizzaImg}
          />
        </div>
      </div>

      {/* Related */}
      <div style={styles.relatedSection}>
        <h3 style={styles.subHeading}>Related Products</h3>
        <div style={styles.relatedGrid}>
          {relatedPizzas.map((rp) => (
            <PizzaCard
              key={rp.mnuId}
              id={rp.mnuId}
              name={rp.mnuName}
              price={rp.mnuPrice}
              image={rp.mnuImage}
              description={rp.mnuDescription}
              rating={rp.rating || 4.5}
              time="10 minutes"
              persons="1 person"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Hàm hiển thị rating
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
    margin: '0 5rem',
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
    backgroundColor: '#FF5B5B',
    color: '#ffffff',
    padding: '8px 13px',
    borderRadius: '10px',
    fontSize: '15px',
  },
  title: {
    fontSize: '30px',
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
    fontSize: '30px',
    color: '#FF5B5B',
    margin: '0 0 1rem',
    fontWeight: 'bold',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
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
    borderTop: '1px solid #FF5B5B',
  },
  relatedGrid: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  starContainer: {
    color: '#FFD700',
    fontSize: '1.2rem',
  },
};
