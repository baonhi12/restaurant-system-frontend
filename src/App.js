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
import Header from './components/usercomponent/Header';
import Footer from './components/usercomponent/Footer';
import LoginPage from './pages/userpage/LoginPage';
import Logout from './pages/adminpage/Logout';


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
        <Route path="/admin-reservation/detail-table-reservation" element={<DetailTableReservation />} />
        <Route path="/admin-reservation/new-table-reservation" element={<NewReservation />} />
        <Route path="/admin-reservation/customer-order" element={<CustomerOrder />} />
        <Route path="/table-status" element={<TableStatus />} />
        <Route path="/payment" element={<PaymentList />} />
        <Route path="/admin-reservation/payment" element={<Payment />} />
        <Route path="/report" element={<Report />} />

        {/* User Routes */}
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:id" element={<MenuDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Mobile Screen Routes */}
        <Route element={<OrderProviderWrapper />}>
          <Route path="/homescreen" element={<HomeScreen />} />
          <Route path="/detail-food-screen/:id" element={<DetailFood />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/order-cart-screen" element={<OrderCart />} />
          <Route path="/ordered-list-cart-screen" element={<OrderedList />} />
        </Route>
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
