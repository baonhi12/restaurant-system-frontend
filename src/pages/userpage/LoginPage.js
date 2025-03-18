// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ví dụ: email: admin@example.com, password: 123
    if (email === 'admin@example.com' && password === '123') {
      navigate('/dashboard'); // Chuyển đến trang admin
    } else {
      setErrorMsg('Invalid email or password.');
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Login</h2>
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
  /* Trang tổng thể: nền kem nhạt, full màn hình */
  pageWrapper: {
    backgroundColor: '#FFF7ED',  // Nền kem nhạt (giống pizza page)
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  /* Khung chính form login */
  formContainer: {
    backgroundColor: '#fff',     // Nền trắng
    border: '1px solid #f06e00', // Viền cam
    borderRadius: '12px',
    padding: '2rem',
    width: '400px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1rem',
    color: '#B32E2E',   // Màu đỏ đậm
    fontSize: '2rem',
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
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: 'border 0.2s',
  },
  /* Hiệu ứng hover input */
  button: {
    backgroundColor: '#f06e00',  // Cam
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
