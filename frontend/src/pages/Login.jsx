// Login.jsx
import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../assets/css/login.css';
import { Eye, EyeOff } from 'lucide-react';
import { togglePasswordInput } from '../assets/js/password.js';

// Página de Login

function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsLoggedIn(true);
      toast.success('Logado com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error(error.message ||  'Erro ao fazer login');
    }
  };

  const handleTogglePassword = () => {
    togglePasswordInput('password');
    setShowPassword(prev => !prev);
  }; // Vai trabalhar com a funcionalidade de mostrar ou ocultar a senha

  return (
    <main className="login-main d-flex">
      <section className="login-first">
        <img src="/assets/img/wallhaven-4yp3z7.png" className='object-fit-cover' alt="Wallpaper Rick and Morty" />
      </section>
      <section className="login-second gap-4 align-items-center mt-5">
        <h1 className='display-2 mt-5'>Login</h1>
        <form className='w-100 d-flex flex-column gap-3 align-items-center' onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
          <div className="mb-3">
            <input type="email" name="email" placeholder='Email' className="form-control m-auto fs-4 rounded rounded-pill p-2 ps-4 pe-5" value={form.email} onChange={handleChange} required />
          </div>
          <div className="mb-3 pass-area position-relative">
            <input id="password" type={showPassword ? 'text' : 'password'} name="password" placeholder='Senha' className="form-control m-auto fs-4 pass-input rounded-pill p-2 ps-4 pe-5" value={form.password} onChange={handleChange} required />
            <span className="position-absolute top-50 end-0 translate-middle-y me-3" onClick={handleTogglePassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <EyeOff size={30} strokeWidth={1} stroke="#4A4A4A" /> : <Eye size={30} strokeWidth={1} stroke="#4A4A4A" />}
            </span>
          </div>
          <button className="btn btn-primary w-50 fs-4" type="submit">Entrar</button>
        </form>
      </section>
    </main>
  );
}

export default Login;
