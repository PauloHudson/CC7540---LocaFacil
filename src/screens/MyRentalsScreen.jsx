import React, { useEffect, useState } from 'react';
import { rentalService } from '../services/api';
import './MyRentalsScreen.css';

const MyRentalsScreen = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDaysRemaining = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      return 0;
    }
    const diffMs = end - start;
    return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  };

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      setLoading(true);
      const response = await rentalService.getUserRentals();
      setRentals(response.data);
    } catch (err) {
      setError('Erro ao carregar');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rentals-container">
        <div className="loading">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="rentals-container">
      <div className="rentals-header">
        <h1 className="rentals-title">Minhas Locações</h1>
        <button onClick={loadRentals} className="refresh-btn">Atualizar</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="rentals-list">
        {rentals.map(rental => (
          <div key={rental.id} className="rental-item">
            <div className="rental-info">
              <h3>{rental.vehicle_name || rental.electronic_name || 'Item'}</h3>
              <div className="rental-details">
                <span className="detail-badge">
                  {new Date(rental.start_date).toLocaleDateString('pt-BR')} até {new Date(rental.end_date).toLocaleDateString('pt-BR')}
                </span>
                <span className={`status-badge status-${rental.status}`}>
                  {rental.status}
                </span>
              </div>
              <p className="rental-amount">
                R$ {Number(rental.final_total ?? rental.total_price ?? 0).toFixed(2)}
              </p>
              <div className="rental-extra">
                <span className="detail-badge">
                  Diaria: R$ {Number(rental.daily_rate || 0).toFixed(2)}
                </span>
                <span className="detail-badge">
                  Total base: R$ {Number(rental.total_price || 0).toFixed(2)}
                </span>
                <span className="detail-badge">
                  Dias restantes: {getDaysRemaining(rental.start_date, rental.end_date)}
                </span>
                {rental.insurance_selected && (
                  <span className="detail-badge">
                    Seguro: R$ {Number(rental.insurance_price || 0).toFixed(2)}/dia
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {rentals.length === 0 && !loading && (
        <div className="empty-state">
          <p>Sem locacoes</p>
        </div>
      )}
    </div>
  );
};

export default MyRentalsScreen;
