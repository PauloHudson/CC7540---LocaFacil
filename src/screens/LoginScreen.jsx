import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AuthScreens.css';

const LoginScreen = () => {
  const { login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Preencha email e senha');
      return;
    }

    try {
      await login(email, password);
      navigate('/vehicles');
    } catch (err) {
      setFormError(error || 'Falha no login');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">LocaFácil</h1>
        <h2 className="auth-subtitle">Bem-vindo de volta!</h2>

        <form onSubmit={handleLogin} className="auth-form">
          {formError && <div className="form-error">{formError}</div>}

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="form-input"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-button"
          >
            {loading ? 'Autenticando...' : 'Entrar'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Não tem conta? <Link to="/register" className="auth-link">Registre-se</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
