import React, { useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if(form.password !== form.password_confirmation) {
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

  return (
    <>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px' }}>
        <div className="mb-3">
          <label>Nome</label>
          <input type="text" name="name" className="form-control" value={form.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Senha</label>
          <input type="password" name="password" className="form-control" value={form.password} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Confirmar Senha</label>
          <input type="password" name="password_confirmation" className="form-control" value={form.password_confirmation} onChange={handleChange} required />
        </div>
        <button className="btn btn-success" type="submit">Cadastrar</button>
      </form>
    </>
  );
}

export default Register;
