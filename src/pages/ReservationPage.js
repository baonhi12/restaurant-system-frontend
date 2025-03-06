// src/pages/ReservationPage.js
import React from 'react';

function ReservationPage() {
  return (
    <section style={styles.container} id="reservation">
      <h1 style={styles.title}>Reservation Table & Enjoy Dinner</h1>
      <div style={styles.contentWrapper}>
        {/* PHẦN HIỂN THỊ ẢNH ĐẶT BÀN */}
        <div style={styles.imageWrapper}>
          <img
            src="https://via.placeholder.com/400x300?text=Reservation+Image"
            alt="Reservation"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        </div>

        {/* PHẦN FORM ĐẶT BÀN */}
        <div style={styles.formWrapper}>
          <form style={styles.form}>
            <label style={styles.label}>
              Date
              <input type="date" style={styles.input} />
            </label>
            <label style={styles.label}>
              Time
              <input type="time" style={styles.input} />
            </label>
            <label style={styles.label}>
              Guests
              <input type="number" placeholder="Number of guests" style={styles.input} />
            </label>
            <button style={styles.button} type="submit">
              Book Table
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReservationPage;

/* -------------- inline styles -------------- */
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  contentWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  imageWrapper: {
    flex: 1,
    minWidth: '300px',
    textAlign: 'center',
  },
  formWrapper: {
    flex: 1,
    minWidth: '300px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'flex-start',
    margin: '0 auto',
    maxWidth: '300px',
  },
  label: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  input: {
    marginTop: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    backgroundColor: '#ff6600',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    marginTop: '1rem',
    alignSelf: 'center',
  },
};
