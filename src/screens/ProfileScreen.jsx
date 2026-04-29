import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { rentalService } from '../services/api';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [rentals, setRentals] = useState([]);
  const [loadingRentals, setLoadingRentals] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
  });

  useEffect(() => {
    loadRentals();
  }, []);

  const loadRentals = async () => {
    try {
      setLoadingRentals(true);
      // Simulando carregamento de locações
      // Em produção, fazer chamada real à API
      setRentals([]);
    } catch (err) {
      console.error('Erro ao carregar locações:', err);
    } finally {
      setLoadingRentals(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    // Aqui você poderia enviar as alterações para o servidor
    console.log('Salvando perfil:', formData);
    setIsEditing(false);
  };

  const maskCPF = (cpf) => {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const maskPhone = (phone) => {
    if (!phone) return '';
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  return (
    <div className="profile-container">
      {/* Card de Perfil */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="profile-title">
            <h1>{user?.name}</h1>
            <p className="profile-type">{user?.is_admin ? 'Administrador' : 'Usuário Comum'}</p>
          </div>
        </div>

        {isEditing ? (
          <form className="profile-form">
            <h2>Editar Perfil</h2>

            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                disabled
              />
              <small>Email não pode ser alterado</small>
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Ex: 11999999999"
              />
            </div>

            <div className="form-group">
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className="form-input"
                disabled
              />
              <small>CPF não pode ser alterado</small>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleSave} className="btn-save">Salvar Alterações</button>
              <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">Cancelar</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-section">
              <h3>Informações Pessoais</h3>
              
              <div className="info-group">
                <label> Email</label>
                <p>{user?.email}</p>
              </div>

              <div className="info-group">
                <label>Telefone</label>
                <p>{user?.phone ? maskPhone(user.phone) : 'Não informado'}</p>
              </div>

              <div className="info-group">
                <label> CPF</label>
                <p>{user?.cpf ? maskCPF(user.cpf) : 'Não informado'}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="btn-edit"> Editar Perfil</button>
              <button onClick={handleLogout} className="btn-logout"> Sair da Conta</button>
            </div>
          </div>
        )}
      </div>

      {/* Card de Atividades */}
      <div className="activity-card">
        <h2>Minhas Locações</h2>
        {loadingRentals ? (
          <p className="loading">Carregando locações...</p>
        ) : rentals.length === 0 ? (
          <div className="empty-state">
            <p>Nenhuma locação ainda</p>
            <button onClick={() => navigate('/vehicles')} className="btn-rent">
              Começar a Alugar
            </button>
          </div>
        ) : (
          <div className="rentals-list">
            {rentals.map((rental) => (
              <div key={rental.id} className="rental-item">
                <p>{rental.item_name}</p>
                <span>{rental.total_price}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
