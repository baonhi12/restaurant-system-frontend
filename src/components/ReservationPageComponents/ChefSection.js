// src/components/ReservationPageComponents/ChefSection.js
import React from 'react';
// Đường dẫn ảnh có thể thay đổi tuỳ vị trí file của bạn
import chef1 from '../../assets/images/chef-1.svg';
import chef2 from '../../assets/images/chef-2.svg';
import chef3 from '../../assets/images/chef-3.svg';

function ChefSection() {
  // Tạo mảng 6 phần tử, nhưng chỉ có 3 ảnh, lặp lại
  const chefs = [
    { id: 1, name: 'Diego Maldini', role: 'Executive Chef', img: chef1 },
    { id: 2, name: 'Edward Garlen', role: 'Chef de Partie', img: chef2 },
    { id: 3, name: 'Yosephian', role: 'Sous Chef', img: chef3 },
    { id: 4, name: 'Diego Maldini', role: 'Executive Chef', img: chef1 },
    { id: 5, name: 'Edward Garlen', role: 'Chef de Partie', img: chef2 },
    { id: 6, name: 'Yosephian', role: 'Sous Chef', img: chef3 },
  ];

  return (
    <section style={styles.section}>
      <div style={styles.container}>

        {/* Tiêu đề nhỏ (BEST CHEF) và tiêu đề lớn */}
        <p style={styles.smallTitle}>BEST CHEF</p>
        <h2 style={styles.mainTitle}>The best chef at Pizzateria</h2>

        {/* Grid hiển thị 6 đầu bếp */}
        <div style={styles.chefGrid}>
          {chefs.map(chef => (
            <div key={chef.id} style={styles.chefItem}>
              
              {/* Vòng tròn trắng bọc ảnh, có bóng nhẹ */}
              <div style={styles.chefCircle}>
                <img
                  src={chef.img}
                  alt={chef.name}
                  style={styles.chefImage}
                />
              </div>

              <h3 style={styles.chefName}>{chef.name}</h3>
              <p style={styles.chefRole}>{chef.role}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ChefSection;

/* ------------------- Inline Styles ------------------- */
const styles = {
  /* Toàn section: nền trắng */
  section: {
    backgroundColor: '#fff',
    padding: '3rem 1rem',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },

  /* Tiêu đề nhỏ */
  smallTitle: {
    color: '#E72C59',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
    letterSpacing: '1px',
  },
  /* Tiêu đề lớn */
  mainTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '3rem',
  },

  /* Grid 3 cột x 2 hàng (tổng 6 đầu bếp) */
  chefGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '2rem',
    justifyItems: 'center',  // Canh giữa các phần tử trong cột
  },
  /* Mỗi item là 1 chef */
  chefItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  /* Vòng tròn trắng bọc ảnh (có bóng) */
  chefCircle: {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#fff',            // Màu trắng
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Bóng nhẹ
    marginBottom: '1rem',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  /* Ảnh đầu bếp */
  chefImage: {
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  /* Tên đầu bếp */
  chefName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '0.3rem',
  },
  /* Vai trò (Executive Chef, Sous Chef, ...) */
  chefRole: {
    fontSize: '1rem',
    color: '#666',
  },
};
