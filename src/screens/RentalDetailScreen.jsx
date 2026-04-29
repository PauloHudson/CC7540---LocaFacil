import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { rentalService, insuranceService } from '../services/api';
import './RentalDetailScreen.css';

const RentalDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();
  const { token } = useContext(AuthContext);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [insuranceOptions, setInsuranceOptions] = useState([]);
  const [insuranceId, setInsuranceId] = useState('');

  // Dados do item vindo do state de navegação
  const item = location.state?.vehicle || location.state?.item;
  const rentalType = location.state?.type || type;

  useEffect(() => {
    if (rentalType !== 'vehicle') {
      setInsuranceOptions([]);
      setInsuranceId('');
      return;
    }

    const loadInsurance = async () => {
      try {
        const response = await insuranceService.getAll();
        setInsuranceOptions(response.data || []);
      } catch (err) {
        console.error('Erro ao carregar seguros:', err);
      }
    };

    loadInsurance();
  }, [rentalType]);

  // Calcular preços dinâmicos
  const calculatePrices = () => {
    if (!startDate || !endDate) {
      return { days: 0, itemTotal: 0, insuranceTotal: 0, grandTotal: 0 };
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      return { days: 0, itemTotal: 0, insuranceTotal: 0, grandTotal: 0 };
    }

    const itemDailyPrice = Number(item?.daily_price || 0);
    const itemTotal = itemDailyPrice * days;

    let insuranceTotal = 0;
    if (insuranceId) {
      const selected = insuranceOptions.find((opt) => String(opt.id) === insuranceId);
      const insuranceDailyPrice = Number(selected?.daily_price || 0);
      insuranceTotal = insuranceDailyPrice * days;
    }

    const grandTotal = itemTotal + insuranceTotal;

    return { days, itemTotal, insuranceTotal, grandTotal };
  };

  const { days, itemTotal, insuranceTotal, grandTotal } = calculatePrices();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!startDate || !endDate) {
      setError('⚠️ Selecione as datas');
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      setError('A data final deve ser depois da data inicial');
      return;
    }

    if (days <= 0) {
      setError('Selecione datas válidas');
      return;
    }

    try {
      setLoading(true);
      
      if (!item?.id) {
        setError('Item não selecionado');
        setLoading(false);
        return;
      }

      const payload = {
        start_date: startDate,
        end_date: endDate,
      };

      // Adicionar o ID correto baseado no tipo
      if (rentalType === 'vehicle') {
        payload.vehicle_id = item.id;
        if (insuranceId) {
          const selected = insuranceOptions.find((opt) => String(opt.id) === insuranceId);
          payload.insurance_selected = true;
          payload.insurance_price = Number(selected?.daily_price || 0);
        } else {
          payload.insurance_selected = false;
          payload.insurance_price = 0;
        }
      } else if (rentalType === 'electronic') {
        payload.electronic_id = item.id;
      }

      await rentalService.create(payload);
      
      // Preparar dados para a tela de pagamento
      const rentalData = {
        itemName: item?.name || 'Item de Aluguel',
        days: days,
        itemPrice: itemTotal,
        insurancePrice: insuranceTotal,
        totalPrice: grandTotal,
      };

      // Navegar para tela de pagamento
      navigate('/payment', { state: { rentalData } });
    } catch (err) {
      setError('Erro na locação. Tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const selectedInsurance = insuranceId 
    ? insuranceOptions.find((opt) => String(opt.id) === insuranceId) 
    : null;

  return (
    <div className="rental-container">
      <button onClick={() => navigate(-1)} className="back-button">← Voltar</button>

      <div className="rental-card">
        <h1>Detalhes da Locação</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="rental-form">
          <div className="form-section">
            <h2>{item?.name || 'Item'}</h2>
            <p className="price">
              R$ {Number(item?.daily_price || 0).toFixed(2)}/dia
            </p>
          </div>

          <div className="form-group">
            <label>Data de Início</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Data de Término</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          {rentalType === 'vehicle' && (
            <div className="form-group">
              <label>Seguro (Opcional)</label>
              <select
                value={insuranceId}
                onChange={(e) => setInsuranceId(e.target.value)}
                disabled={loading}
                className="form-input"
              >
                <option value="">Sem seguro</option>
                {insuranceOptions.map((opt) => (
                  <option key={opt.id} value={String(opt.id)}>
                    {opt.name} - R$ {Number(opt.daily_price || 0).toFixed(2)}/dia
                  </option>
                ))}
              </select>
              {selectedInsurance && (
                <p className="insurance-note">
                  ✓ {selectedInsurance.description}
                </p>
              )}
            </div>
          )}

          {/* Resumo de Custos */}
          {days > 0 && (
            <div className="price-summary">
              <h3>Resumo de Custos</h3>
              <div className="summary-row">
                <span>Item: R$ {Number(item?.daily_price || 0).toFixed(2)} × {days} dia(s)</span>
                <span className="summary-value">R$ {itemTotal.toFixed(2)}</span>
              </div>
              {insuranceTotal > 0 && (
                <div className="summary-row">
                  <span>Seguro: R$ {Number(selectedInsurance?.daily_price || 0).toFixed(2)} × {days} dia(s)</span>
                  <span className="summary-value">R$ {insuranceTotal.toFixed(2)}</span>
                </div>
              )}
              <div className="summary-row total">
                <span>Total a Pagar</span>
                <span className="total-amount">R$ {grandTotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button type="submit" disabled={loading || days === 0} className="submit-button">
            {loading ? 'Processando...' : days === 0 ? 'Selecione as datas' : 'Continuar para Pagamento'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RentalDetailScreen;
