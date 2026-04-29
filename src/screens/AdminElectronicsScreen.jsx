import React, { useEffect, useState } from 'react';
import { electronicsService } from '../services/api';
import ProductPhotoCarousel from '../components/ProductPhotoCarousel';
import PLACEHOLDER_DATA_URI from '../utils/placeholder';
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
    image_urls: '',
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
      const payload = {
        ...newItem,
        image_urls: parseImageUrls(newItem.image_urls),
      };
      console.log('[AdminElectronicsScreen] Sending payload:', payload);
      await electronicsService.create(payload);
      setNewItem({
        name: '',
        brand: '',
        model: '',
        daily_price: '',
        stock: 1,
        image_urls: '',
      });
      setShowForm(false);
      loadElectronics();
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
    console.log('[parseImageUrls Electronics] Input:', imageUrls, '| Output:', result);
    return result.length > 0 ? result : null;
  };

  const previewImages = parseImageUrls(newItem.image_urls) || [];

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

            <div className="form-group">
              <label>Fotos do eletrônico (URLs separadas por vírgula ou uma por linha)</label>
              <textarea
                value={newItem.image_urls}
                onChange={(e) => setNewItem({ ...newItem, image_urls: e.target.value })}
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
          </div>



          <button type="submit" className="btn-submit">Adicionar Eletrônico</button>
        </form>
      )}

      <div className="admin-products-grid">
        {electronics.map((item) => (
          <article key={item.id} className="admin-product-card">
            <ProductPhotoCarousel
              type="electronic"
              name={item.name}
              brand={item.brand}
              model={item.model}
              imageUrls={item.image_urls}
            />

            <div className="admin-product-body">
              <div className="admin-product-heading">
                <h2>{item.name}</h2>
                <span className="admin-product-price">R$ {parseFloat(item.daily_price).toFixed(2)}/dia</span>
              </div>

              <div className="admin-product-meta">
                <p><strong>Marca:</strong> {item.brand}</p>
                <p><strong>Modelo:</strong> {item.model || 'Não informado'}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AdminElectronicsScreen;
