import React, { useEffect, useState } from 'react';
import { vehicleService } from '../services/api';
import ProductPhotoCarousel from '../components/ProductPhotoCarousel';
import PLACEHOLDER_DATA_URI from '../utils/placeholder';
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
    image_urls: '',
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
      // parse image_urls textarea into an array before sending
      const payload = {
        ...newVehicle,
        image_urls: parseImageUrls(newVehicle.image_urls),
      };
      console.log('[AdminVehiclesScreen] Sending payload:', payload);
      await vehicleService.create(payload);
      setNewVehicle({
        name: '',
        brand: '',
        model: '',
        year: new Date().getFullYear(),
        color: '',
        license_plate: '',
        daily_price: '',
        image_urls: '',
      });
      setShowForm(false);
      loadVehicles();
    } catch (err) {
      console.error('Erro ao adicionar:', err);
    }
  };

  const parseImageUrls = (imageUrls) => {
    if (!imageUrls) return null;
    const result = String(imageUrls)
      .split(/[,\n]/)
      .map((u) => u.trim())
      .filter(Boolean);
    console.log('[parseImageUrls Vehicle] Input:', imageUrls, '| Output:', result);
    return result.length > 0 ? result : null;
  };

  const previewImages = parseImageUrls(newVehicle.image_urls) || [];

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

          <div className="form-group">
            <label>Fotos do veículo (URLs separadas por vírgula ou uma por linha)</label>
            <textarea
              value={newVehicle.image_urls}
              onChange={(e) => setNewVehicle({ ...newVehicle, image_urls: e.target.value })}
              className="form-textarea"
              placeholder="https://...\nhttps://..."
              rows="3"
            />
            {previewImages.length > 0 && (
              <div className="image-preview-grid">
                {previewImages.map((src, idx) => (
                  <div key={src + idx} className="image-preview-item">
                    <img
                      src={src}
                      alt={`Preview ${idx + 1}`}
                      onError={(e) => { e.currentTarget.src = PLACEHOLDER_DATA_URI; }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="btn-submit">Adicionar Veículo</button>
        </form>
      )}

      <div className="admin-products-grid">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="admin-product-card">
            <ProductPhotoCarousel
              type="vehicle"
              name={vehicle.name}
              brand={vehicle.brand}
              model={vehicle.model}
              imageUrls={vehicle.image_urls}
            />

            <div className="admin-product-body">
              <div className="admin-product-heading">
                <h2>{vehicle.name}</h2>
                <span className="admin-product-price">R$ {parseFloat(vehicle.daily_price).toFixed(2)}/dia</span>
              </div>

              <div className="admin-product-meta">
                <p><strong>Marca:</strong> {vehicle.brand}</p>
                <p><strong>Modelo:</strong> {vehicle.model}</p>
                <p><strong>Ano:</strong> {vehicle.year}</p>
                <p><strong>Cor:</strong> {vehicle.color || 'Não informada'}</p>
                <p><strong>Placa:</strong> {vehicle.license_plate}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminVehiclesScreen;
