import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { togglePasswordInput } from '../assets/js/password.js';
import '../assets/css/login.css';

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.password_confirmation) {
      toast.error('As senhas não conferem');
      return;
    }
    try {
      await api.post('/register', form);
      toast.success('Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao cadastrar');
    }
  };

  const togglePassword = () => {
    togglePasswordInput('password');
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPassword = () => {
    togglePasswordInput('password_confirmation');
    setShowConfirmPassword(prev => !prev);
  };

  return (
    <main className="register-main d-flex">
      <section className="register-first">
        <img
          src="/assets/img/wallhaven-4yp3z7.png"
          className="object-fit-cover"
          alt="Wallpaper Rick and Morty"
        />
      </section>
      <section className="register-second login-second gap-4 align-items-center mt-5">
        <h1 className="display-2 mb-0">Cadastro</h1>
        <form
          className="w-100 d-flex flex-column gap-3 align-items-center"
          onSubmit={handleSubmit}
          style={{ maxWidth: '400px' }}
        >
          <div className="mb-3">
            <input
              placeholder="Nome"
              type="text"
              name="name"
              className="form-control form-control m-auto fs-4 pass-input rounded-pill p-2 ps-4 pe-5"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="E-mail"
              type="email"
              name="email"
              className="form-control form-control m-auto fs-4 pass-input rounded-pill p-2 ps-4 pe-5"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Senha"
              className="form-control m-auto fs-4 pass-input rounded-pill p-2 ps-4 pe-5"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={togglePassword}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? (
                <EyeOff size={30} strokeWidth={1} stroke="#4A4A4A" />
              ) : (
                <Eye size={30} strokeWidth={1} stroke="#4A4A4A" />
              )}
            </span>
          </div>
          <div className="mb-3 position-relative">
            <input
              id="password_confirmation"
              type={showConfirmPassword ? 'text' : 'password'}
              name="password_confirmation"
              placeholder="Confirmar Senha"
              className="form-control form-control m-auto fs-4 pass-input rounded-pill p-2 ps-4 pe-5"
              value={form.password_confirmation}
              onChange={handleChange}
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              onClick={toggleConfirmPassword}
              style={{ cursor: 'pointer' }}
            >
              {showConfirmPassword ? (
                <EyeOff size={30} strokeWidth={1} stroke="#4A4A4A" />
              ) : (
                <Eye size={30} strokeWidth={1} stroke="#4A4A4A" />
              )}
            </span>
          </div>
          <button className="btn btn-primary w-50 fs-4" type="submit">
            Cadastrar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Register;
