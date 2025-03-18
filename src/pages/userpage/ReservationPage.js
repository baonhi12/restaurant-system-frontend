// src/pages/ReservationPage.js
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../../components/usercomponent/ReservationPageComponents/Banner';
import ReservationSection from '../../components/usercomponent/ReservationPageComponents/ReservationSection'; 
import ChefSection from '../../components/usercomponent/ReservationPageComponents/ChefSection';

function ReservationPage() {
  const location = useLocation();

  useEffect(() => {
    // Nếu đường dẫn có hash (vd: /reservation#reservationSection), cuộn đến id="reservationSection"
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <main>
      {/* Banner ở đầu trang */}
      <Banner />
      <ReservationSection />
      <ChefSection />
    </main>
  );
}

export default ReservationPage;

