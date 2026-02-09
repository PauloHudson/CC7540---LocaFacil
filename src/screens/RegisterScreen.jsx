import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthScreens.css';

const RegisterScreen = () => {
  const { register, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    cpf: '',
  });
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');

    const { name, email, password, phone, cpf } = formData;

    if (!name || !email || !password || !phone || !cpf) {
      setFormError('Preencha tudo');
      return;
    }

    if (password.length < 6) {
      setFormError('Senha min 6');
      return;
    }

    try {
      await register(name, email, password, phone, cpf);
      navigate('/vehicles');
    } catch (err) {
      setFormError(error || 'Falha no cadastro');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">LocaFácil</h1>
        <h2 className="auth-subtitle">Crie sua conta</h2>

        <form onSubmit={handleRegister} className="auth-form">
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nome completo"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Telefone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-button"
          >
            {loading ? 'Registrando...' : 'Registrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Já tem conta? <Link to="/login" className="auth-link">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
