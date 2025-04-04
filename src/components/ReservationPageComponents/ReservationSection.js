// src/components/ReservationPageComponents/ReservationSection.js
import React from 'react';
import food01 from '../../assets/images/01.svg';
import food03 from '../../assets/images/03.svg';
import food06 from '../../assets/images/06.svg';

function ReservationSection() {
  return (
    <section id="reservationSection" style={styles.section}>
      <div style={styles.container}>
        {/* Tiêu đề */}
        <div style={styles.headingWrapper}>
          <p style={styles.smallTitle}>GET IN TOUCH</p>
          <h2 style={styles.mainTitle}>Reservation Table &amp; Enjoy Dinner</h2>
        </div>

        {/* Hàng 2 cột: ảnh và form */}
        <div style={styles.contentRow}>
          <div style={styles.leftCol}>
            <img src={food01} alt="Food 1" style={styles.foodImageSide} />
            <img src={food03} alt="Food 2" style={styles.foodImageMiddle} />
            <img src={food06} alt="Food 3" style={styles.foodImageSide} />
          </div>

          <div style={styles.rightCol}>
            <form style={styles.form}>
              <input type="text" placeholder="Full Name" style={styles.input} />
              <input type="text" placeholder="Phone No" style={styles.input} />
              <input type="date" style={styles.input} />
              <input type="number" placeholder="Number of guests" style={styles.input} />
              <input type="time" style={styles.input} />
              <input type="time" style={styles.input} />
              <textarea
                placeholder="Note"
                rows={3}
                style={{ ...styles.input, ...styles.textarea }}
              ></textarea>
              <button type="submit" style={styles.button}>
                BOOK NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReservationSection;

const styles = {
  section: {
    backgroundColor: '#FFEFC7',
    padding: '3rem 2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
  },
  headingWrapper: {
    marginBottom: '2rem',
    textAlign: 'left',
  },
  smallTitle: {
    color: '#B32E2E',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  mainTitle: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
  },
  contentRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    display: 'flex',
    flex: '1 1 0',
    minWidth: '300px',
    gap: '1rem',
  },
  foodImageMiddle: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '20px',
  },
  foodImageSide: {
    width: '250px',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '20px',
    marginTop: '120px',
  },
  rightCol: {
    flex: '1',
    minWidth: '300px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    width: '100%',
    maxWidth: '500px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    columnGap: '1rem',
    rowGap: '1rem',
  },
  input: {
    padding: '1rem',
    borderRadius: '30px',
    border: 'none',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    fontSize: '1rem',
    outline: 'none',
  },
  textarea: {
    gridColumn: '1 / 3',
    resize: 'none',
  },
  button: {
    gridColumn: '2 / 3',
    justifySelf: 'end',
    backgroundColor: '#ff5e00',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    textTransform: 'uppercase',
  },
};
