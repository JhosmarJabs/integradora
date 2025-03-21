// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setAuthorized(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/verify-session', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.loggedIn && data.role === requiredRole) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  if (loading) return <p>Cargando...</p>;

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
