// frontend/components/ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ element, redirectPath = "/login" }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // Check if the user has a valid token
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/check-auth`, {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Wait until we have the auth status
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return element; // User is authenticated, show the protected route
  }

  return <Navigate to={redirectPath} replace />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
