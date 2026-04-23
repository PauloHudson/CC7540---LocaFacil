import React, { useEffect, useState } from 'react';
import { vehicleService } from '../services/api';
import './AdminScreens.css';

const AdminVehiclesScreen = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    license_plate: '',
    daily_price: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleService.getAll();
      setVehicles(response.data);
    } catch (err) {
      console.error('Erro ao carregar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();
    try {
      await vehicleService.create(newVehicle);
      setNewVehicle({
        name: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        license_plate: '',
        daily_price: '',
      });
      setShowForm(false);
      loadVehicles();
    } catch (err) {
      console.error('Erro ao adicionar:', err);
    }
  };

  if (loading) {
    return <div className="admin-container"><div className="loading">Carregando...</div></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Gerenciar Veículos</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-add">
          {showForm ? 'Cancelar' : '+ Novo Veículo'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddVehicle} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={newVehicle.name}
                onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                value={newVehicle.brand}
                onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Modelo</label>
              <input
                type="text"
                value={newVehicle.model}
                onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Ano</label>
              <input
                type="number"
                value={newVehicle.year}
                onChange={(e) => setNewVehicle({ ...newVehicle, year: e.target.value })}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Cor</label>
              <input
                type="text"
                value={newVehicle.color}
                onChange={(e) => setNewVehicle({ ...newVehicle, color: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Placa</label>
              <input
                type="text"
                value={newVehicle.license_plate}
                onChange={(e) => setNewVehicle({ ...newVehicle, license_plate: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Preço Diário</label>
            <input
              type="number"
              step="0.01"
              value={newVehicle.daily_price}
              onChange={(e) => setNewVehicle({ ...newVehicle, daily_price: e.target.value })}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="btn-submit">Adicionar Veículo</button>
        </form>
      )}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Placa</th>
              <th>Preço/dia</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map(vehicle => (
              <tr key={vehicle.id}>
                <td>{vehicle.name}</td>
                <td>{vehicle.brand}</td>
                <td>{vehicle.model}</td>
                <td>{vehicle.license_plate}</td>
                <td>R$ {parseFloat(vehicle.daily_price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVehiclesScreen;
