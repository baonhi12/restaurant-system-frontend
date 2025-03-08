// src/pages/ReservationPage.js
import React from 'react';
import Banner from '../components/ReservationPageComponents/Banner';
import ReservationSection from '../components/ReservationPageComponents/ReservationSection'; 
import ChefSection from '../components/ReservationPageComponents/ChefSection';

function ReservationPage() {
  return (
    <main>
      {/* Banner ở đầu trang */}
      <Banner />
      <ReservationSection/>
      <ChefSection/>
    </main>
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
