import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import logo from '../assets/logo.png'; // Ensure this path is correct

const Home = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="College Logo" className="logo" />
      <h1>Welcome to the College Management System</h1>
      <div className="buttons">
        <Link to="/register" className="btn btn-register">Register</Link>
        <Link to="/login" className="btn btn-login">Login</Link>
      </div>
    </div>
  );
}

export default Home;
