import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './SplashScreen.css';

const SplashScreen = () => {
  const { isSignedIn, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        const navigationTimer = setTimeout(() => {
          if (isSignedIn) {
            if (user?.is_admin) {
              navigate('/admin/dashboard');
            } else {
              navigate('/vehicles');
            }
          } else {
            navigate('/login');
          }
        }, 500);
        return () => clearTimeout(navigationTimer);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, user, loading, navigate]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>

      <div className="splash-content">
        <div className="logo-container">
          <div className="logo-icon">LOCA<br/>FÁCIL</div>
          <h1 className="splash-logo">LocaFácil</h1>
        </div>

        <p className="splash-subtitle">Aluguel Fácil & Rápido</p>

        <div className="loading-spinner">
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
          <div className="spinner-dot"></div>
        </div>

        <p className="splash-loading-text">Conectando...</p>
      </div>

      <div className="splash-footer">
        <p className="powered-by">Carregando sua experiência</p>
      </div>
    </div>
  );
};

export default SplashScreen;
