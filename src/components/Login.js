import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/users/login', {
        username,
        password
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role); // Store role
      navigate('/dashboard'); // Redirect based on role
    } catch (error) {
      console.error('Error logging in', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="form-container">
      <img src={logo} alt="College Logo" className="logo" />
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
