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
      setFormError('⚠️ Preencha email e senha');
      return;
    }

    if (!email.includes('@')) {
      setFormError('⚠️ Email inválido');
      return;
    }

    try {
      const response = await login(email, password);
      const isAdmin = response?.user?.is_admin;
      navigate(isAdmin ? '/admin/vehicles' : '/vehicles');
    } catch (err) {
      // Melhor tratamento de erros específicos
      if (error?.includes('não encontrado')) {
        setFormError('Email não cadastrado. Verifique ou crie uma conta.');
      } else if (error?.includes('senha')) {
        setFormError('Senha incorreta. Tente novamente.');
      } else if (error?.includes('não encontrada')) {
        setFormError('Email ou senha inválidos.');
      } else {
        setFormError(error || 'Falha no login. Tente novamente.');
      }
      console.error('Erro de login:', err.response?.data);
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
