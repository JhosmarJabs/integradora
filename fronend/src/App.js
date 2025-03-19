import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './layouts/Navbar'; 
import Footer from './layouts/Footer';
import Inicio from './pages/public/Inicio.js';
import Productos from './pages/public/Productos';
import ProductoDetalle from './pages/public/ProductoDetalle'; // Importamos el componente de detalle
import Servicios from './pages/public/Servicios';
import Nosotros from './pages/public/Nosotros';
import Contacto from './pages/public/Contacto';
import Login from './pages/public/Login';

// Páginas privadas
import DashboardPrivado from './pages/private/DashboardPrivado';
import Dispositivos from './pages/private/Dispositivos';
import Perfil from './pages/private/Perfil';
import PrivateLayout from './layouts/PrivateLayout';

// Componentes Administrativos
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';

// Componentes de Usuarios
import UsuariosGeneral from './pages/admin/usuarios/UsuariosGeneral.js';
import UsuariosAltas from './pages/admin/usuarios/UsuariosAltas.js';
import UsuariosBajas from './pages/admin/usuarios/UsuariosBajas.js';
import UsuariosCambios from './pages/admin/usuarios/UsuariosCambios.js';

// Componentes de IoT
import IoTGeneral from './pages/admin/iot/IoTGeneral.js';
import IoTVinculacion from './pages/admin/iot/IoTVinculacion.js';
import IoTAltas from './pages/admin/iot/IoTAltas.js';
import IoTBajas from './pages/admin/iot/IoTBajas.js';
import IoTUsuarios from './pages/admin/iot/IoTUsuarios.js';

// Componentes de Información
import InformacionModificacion from './pages/admin/informacion/InformacionModificacion.js';
import InformacionVista from './pages/admin/informacion/InformacionVista.js';

// Componentes de Políticas
import PoliticasGeneral from './pages/admin/politicas/PoliticasGeneral.js';
import PoliticasEmpresa from './pages/admin/politicas/PoliticasEmpresa.js';
import PoliticasPrivacidad from './pages/admin/politicas/PoliticasPrivacidad.js';
import PoliticasCliente from './pages/admin/politicas/PoliticasCliente.js';

// Componentes de Preguntas Frecuentes
import PreguntasGeneral from './pages/admin/preguntas/PreguntasGeneral.js';
import PreguntasAltas from './pages/admin/preguntas/PreguntasAltas.js';
import PreguntasBajas from './pages/admin/preguntas/PreguntasBajas.js';
import PreguntasCambios from './pages/admin/preguntas/PreguntasCambios.js';
// Componente de 
import IoTTests from './pages/admin/iot/IoTTest.js';
// Componente para envolver las rutas públicas
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
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicRoute><Inicio /></PublicRoute>} />
          <Route path="/productos" element={<PublicRoute><Productos /></PublicRoute>} />
          <Route path="/producto/:id" element={<PublicRoute><ProductoDetalle /></PublicRoute>} /> {/* Nueva ruta para detalle de producto */}
          <Route path="/servicios" element={<PublicRoute><Servicios /></PublicRoute>} />
          <Route path="/nosotros" element={<PublicRoute><Nosotros /></PublicRoute>} />
          <Route path="/contacto" element={<PublicRoute><Contacto /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

           {/* Rutas privadas agrupadas */}

            <Route path="/privado" element={<PrivateLayout />}>
              <Route index element={<DashboardPrivado />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="dispositivos" element={<Dispositivos />} />
              <Route path="perfil" element={<Perfil />} />
            </Route>

          {/* Rutas Administrativas */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Dashboard */}
            <Route index element={<Dashboard />} />
            
            {/* Usuarios */}
            <Route path="usuarios" element={<UsuariosGeneral />} />
            <Route path="usuarios/altas" element={<UsuariosAltas />} />
            <Route path="usuarios/bajas" element={<UsuariosBajas />} />
            <Route path="usuarios/cambios" element={<UsuariosCambios />} />
            
            {/* IoT */}
            <Route path="iot" element={<IoTGeneral />} />
            <Route path="iot/vinculacion" element={<IoTVinculacion />} />
            <Route path="iot/altas" element={<IoTAltas />} />
            <Route path="iot/bajas" element={<IoTBajas />} />
            <Route path="iot/usuarios" element={<IoTUsuarios />} />
            
            {/* Información */}
            <Route path="informacion/modificacion" element={<InformacionModificacion />} />
            <Route path="informacion/vista" element={<InformacionVista />} />
            
            {/* Políticas */}
            <Route path="politicas" element={<PoliticasGeneral />} />
            <Route path="politicas/empresa" element={<PoliticasEmpresa />} />
            <Route path="politicas/privacidad" element={<PoliticasPrivacidad />} />
            <Route path="politicas/cliente" element={<PoliticasCliente />} />
            
            {/* Preguntas Frecuentes */}
            <Route path="preguntas" element={<PreguntasGeneral />} />
            <Route path="preguntas/altas" element={<PreguntasAltas />} />
            <Route path="preguntas/bajas" element={<PreguntasBajas />} />
            <Route path="preguntas/cambios" element={<PreguntasCambios />} />
            {/* Prueva para IOT*/}
            <Route path="iot/test" element={<IoTTests />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;