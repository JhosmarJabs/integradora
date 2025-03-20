import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./layouts/Navbar.js";
import Footer from "./layouts/Footer.js";
import Inicio from "./pages/public/Inicio.js";
import Productos from "./pages/public/Productos.js";
import Servicios from "./pages/public/Servicios.js";
import Nosotros from "./pages/public/Nosotros.js";
import Contacto from "./pages/public/Contacto.js";
import Login from "./pages/public/Login.js";

// Páginas privadas
import DashboardPrivado from "./pages/private/DashboardPrivado.js";
import Dispositivos from "./pages/private/Dispositivos.js";
import Perfil from "./pages/private/Perfil.js";
import PrivateLayout from "./layouts/PrivateLayout.js";

// Componentes Administrativos
import AdminLayout from "./layouts/AdminLayout.js";
import Dashboard from "./pages/admin/Dashboard.js";
import UsuariosGeneral from "./pages/admin/usuarios/UsuariosGeneral.js";
import UsuariosAltas from "./pages/admin/usuarios/UsuariosAltas.js";
import UsuariosBajas from "./pages/admin/usuarios/UsuariosBajas.js";
import UsuariosCambios from "./pages/admin/usuarios/UsuariosCambios.js";
import IoTGeneral from "./pages/admin/iot/IoTGeneral.js";
import IoTVinculacion from "./pages/admin/iot/IoTVinculacion.js";
import IoTAltas from "./pages/admin/iot/IoTAltas.js";
import IoTBajas from "./pages/admin/iot/IoTBajas.js";
import IoTUsuarios from "./pages/admin/iot/IoTUsuarios.js";
import InformacionModificacion from "./pages/admin/informacion/InformacionModificacion.js";
import InformacionVista from "./pages/admin/informacion/InformacionVista.js";
import PoliticasGeneral from "./pages/admin/politicas/PoliticasGeneral.js";
import PoliticasEmpresa from "./pages/admin/politicas/PoliticasEmpresa.js";
import PoliticasPrivacidad from "./pages/admin/politicas/PoliticasPrivacidad.js";
import PoliticasCliente from "./pages/admin/politicas/PoliticasCliente.js";
import PreguntasGeneral from "./pages/admin/preguntas/PreguntasGeneral.js";
import PreguntasAltas from "./pages/admin/preguntas/PreguntasAltas.js";
import PreguntasBajas from "./pages/admin/preguntas/PreguntasBajas.js";
import PreguntasCambios from "./pages/admin/preguntas/PreguntasCambios.js";

const PublicRoute = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/verify-session", {
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
    .then(res => res.json())
    .then(data => {
        if (data.loggedIn) {
            setUser({ role: data.role });
        }
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
  }, []);



  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PublicRoute><Inicio /></PublicRoute>} />
          <Route path="/productos" element={<PublicRoute><Productos /></PublicRoute>} />
          <Route path="/servicios" element={<PublicRoute><Servicios /></PublicRoute>} />
          <Route path="/nosotros" element={<PublicRoute><Nosotros /></PublicRoute>} />
          <Route path="/contacto" element={<PublicRoute><Contacto /></PublicRoute>} />
          <Route 
            path="/login" 
            element={
              user 
                ? (user.role === "admin" 
                    ? <Navigate to="/admin/dashboard" /> 
                    : <Navigate to="/privado/dashboard" />)
                : <PublicRoute><Login /></PublicRoute>
            } 
          />

          {/* Rutas Privadas (Clientes) */}
          <Route 
            path="/privado/dashboard" 
            element={user && user.role === "cliente" ? <DashboardPrivado /> : <Navigate to="/login" />}
          >
            <Route index element={<DashboardPrivado />} />
            <Route path="dashboard" element={<DashboardPrivado />} />
            <Route path="dispositivos" element={<Dispositivos />} />
            <Route path="perfil" element={<Perfil />} />
          </Route>

          {/* Rutas Administrativas */}
          <Route 
            path="/admin/dashboard" 
            element={user && user.role === "admin" ? <Dashboard /> : <Navigate to="/login" />} 
          >
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<UsuariosGeneral />} />
            <Route path="usuarios/altas" element={<UsuariosAltas />} />
            <Route path="usuarios/bajas" element={<UsuariosBajas />} />
            <Route path="usuarios/cambios" element={<UsuariosCambios />} />
            <Route path="iot" element={<IoTGeneral />} />
            <Route path="iot/vinculacion" element={<IoTVinculacion />} />
            <Route path="iot/altas" element={<IoTAltas />} />
            <Route path="iot/bajas" element={<IoTBajas />} />
            <Route path="iot/usuarios" element={<IoTUsuarios />} />
            <Route path="informacion/modificacion" element={<InformacionModificacion />} />
            <Route path="informacion/vista" element={<InformacionVista />} />
            <Route path="politicas" element={<PoliticasGeneral />} />
            <Route path="politicas/empresa" element={<PoliticasEmpresa />} />
            <Route path="politicas/privacidad" element={<PoliticasPrivacidad />} />
            <Route path="politicas/cliente" element={<PoliticasCliente />} />
            <Route path="preguntas" element={<PreguntasGeneral />} />
            <Route path="preguntas/altas" element={<PreguntasAltas />} />
            <Route path="preguntas/bajas" element={<PreguntasBajas />} />
            <Route path="preguntas/cambios" element={<PreguntasCambios />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
