// src/components/AboutPages/WhyChooseSection.js
import React, { useState, useEffect } from 'react';
import foodIcon from '../../assets/images/food-icon.svg';
import beansIcon from '../../assets/images/beans-icon.svg';
import chefIcon from '../../assets/images/chef-icon.svg';

/**
 * Hàm chunkArray: chia 1 mảng thành nhiều mảng con,
 * mỗi mảng con có độ dài = size (nhóm 3 bình luận).
 */
function chunkArray(array, size) {
  const chunked = [];
  for (let i = 0; i < array.length; i += size) {
    chunked.push(array.slice(i, i + size));
  }
  return chunked;
}

// Mảng dữ liệu nhiều bình luận (tùy ý)
const testimonialData = [
  {
    text: "“Lorem ipsum dolor sit amet consectetur. Suspendisse ullamcorper nisl non massa congue faucibus amet risus libero.”",
    rating: "★★★★★",
    author: "John",
    role: "Business Man",
  },
  {
    text: "“Lorem ipsum dolor sit amet consectetur. Felisici eget egestas tristique sit semper sit enim. Turpis aliquet ac ac donec eu ac.”",
    rating: "★★★★★",
    author: "Romero",
    role: "Business Man",
  },
  {
    text: "“Dignissim nunc facilisis pretium in malesuada lectus dui.”",
    rating: "★★★★☆",
    author: "Julia",
    role: "Business Woman",
  },
  {
    text: "“Mauris varius, purus vel viverra tristique, sem libero maximus magna, quis consequat nulla nunc at nisi.”",
    rating: "★★★★★",
    author: "Thomas",
    role: "Food Blogger",
  },
  {
    text: "“Nulla facilisi. Vivamus eget libero et eros eleifend interdum eget ac risus. Pellentesque habitant morbi tristique.”",
    rating: "★★★★★",
    author: "Alice",
    role: "Designer",
  },
  {
    text: "“Sed in urna eu massa cursus eleifend. Donec congue luctus lorem, et euismod ligula pretium eget.”",
    rating: "★★★★★",
    author: "David",
    role: "Business Man",
  },
  {
    text: "“Aliquam a mauris congue, imperdiet ipsum non, venenatis nisi. Nam aliquet sodales aliquam.”",
    rating: "★★★★☆",
    author: "Sophie",
    role: "Freelancer",
  },
  {
    text: "“Etiam nec suscipit lacus. Donec ultrices, nisi non facilisis lobortis, ipsum libero varius felis.”",
    rating: "★★★★★",
    author: "Linda",
    role: "Entrepreneur",
  },
  {
    text: "“Praesent facilisis ipsum in turpis convallis vulputate. Duis ultricies leo vel neque facilisis venenatis.”",
    rating: "★★★★☆",
    author: "Brian",
    role: "Chef",
  },
];

function WhyChooseSection() {
  // Chia mảng testimonialData thành các nhóm 3 phần tử (mỗi slide hiển thị 3 bình luận)
  const chunkedTestimonials = chunkArray(testimonialData, 3);

  // currentSlide đại diện cho chỉ số slide hiện tại (0, 1, 2, ...)
  const [currentSlide, setCurrentSlide] = useState(0);

  // Tự động chuyển slide sau mỗi 6 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % chunkedTestimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [chunkedTestimonials.length]);

  // Khi bấm vào dấu phân trang, chuyển sang slide tương ứng
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section style={styles.section}>
      {/* WHY CHOOSE */}
      <h2 style={styles.mainTitle}>Why people choose us?</h2>
      <p style={styles.subtitle}>
        Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius. Felisici eget egestas tristique 
        sit semper sit enim. Turpis aliquet ac ac donec eu ac. Sagittis vestibulum ut ac odio non massa metus.
      </p>

      {/* 3 khối giới thiệu lợi ích (Menu, Quality, Chefs) */}
      <div style={styles.featuresRow}>
        <div style={styles.featureCard}>
          <img src={foodIcon} alt="Menu For Every Taste" style={styles.icon} />
          <h3 style={styles.featureTitle}>Menu For Every Taste</h3>
          <p style={styles.featureDesc}>
            Lorem ipsum dolor sit amet consectetur. Felisici eget egestas tristique sit semper 
            sit enim. Turpis aliquet ac ac donec eu ac.
          </p>
        </div>
        <div style={styles.featureCard}>
          <img src={beansIcon} alt="Always Quality" style={styles.icon} />
          <h3 style={styles.featureTitle}>Always Quality</h3>
          <p style={styles.featureDesc}>
            Lorem ipsum dolor sit amet consectetur. Felisici eget egestas tristique sit semper 
            sit enim. Turpis aliquet ac ac donec eu ac.
          </p>
        </div>
        <div style={styles.featureCard}>
          <img src={chefIcon} alt="Experienced Chefs" style={styles.icon} />
          <h3 style={styles.featureTitle}>Experienced Chefs</h3>
          <p style={styles.featureDesc}>
            Lorem ipsum dolor sit amet consectetur. Felisici eget egestas tristique sit semper 
            sit enim. Turpis aliquet ac ac donec eu ac.
          </p>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <h2 style={styles.mainTitle}>Customer Say About Us</h2>

      {/* Vùng chứa carousel (overflow hidden) */}
      <div style={styles.carouselContainer}>
        {/* Track (chứa nhiều slide), dịch chuyển theo currentSlide */}
        <div
          style={{
            ...styles.carouselTrack,
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {chunkedTestimonials.map((slide, slideIndex) => (
            <div key={slideIndex} style={styles.slide}>
              {slide.map((item, index) => (
                <div key={index} style={styles.testimonialCard}>
                  <p style={styles.testimonialText}>{item.text}</p>
                  <div style={styles.rating}>{item.rating}</div>
                  <p style={styles.author}>{item.author}</p>
                  <p style={styles.role}>{item.role}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Dấu phân trang (dots) */}
      <div style={styles.dotsContainer}>
        {chunkedTestimonials.map((_, index) => (
          <span
            key={index}
            style={{
              ...styles.dot,
              ...(index === currentSlide ? styles.activeDot : {}),
            }}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default WhyChooseSection;

const styles = {
  section: {
    padding: '4rem 1rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  mainTitle: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    maxWidth: '700px',
    margin: '0 auto 3rem',
    lineHeight: 1.6,
    color: '#555',
    fontSize: '1.1rem',
  },

  /* Khối Features (3 cột) */
  featuresRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginBottom: '4rem',
  },
  featureCard: {
    flex: '1 1 250px',
    maxWidth: '300px',
    textAlign: 'center',
  },
  icon: {
    width: '60px',
    height: '60px',
    marginBottom: '1rem',
  },
  featureTitle: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  featureDesc: {
    fontSize: '1rem',
    lineHeight: 1.6,
    color: '#666',
  },

  /* Carousel container */
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
  /* Dải chứa tất cả slide, đặt display:flex để xếp ngang, transition để tạo hiệu ứng */
  carouselTrack: {
    display: 'flex',
    transition: 'transform 0.5s ease-in-out',
  },
  /* Mỗi slide chiếm toàn bộ chiều rộng .carouselContainer */
  slide: {
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    // Bạn có thể căn giữa hoặc điều chỉnh layout bên trong slide
  },

  /* Card testimonial */
  testimonialCard: {
    backgroundColor: '#e3342f',
    color: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '300px',
    textAlign: 'center',
    flex: '1 1 250px',
  },
  testimonialText: {
    marginBottom: '1rem',
    fontStyle: 'italic',
    lineHeight: 1.6,
  },
  rating: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
  },
  author: {
    fontWeight: 'bold',
  },
  role: {
    fontSize: '0.9rem',
    opacity: 0.9,
  },

  /* Dấu phân trang (dots) */
  dotsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1.5rem',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    margin: '0 5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activeDot: {
    backgroundColor: '#e3342f',
  },
};
