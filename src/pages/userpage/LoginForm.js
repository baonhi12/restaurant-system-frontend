import React, { useState } from 'react';
import '../assets/css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/admincomponent/Button';
import { IoIosClose } from "react-icons/io";


const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Hardcode username và password: admin / 123
    if (username === 'admin' && password === '123') {
      // alert('Đăng nhập thành công!');
      navigate('/dashboard');
    } 
    if (username !== 'admin' || password === '123') {
      setErrorMsg('Username not found');
    } 
    else {
      setErrorMsg('Password is incorrect');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}><IoIosClose /></button>
        <h2 className='login-title'>Login Your Account</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMsg && <p style={{ color: '#FF5B5B' }}>{errorMsg}</p>}
          <div className='btn-container'>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;