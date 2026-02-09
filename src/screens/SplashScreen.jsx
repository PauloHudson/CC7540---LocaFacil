import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './SplashScreen.css';

const SplashScreen = () => {
  const { isSignedIn, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        if (isSignedIn) {
          if (user?.is_admin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/vehicles');
          }
        } else {
          navigate('/login');
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, user, loading, navigate]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <h1 className="splash-logo">LocaFácil</h1>
        <p className="splash-subtitle">Aluguel Fácil</p>
      </div>
    </div>
  );
};

export default SplashScreen;
