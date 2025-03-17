// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/Dashboard';
import MenuManagement from './pages/MenuManagement';
import TableReservation from './pages/TableReservation';
import TableStatus from './pages/TableStatus';
import Payment from './pages/Payment';
import Report from './pages/Report';
import DetailTableReservation from './pages/DetailTableReservation';

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
import LoginPage from './pages/LoginPage';

// Additional Component
import DetailFoodForm from './components/DetailFoodForm';

const AppContent = () => {
  const location = useLocation();

  // Các route admin (điều chỉnh nếu cần)
  const adminPaths = [
    '/dashboard',
    '/admin-menu',
    '/admin-reservation',
    '/detail-table-reservation',
    '/order-list',
    '/payment',
    '/report'
  ];

  // Kiểm tra nếu current pathname bắt đầu với bất kỳ admin path nào
  const isAdminRoute = adminPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Chỉ hiển thị Header nếu không phải admin route */}
      {!isAdminRoute && <Header />}
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-menu" element={<MenuManagement />} />
        <Route path="/admin-reservation" element={<TableReservation />} />
        <Route path="/detail-table-reservation" element={<DetailTableReservation />} />
        <Route path="/order-list" element={<TableStatus />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/report" element={<Report />} />

        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {/* Chỉ hiển thị Footer nếu không phải admin route */}
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
