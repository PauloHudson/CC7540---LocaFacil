import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentMethodScreen.css';

const PaymentMethodScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });

  // Dados da locação vindo do state
  const rentalData = location.state?.rentalData || {
    itemName: 'Item de Aluguel',
    totalPrice: 0,
    days: 0,
  };

  // Gerar padrão QR Code determinístico baseado nos dados
  const generateQRPattern = () => {
    const pixString = `00020126360014br.gov.bcb.pix${rentalData.totalPrice}520400005303986540510${rentalData.days}5802BR5913LOCA FACIL6009BRASIL62410503***63041D3A`;
    
    // Usar hash simples para gerar padrão determinístico
    let hash = 0;
    for (let i = 0; i < pixString.length; i++) {
      const char = pixString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    const pattern = [];
    let seedValue = Math.abs(hash);
    
    for (let i = 0; i < 100; i++) {
      seedValue = (seedValue * 9301 + 49297) % 233280;
      pattern.push(seedValue > 116640);
    }
    
    return pattern;
  };

  const qrPattern = generateQRPattern();

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'number') {
      formattedValue = value.replace(/\s/g, '').slice(0, 16);
      formattedValue = formattedValue.replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'cvv') {
      formattedValue = value.slice(0, 3);
    } else if (name === 'expiryMonth') {
      formattedValue = value.slice(0, 2);
    } else if (name === 'expiryYear') {
      formattedValue = value.slice(0, 2);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const validateCard = () => {
    if (!cardData.number || cardData.number.replace(/\s/g, '').length !== 16) {
      alert('Número do cartão inválido');
      return false;
    }
    if (!cardData.holder) {
      alert('Nome do titular obrigatório');
      return false;
    }
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      alert('Data de validade obrigatória');
      return false;
    }
    if (!cardData.cvv || cardData.cvv.length !== 3) {
      alert('CVV inválido');
      return false;
    }
    return true;
  };

  const handleContinuePayment = () => {
    if (!paymentMethod) {
      alert('Selecione um método de pagamento');
      return;
    }

    if (paymentMethod === 'pix') {
      setShowQRCode(true);
    } else if (paymentMethod === 'credit' || paymentMethod === 'debit') {
      setShowCardForm(true);
    }
  };

  const handleCardSubmit = () => {
    if (!validateCard()) {
      return;
    }
    processPayment();
  };

  const processPayment = async () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/payment-confirmation', { state: { paymentMethod, rentalData } });
    }, 2000);
  };

  const handlePixConfirm = async () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      navigate('/payment-confirmation', { state: { paymentMethod, rentalData } });
    }, 2000);
  };

  const goBack = () => {
    if (showQRCode) {
      setShowQRCode(false);
    } else if (showCardForm) {
      setShowCardForm(false);
    } else {
      navigate(-1);
    }
  };

  // Tela de QR Code PIX
  if (showQRCode) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="card-toolbar">
            <button onClick={goBack} className="back-button">Voltar</button>
          </div>
          <div className="pix-header">
            <svg className="pix-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
              <rect x="4" y="4" width="4" height="4" fill="currentColor"/>
              <rect x="10" y="4" width="4" height="4" fill="currentColor"/>
              <rect x="16" y="4" width="4" height="4" fill="currentColor"/>
              <rect x="4" y="10" width="4" height="4" fill="currentColor"/>
              <rect x="10" y="10" width="4" height="4" fill="currentColor"/>
              <rect x="4" y="16" width="4" height="4" fill="currentColor"/>
              <rect x="10" y="16" width="4" height="4" fill="currentColor"/>
            </svg>
            <h1>Pagamento com PIX</h1>
          </div>
          <p className="instruction">Escaneie o código QR com seu celular</p>

          <div className="qr-container">
            <div className="qr-code-placeholder">
              <svg width="200" height="200" viewBox="0 0 200 200" className="qr-svg">
                <rect width="200" height="200" fill="white" />
                {/* Padrão de posicionamento do QR Code */}
                <rect x="10" y="10" width="50" height="50" fill="black" />
                <rect x="140" y="10" width="50" height="50" fill="black" />
                <rect x="10" y="140" width="50" height="50" fill="black" />
                
                {/* Padrões internos */}
                <rect x="20" y="20" width="30" height="30" fill="white" />
                <rect x="25" y="25" width="20" height="20" fill="black" />
                
                <rect x="150" y="20" width="30" height="30" fill="white" />
                <rect x="155" y="25" width="20" height="20" fill="black" />
                
                <rect x="20" y="150" width="30" height="30" fill="white" />
                <rect x="25" y="155" width="20" height="20" fill="black" />
                
                {/* Padrão aleatório determinístico no centro */}
                {qrPattern.map((isBlack, i) => (
                  <rect
                    key={i}
                    x={50 + (i % 8) * 15}
                    y={50 + Math.floor(i / 8) * 15}
                    width="12"
                    height="12"
                    fill={isBlack ? 'black' : 'white'}
                  />
                ))}
              </svg>
            </div>
          </div>

          <div className="payment-details">
            <h3>Detalhes da Transferência</h3>
            <div className="detail-row">
              <span>Item:</span>
              <span className="detail-value">{rentalData.itemName}</span>
            </div>
            <div className="detail-row">
              <span>Período:</span>
              <span className="detail-value">{rentalData.days} dia(s)</span>
            </div>
            <div className="detail-row total">
              <span>Total:</span>
              <span className="detail-value total-price">R$ {rentalData.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="pix-info">
            <p className="info-text">
              Transação segura. Você será redirecionado para seu app de banco.
            </p>
          </div>

          <button
            onClick={handlePixConfirm}
            disabled={processing}
            className="confirm-button"
          >
            {processing ? 'Processando...' : 'Confirmar Pagamento'}
          </button>

          <button onClick={goBack} className="cancel-button">
            Usar Outro Método
          </button>
        </div>
      </div>
    );
  }

  // Tela de Formulário de Cartão
  if (showCardForm) {
    return (
      <div className="payment-container">
        <div className="payment-card">
          <div className="card-toolbar">
            <button onClick={goBack} className="back-button">Voltar</button>
          </div>
          <div className="card-header">
            <svg className="card-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M2 9H22" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h1>{paymentMethod === 'credit' ? 'Cartão de Crédito' : 'Débito em Conta'}</h1>
          </div>

          <form className="card-form" onSubmit={(e) => { e.preventDefault(); handleCardSubmit(); }}>
            <div className="form-group">
              <label>Número do Cartão</label>
              <input
                type="text"
                name="number"
                value={cardData.number}
                onChange={handleCardChange}
                placeholder="0000 0000 0000 0000"
                className="form-input"
              autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label>Titular do Cartão</label>
              <input
                type="text"
                name="holder"
                value={cardData.holder}
                onChange={(e) => setCardData(prev => ({ ...prev, holder: e.target.value.toUpperCase() }))}
                placeholder="NOME DO TITULAR"
                className="form-input"
              autoComplete="off"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Válido até</label>
                <div className="expiry-inputs">
                  <input
                    type="text"
                    name="expiryMonth"
                    value={cardData.expiryMonth}
                    onChange={handleCardChange}
                    placeholder="MM"
                    maxLength="2"
                    className="form-input"
                  autoComplete="off"
                  />
                  <span className="expiry-separator">/</span>
                  <input
                    type="text"
                    name="expiryYear"
                    value={cardData.expiryYear}
                    onChange={handleCardChange}
                    placeholder="AA"
                    maxLength="2"
                    className="form-input"
                  autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  placeholder="***"
                  maxLength="3"
                  className="form-input"
                autoComplete="off"
                />
              </div>
            </div>

            <div className="payment-details">
              <h3>Resumo</h3>
              <div className="detail-row">
                <span>Total a Pagar:</span>
                <span className="detail-value total-price">R$ {rentalData.totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="confirm-button"
            >
              {processing ? 'Processando...' : 'Confirmar Pagamento'}
            </button>
          </form>

          <button onClick={goBack} className="cancel-button">
            Usar Outro Método
          </button>
        </div>
      </div>
    );
  }

  // Tela de Seleção de Método
  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="card-toolbar">
          <button onClick={goBack} className="back-button">Voltar</button>
        </div>
        <h1>Método de Pagamento</h1>
        <p className="subtitle">Escolha como deseja pagar sua locação</p>

        <div className="payment-details">
          <h3>Resumo da Locação</h3>
          <div className="detail-row">
            <span>Item:</span>
            <span className="detail-value">{rentalData.itemName}</span>
          </div>
          <div className="detail-row">
            <span>Período:</span>
            <span className="detail-value">{rentalData.days} dia(s)</span>
          </div>
          <div className="detail-row total">
            <span>Total a Pagar:</span>
            <span className="detail-value total-price">R$ {rentalData.totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-methods">
          <div className="method-container">
            <input
              type="radio"
              id="pix"
              name="method"
              value="pix"
              checked={paymentMethod === 'pix'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="pix" className="method-label">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <rect x="4" y="4" width="4" height="4" fill="currentColor"/>
                  <rect x="10" y="4" width="4" height="4" fill="currentColor"/>
                  <rect x="16" y="4" width="4" height="4" fill="currentColor"/>
                  <rect x="4" y="10" width="4" height="4" fill="currentColor"/>
                  <rect x="10" y="10" width="4" height="4" fill="currentColor"/>
                  <rect x="4" y="16" width="4" height="4" fill="currentColor"/>
                  <rect x="10" y="16" width="4" height="4" fill="currentColor"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>PIX</h4>
                <p>Transferência instantânea</p>
              </div>
              <div className="method-badge">Rápido</div>
            </label>
          </div>

          <div className="method-container">
            <input
              type="radio"
              id="credit"
              name="method"
              value="credit"
              checked={paymentMethod === 'credit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="credit" className="method-label">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 9H22" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="19" cy="17" r="1.5" fill="currentColor"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>Crédito</h4>
                <p>Parcelado em até 12x</p>
              </div>
              <div className="method-badge">Flexível</div>
            </label>
          </div>

          <div className="method-container">
            <input
              type="radio"
              id="debit"
              name="method"
              value="debit"
              checked={paymentMethod === 'debit'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="radio-input"
            />
            <label htmlFor="debit" className="method-label">
              <div className="method-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M2 9H22" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="method-info">
                <h4>Débito</h4>
                <p>Débito em conta corrente</p>
              </div>
              <div className="method-badge">Direto</div>
            </label>
          </div>
        </div>

        <button
          onClick={handleContinuePayment}
          disabled={!paymentMethod || processing}
          className="payment-button"
        >
          {processing ? 'Processando...' : 'Continuar com Pagamento'}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodScreen;
