// src/pages/userpage/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const response = await fetch('https://localhost:7115/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const resData = await response.json();
      // API trả về: { "statusCode": "Success", "message": "", "data": { "token": "...", "role": "Admin" } }
      const { token, role } = resData.data;

      // Lưu token & role vào localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Nếu là admin => chuyển sang Dashboard, nếu không => NotFound hoặc trang tùy bạn
      if (role === 'Admin') {
        navigate('/dashboard');
      } else {
        navigate('/not-found');
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
        <p>Login with an internal account</p>
        {errorMsg && <p style={styles.error}>{errorMsg}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <a href="/forgot-password" style={styles.forgotPassword}>
          Forgot Password?
        </a>
      </div>
    </div>
  );
}

export default LoginPage;

/* ---------- Inline Styles ---------- */
const styles = {
  pageWrapper: {
    backgroundColor: '#F3F2F7',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',    // Đẩy nội dung lên đầu theo trục dọc
    justifyContent: 'center',    // Căn giữa ngang
    paddingTop: '6rem',          // Khoảng trống phía trên
    paddingBottom: '2rem',
    fontFamily: "'Poppins', sans-serif",
  },
  formContainer: {
    backgroundColor: '#fff',
    border: '1px solid #FF5B5B',
    borderRadius: '12px',
    padding: '2rem',
    width: '400px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
    // marginTop: 0  // (bỏ marginTop cũ nếu có)
  },
  
  title: {
    marginBottom: '1rem',
    color: '#FF5B5B',   // Màu đỏ đậm
    fontSize: '30px',
    fontWeight: 'bold',
  },
  error: {
    color: '#ff5e5e',
    marginBottom: '1rem',
    fontWeight: '600',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1rem',
    marginTop: '1.5rem',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.2s',
  },
  button: {
    backgroundColor: '#FF5B5B',  
    color: '#fff',
    border: 'none',
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
  },
  forgotPassword: {
    display: 'inline-block',
    marginTop: '0.5rem',
    color: '#B32E2E',   // Đỏ đậm
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};
