import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Admin Pages
import Dashboard from './pages/adminpage/Dashboard';
import MenuManagement from './pages/adminpage/MenuManagement';
import TableReservation from './pages/adminpage/TableReservation';
import Payment from './pages/adminpage/Payment';
import Report from './pages/adminpage/Report';
import DetailTableReservation from './pages/adminpage/DetailTableReservation';
import CustomerOrder from './pages/adminpage/CustomerOrder';
import TableStatus from './pages/adminpage/TableStatus';
import NewReservation from './pages/adminpage/NewReservation';



// Components Header and Footer
import Header from './components/usercomponent/Header';
import Footer from './components/usercomponent/Footer';

// User Pages
import HomePage from './pages/userpage/HomePage';
import ReservationPage from './pages/userpage/ReservationPage';
import MenuPage from './pages/userpage/MenuPage';
import MenuDetailPage from './pages/userpage/MenuDetailPage';
import AboutPage from './pages/userpage/AboutPage';
import NotFoundPage from './pages/userpage/NotFoundPage';


import DetailFoodForm from './components/admincomponent/DetailFoodForm';


const AppContent = () => {
  const location = useLocation();

  // Define admin routes paths (you can adjust these as needed)
  const adminPaths = ['/dashboard', '/admin-menu', '/admin-reservation', '/detail-table-reservation', '/customer-order', '/new-table-reservation', '/table-status', '/payment', '/report', '/logout'];

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
        <Route path="/detail-table-reservation" element={<DetailTableReservation />} />
        <Route path="/new-table-reservation" element={<NewReservation />} />
        <Route path="/customer-order" element={<CustomerOrder />} />
        <Route path="/table-status" element={<TableStatus />} />
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
