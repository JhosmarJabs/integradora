import { Outlet, Navigate } from "react-router-dom";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { colors, typography } from '../styles/styles';

const PrivateLayout = () => {
  // Aquí deberías verificar si el usuario está autenticado
  const isAuthenticated = true; // Cambiar esto con la lógica real

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Zona Privada</h1>
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
