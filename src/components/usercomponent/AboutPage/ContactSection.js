// src/components/AboutPages/ContactSection.js
import React from 'react';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function ContactSection() {
  return (
    <section style={styles.section}>
      {/* Tiêu đề & mô tả */}
      <h2 style={styles.title}>CONTACT US</h2>
      <p style={styles.subtitle}>
        Reach out to us on social media along <br /> with our location
      </p>

      {/* Khối chứa Thông tin & Form */}
      <div style={styles.contactContainer}>
        {/* Thông tin liên hệ (khối đỏ) */}
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Information</h3>
          <ul style={styles.infoList}>
            <li style={styles.infoItem}>
              <FiMail style={styles.icon} />
              <span>pizzadaay@gmail.com</span>
            </li>
            <li style={styles.infoItem}>
              <FiPhone style={styles.icon} />
              <span>+84 942 165 678</span>
            </li>
            <li style={styles.infoItem}>
              <FiMapPin style={styles.icon} />
              <span>Hà Nội, Việt Nam</span>
            </li>
          </ul>
        </div>

        {/* Form liên hệ (khối trắng) */}
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Get in Touch</h3>
          <p style={styles.formSubtitle}>Feel free to drop us a line below</p>

          {/* Dòng 1: Your Name & Your Email */}
          <div style={styles.formGroup}>
            <input type="text" placeholder="Your Name" style={styles.input} />
            <input type="email" placeholder="Your Email" style={styles.input} />
          </div>

          {/* Dòng 2: Textarea */}
          <textarea
            placeholder="Typing your message here..."
            style={styles.textarea}
          />

          {/* Dòng 3: Nút Submit */}
          <button style={styles.submitBtn}>SUBMIT</button>
        </div>
      </div>

      {/* Bản đồ Google Maps nhúng */}
      <div style={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d931.3089929645647!2d105.77288835462365!3d20.983176065591188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313453178cb9f0a9%3A0x9fafbe89642c9a27!2zVuG6oW4gUGjDumMgQnVpbGRpbmc!5e0!3m2!1sen!2s!4v1741568304527!5m2!1sen!2s"
          style={styles.mapIframe}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      </div>
    </section>
  );
}

export default ContactSection;

const styles = {
  /* Vùng SECTION tổng */
  section: {
    width: '100%',
    backgroundColor: '#fff',
    padding: '4rem 1rem',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif', // Thống nhất font ở đây
  },
  title: {
    textAlign: 'center',
    fontSize: '2.4rem',
    color: '#e3342f',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '3rem',
    lineHeight: 1.6,
  },

  /* Khối container cho 2 cột: Info & Form */
  contactContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
  },

  /* Khối đỏ: Information */
  infoCard: {
    backgroundColor: '#e3342f',
    color: '#fff',
    flex: '1 1 300px',
    maxWidth: '400px',
    borderRadius: '16px',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  infoTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
  },
  infoList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'grid',
    rowGap: '1rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    fontSize: '1.1rem',
    lineHeight: 1.6,
  },
  icon: {
    fontSize: '1.4rem',
  },

  /* Khối trắng: Form liên hệ */
  formCard: {
    backgroundColor: '#fff',
    flex: '1 1 400px',
    // Tăng padding 2 bên cho rộng rãi hơn
    padding: '2rem 3rem',
    maxWidth: '700px',
    borderRadius: '16px',
    boxSizing: 'border-box',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  formTitle: {
    fontSize: '1.6rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  formSubtitle: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#666',
  },
  formGroup: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '1rem',
  },
  // Cho input dùng font kế thừa, đảm bảo cùng font
  input: {
    flex: 1,
    fontFamily: 'inherit',
    padding: '0.8rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '0.8rem',
    fontFamily: 'inherit',
    fontSize: '1rem',
    lineHeight: 1.5,
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
    boxSizing: 'border-box',
    marginBottom: '1rem',
  },
  submitBtn: {
    backgroundColor: '#e3342f',
    color: '#fff',
    padding: '0.8rem 2rem',
    fontSize: '1rem',
    lineHeight: 1.5,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  /* Bản đồ bên dưới */
  mapContainer: {
    maxWidth: '1200px',
    margin: '2rem auto 0',
  },
  mapIframe: {
    width: '100%',
    height: '400px',
    border: 0,
    borderRadius: '16px',
  },
};
