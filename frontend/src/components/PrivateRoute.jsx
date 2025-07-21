import { Navigate } from 'react-router-dom';

// Página que garante que o não-logado vai cair na página de login

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
