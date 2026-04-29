import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-spinner-large">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-message">{message}</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
