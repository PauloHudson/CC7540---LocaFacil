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
    confirmPassword: '',
    phone: '',
    cpf: '',
  });
  const [formError, setFormError] = useState('');

  const mapRegisterError = (rawError) => {
    const normalizedError = String(rawError || '').toLowerCase();

    if (normalizedError.includes('cpf') && normalizedError.includes('cadastrado')) {
      return 'CPF já cadastrado. Tente outro CPF ou faça login.';
    }

    if (normalizedError.includes('email') && normalizedError.includes('cadastrado')) {
      return 'Email já está cadastrado. Use outro email ou faça login.';
    }

    if (normalizedError.includes('invalido') || normalizedError.includes('inválido')) {
      return 'Dados inválidos. Verifique e tente novamente.';
    }

    return rawError || 'Falha no cadastro. Tente novamente mais tarde.';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validações
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };

  const isValidPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length >= 10;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setFormError('');

    const { name, email, password, confirmPassword, phone, cpf } = formData;

    // Validações básicas
    if (!name || !email || !password || !confirmPassword || !phone || !cpf) {
      setFormError('Preencha todos os campos');
      return;
    }

    // Validar nome
    if (name.length < 3) {
      setFormError('Nome deve ter pelo menos 3 caracteres');
      return;
    }

    // Validar email
    if (!isValidEmail(email)) {
      setFormError('Email inválido. Use um formato válido (ex: seu@email.com)');
      return;
    }

    // Validar CPF
    if (!isValidCPF(cpf)) {
      setFormError('CPF inválido. Digite 11 números');
      return;
    }

    // Validar telefone
    if (!isValidPhone(phone)) {
      setFormError('Telefone inválido. Use formato com DDD (ex: 11999999999)');
      return;
    }

    // Validar senha
    if (password.length < 6) {
      setFormError('Senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Validar confirmação de senha
    if (password !== confirmPassword) {
      setFormError('Senhas não conferem. Verifique!');
      return;
    }

    try {
      await register(name, email, password, phone, cpf);
      navigate('/vehicles');
    } catch (err) {
      const apiError = err.response?.data?.error || error || 'Falha no cadastro. Tente novamente mais tarde.';
      setFormError(mapRegisterError(apiError));
      console.error('Erro de registro:', err.response?.data);
    }
  };

  const displayedError = formError || (error ? mapRegisterError(error) : '');

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-logo">LocaFácil</h1>
        <h2 className="auth-subtitle">Crie sua conta</h2>

        <form onSubmit={handleRegister} className="auth-form">
          {displayedError && <div className="form-error">{displayedError}</div>}

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
              placeholder="Senha (mín. 6 caracteres)"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="tel"
              name="phone"
              placeholder="Telefone (DDD + número)"
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
              placeholder="CPF (11 números)"
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
