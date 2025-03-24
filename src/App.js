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
import PaymentList from './pages/adminpage/PaymentList';

// Components Header and Footer
import Header from './components/usercomponent/Header';
import Footer from './components/usercomponent/Footer';
import LoginPage from './pages/userpage/LoginPage';
import Logout from './pages/adminpage/Logout';


// User Pages
import HomePage from './pages/userpage/HomePage';
import ReservationPage from './pages/userpage/ReservationPage';
import MenuPage from './pages/userpage/MenuPage';
import MenuDetailPage from './pages/userpage/MenuDetailPage';
import AboutPage from './pages/userpage/AboutPage';
import NotFoundPage from './pages/userpage/NotFoundPage';


// Mobile Screen Pages
import HomeScreen from './pages/mobilepage/HomeScreen'
import DetailFood from './pages/mobilepage/DetailFood';
import OrderCart from './pages/mobilepage/OrderCart';
import OrderedList from './pages/mobilepage/OrderedList';
import OrderProviderWrapper from './OrderProviderWrapper';

import ScrollToTopButton from './components/usercomponent/ScrollToTopButton';
import PrivateRoute from './routes/PrivateRoute';
import ThankYouPage from './pages/userpage/ThankYouPage';

const AppContent = () => {
  const location = useLocation();

  // Define admin routes paths (you can adjust these as needed)
  const adminPaths = [
    '/dashboard', 
    '/admin-menu', 
    '/admin-reservation', 
    '/admin-reservation/detail-table-reservation', 
    '/admin-reservation/customer-order', 
    '/admin-reservation/new-table-reservation', 
    '/table-status', 
    '/payment', 
    '/payment/id', 
    '/report', 
    '/logout'
  ];
  const mobilePaths = [
    '/homescreen', 
    '/detail-food-screen', 
    '/order-cart-screen', 
    '/ordered-list-cart-screen', 
    // '/qrcode',
  ]

  const noHeaderFooter = [...adminPaths, ...mobilePaths].some(path => location.pathname.startsWith(path));

  return (
    <>
      {/* Only render Header if not on an admin route */}
      {!noHeaderFooter && <Header />}
      
      <Routes>
        {/* Admin Routes */}
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/qrcode" element={<TableQRCode />} /> */}
        <Route 
          path="/dashboard"
          element={
            <PrivateRoute requiredRole="Admin">
              <Dashboard />
            </PrivateRoute>
          } 
        />
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
          {/* :id = param, bạn sẽ dùng để lấy chi tiết pizza */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="*" element={<NotFoundPage />} />

        {/* Mobile Screen Routes */}
        <Route element={<OrderProviderWrapper />}>
          <Route path="/homescreen" element={<HomeScreen />} />
          <Route path="/detail-food-screen/:id" element={<DetailFood />} />
          <Route path="/order-cart-screen" element={<OrderCart />} />
          <Route path="/ordered-list-cart-screen" element={<OrderedList />} />
        </Route>
      </Routes>
      
      {/* Only render Footer if not on an admin route */}
      {!noHeaderFooter && (
        <>
          <Footer />
          <ScrollToTopButton />
        </>
      )}
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
