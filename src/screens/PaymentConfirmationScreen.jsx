import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PaymentConfirmationScreen.css';

const PaymentConfirmationScreen = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/my-rentals');
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="success-icon">✓</div>
        <h1>Locacao OK!</h1>
        <p className="confirmation-message">
          Locacao registrada. Email de confirmacao.
        </p>
        
        <button onClick={handleContinue} className="continue-button">
          Ver Minhas Locacoes
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
