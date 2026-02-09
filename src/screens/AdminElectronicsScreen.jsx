import React, { useEffect, useState } from 'react';
import { electronicsService } from '../services/api';
import './AdminScreens.css';

const AdminElectronicsScreen = () => {
  const [electronics, setElectronics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    model: '',
    daily_price: '',
    stock: 1,
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadElectronics();
  }, []);

  const loadElectronics = async () => {
    try {
      setLoading(true);
      const response = await electronicsService.getAll();
      setElectronics(response.data);
    } catch (err) {
      console.error('Erro ao carregar:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      await electronicsService.create(newItem);
      setNewItem({
        name: '',
        brand: '',
        model: '',
        daily_price: '',
        stock: 1,
      });
      setShowForm(false);
      loadElectronics();
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
        <h1>Gerenciar Eletrônicos</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-add">
          {showForm ? 'Cancelar' : '+ Novo Eletrônico'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddItem} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Nome</label>
              <input
                type="text"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input
                type="text"
                value={newItem.brand}
                onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
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
                value={newItem.model}
                onChange={(e) => setNewItem({ ...newItem, model: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Preço Diário</label>
              <input
                type="number"
                step="0.01"
                value={newItem.daily_price}
                onChange={(e) => setNewItem({ ...newItem, daily_price: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>



          <button type="submit" className="btn-submit">Adicionar Eletrônico</button>
        </form>
      )}

      <div className="admin-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Preço/dia</th>
            </tr>
          </thead>
          <tbody>
            {electronics.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>R$ {parseFloat(item.daily_price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminElectronicsScreen;
