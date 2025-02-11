import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navigation.css';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/users/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar-container">
      <Link to="/" className="navbar-logo">MyApp</Link>
      <ul className="navbar-links">
        <li className="nav-item">
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/meetings" className="nav-link">Meetings</Link>
        </li>
        <li className="nav-item">
          <Link to="/todo" className="nav-link">To-Do</Link>
        </li>
        <li>
          <Link to="/login" className="nav-link">Login</Link>
        </li>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </ul>
    </nav>
  );
};

export default Navigation;
