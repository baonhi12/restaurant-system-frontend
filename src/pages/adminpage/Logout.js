// src/pages/adminpage/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem có token không
    const token = localStorage.getItem('token');
    if (!token) {
      // Nếu không có token => chuyển luôn về /login
      navigate('/login');
      return;
    }

    // Gọi API logout qua axiosInstance (tự gắn Bearer token)
    axiosInstance.post('/Auth/logout')
      .then(() => {
        // Xoá token và role trong localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        // Điều hướng về trang login
        navigate('/login');
      })
      .catch((error) => {
        console.error(error);
        // Dù sao thì cũng xoá token để tránh lỗi
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      });
  }, [navigate]);

  return (
    <div style={{padding: '2rem', textAlign: 'center'}}>
      <h2>Logging out...</h2>
      <p>Please wait a moment.</p>
    </div>
  );
}

export default Logout;
