import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentConfirmationScreen.css';

const PaymentConfirmationScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    const paymentMethod = location.state?.paymentMethod;
    const rentalData = location.state?.rentalData;
    
    if (paymentMethod && rentalData) {
      setConfirmationData({
        paymentMethod,
        rentalData,
        confirmationNumber: `LOC${Date.now().toString().slice(-8)}`,
        timestamp: new Date().toLocaleString('pt-BR'),
      });
    }
  }, [location.state]);

  const handleContinue = () => {
    navigate('/my-rentals');
  };

  const getPaymentMethodLabel = (method) => {
    const methods = {
      pix: 'PIX',
      credit: 'Cartão de Crédito',
      debit: 'Débito em Conta',
    };
    return methods[method] || method;
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="success-icon">✓</div>
        <h1>Pagamento Confirmado!</h1>
        
        {confirmationData ? (
          <>
            <p className="confirmation-message">
              Sua locação foi registrada com sucesso.
            </p>

            <div className="confirmation-details">
              <div className="detail-section">
                <h3>Detalhes do Pagamento</h3>
                
                <div className="detail-row">
                  <span className="detail-label">Referência:</span>
                  <span className="detail-value">{confirmationData.confirmationNumber}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Método:</span>
                  <span className="detail-value">{getPaymentMethodLabel(confirmationData.paymentMethod)}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Data/Hora:</span>
                  <span className="detail-value">{confirmationData.timestamp}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Detalhes da Locação</h3>

                <div className="detail-row">
                  <span className="detail-label">Item:</span>
                  <span className="detail-value">{confirmationData.rentalData.itemName}</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Período:</span>
                  <span className="detail-value">{confirmationData.rentalData.days} dia(s)</span>
                </div>

                <div className="detail-row">
                  <span className="detail-label">Valor do Item:</span>
                  <span className="detail-value">R$ {confirmationData.rentalData.itemPrice.toFixed(2)}</span>
                </div>

                {confirmationData.rentalData.insurancePrice > 0 && (
                  <div className="detail-row">
                    <span className="detail-label">Seguro:</span>
                    <span className="detail-value">R$ {confirmationData.rentalData.insurancePrice.toFixed(2)}</span>
                  </div>
                )}

                <div className="detail-row total">
                  <span className="detail-label">Total Pago:</span>
                  <span className="detail-value">R$ {confirmationData.rentalData.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="info-box">
              <p>Um email de confirmação foi enviado para seu endereço de email cadastrado.</p>
              <p>Transação segura e criptografada.</p>
            </div>
          </>
        ) : (
          <p className="confirmation-message">
            Locação registrada. Email de confirmação enviado.
          </p>
        )}
        
        <button onClick={handleContinue} className="continue-button">
          Ver Minhas Locações
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
