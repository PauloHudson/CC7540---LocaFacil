import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './ProfileScreen.css';

const ProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    cpf: user?.cpf || '',
  });

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
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Meu Perfil</h1>

        {isEditing ? (
          <form className="profile-form">
            <div className="form-group">
              <label>Nome</label>
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
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
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
            </div>

            <div className="form-actions">
              <button onClick={handleSave} className="btn-save">Salvar</button>
              <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancelar</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <div className="info-group">
              <label>Nome</label>
              <p>{user?.name}</p>
            </div>

            <div className="info-group">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>

            <div className="info-group">
              <label>Telefone</label>
              <p>{user?.phone}</p>
            </div>

            <div className="info-group">
              <label>CPF</label>
              <p>{user?.cpf}</p>
            </div>

            <div className="info-group">
              <label>Tipo de Conta</label>
              <p>{user?.is_admin ? 'Administrador' : 'Usuário Comum'}</p>
            </div>

            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="btn-edit">Editar Perfil</button>
              <button onClick={handleLogout} className="btn-logout">Sair</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
