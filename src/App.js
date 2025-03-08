import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import TableReservation from './pages/TableReservation';
import TableStatus from './pages/TableStatus';
import Payment from './pages/Payment';
import Report from './pages/Report';

// Components Header and Footer
import Header from './components/Header';
import Footer from './components/Footer';

// User Pages
import HomePage from './pages/HomePage';
import ReservationPage from './pages/ReservationPage';
import MenuPage from './pages/MenuPage';
import MenuDetailPage from './pages/MenuDetailPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';


import DetailFoodForm from './components/DetailFoodForm';


const AppContent = () => {
  const location = useLocation();

  // Define admin routes paths (you can adjust these as needed)
  const adminPaths = ['/dashboard', '/admin-menu', '/admin-reservation', '/order-list', '/payment', '/report'];

  // Check if current pathname starts with any admin path
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Only render Header if not on an admin route */}
      {!isAdminRoute && <Header />}
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-menu" element={<MenuManagement />} />
        <Route path="/admin-reservation" element={<TableReservation />} />
        <Route path="/order-list" element={<TableStatus />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/report" element={<Report />} />

        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
          {/* :id = param, bạn sẽ dùng để lấy chi tiết pizza */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Only render Footer if not on an admin route */}
      {!isAdminRoute && <Footer />}
    </>
  );
};


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
