import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx/';
import Characters from './pages/Characters.jsx/';
import CharacterDetails from './pages/CharacterDetails.jsx/';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Este useEffect vai garantir que, para usuários logados, apareça logout em vez de login e cadastro novamente.
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // true se tiver token - desta forma vai mostrar o logout
  }, []);

  const handleLogout = () => { // lógica que vai ativar o logout quando clicado 
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="container mt-4 px-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista" element={<Home />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <ToastContainer theme="colored"
/>
    </Router>
  );
}

export default App;
