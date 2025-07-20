import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx/';
import Characters from './pages/Characters.jsx/';
import CharacterDetails from './pages/CharacterDetails.jsx/';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute.jsx'; // cria isso!

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>

        {/* Redirecionar não logado pro login */}
        <Route path="/" element={
          isLoggedIn ? <Navigate to="/lista" /> : <Navigate to="/login" />
        } />

        {/* Acessível sem login */}
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route path="/lista" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/characters" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Characters />
          </PrivateRoute>
        } />
        <Route path="/characters/:id" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <CharacterDetails />
          </PrivateRoute>
        } />
        <Route path="/about" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <About />
          </PrivateRoute>
        } />

      </Routes>
      <ToastContainer theme="colored" />
    </Router>
  );
}

export default App;
