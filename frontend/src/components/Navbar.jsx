import { Link } from 'react-router-dom';
import logo from '../assets/minha-foto.jpg';
import '../assets/css/navbar.css';



export default function Navbar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
      <div className="container navbar-content px-3">
        <Link className="navbar-brand d-flex align-items-center m-0 gap-3" to="/">
          <img src={logo} alt="Minha Foto" className="rounded-circle" height="40" width="40" />
          <span className="title">Teste Vitafor</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav d-flex align-items-center gap-2">
            {/* Links SEMPRE visíveis */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Personagens</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/characters">Salvos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Mim</Link>
            </li>

            {/* Login/Cadastro ou Logout */}
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Cadastro</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
