import { Outlet, Navigate } from "react-router-dom";

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
