import React from "react";
import { Route } from "react-router-dom";

// Layouts
import AdminLayout from "../layouts/AdminLayout.js";
import PrivateLayout from "../layouts/PrivateLayout.js";
import PrivatePublicLayout from "../layouts/PublicLayout.js";

// Páginas privadas (área de administración)
import DashboardPrivado from "../pages/private/Dashboard.js";
import Dispositivos from "../pages/private/Dispositivos.js";
import Perfil from "../pages/private/Perfil.js";

// Páginas públicas (accesibles para usuarios autenticados)
import Inicio from "../pages/public/Inicio.js";
import Productos from "../pages/public/Productos.js";
import ProductoDetalle from "../pages/public/ProductoDetalle.js"; 
import Servicios from "../pages/public/Servicios.js";
import Nosotros from "../pages/public/Nosotros.js";
import Contacto from "../pages/public/Contacto.js";

// Definición de rutas privadas
const privateRoutes = (
  <>
    {/* Rutas del área de administración (Dashboard, Perfil, etc.) utilizando AdminLayout */}
    <Route path="/privado/admin" element={<AdminLayout />}>
      <Route index element={<DashboardPrivado />} />
      <Route path="dashboard" element={<DashboardPrivado />} />
      <Route path="dispositivos" element={<Dispositivos />} />
      <Route path="perfil" element={<Perfil />} />
    </Route>
    
    {/* Rutas del área privada de cliente (utilizando PrivateLayout) */}
    <Route path="/privado" element={<PrivateLayout />}>
      <Route index element={<DashboardPrivado />} />
      <Route path="dashboard" element={<DashboardPrivado />} />
      <Route path="dispositivos" element={<Dispositivos />} />
      <Route path="perfil" element={<Perfil />} />
      <Route path="configuracion" element={<DashboardPrivado />} />
      <Route path="estadisticas" element={<DashboardPrivado />} />
      <Route path="notificaciones" element={<DashboardPrivado />} />
      <Route path="calendario" element={<DashboardPrivado />} />
      <Route path="catalogo" element={<DashboardPrivado />} />
      <Route path="historial" element={<DashboardPrivado />} />
      <Route path="pedidos" element={<DashboardPrivado />} />
    </Route>

    {/* Rutas del sitio público pero para usuarios autenticados */}
    <Route path="/privado/sitio" element={<PrivatePublicLayout />}>
      <Route index element={<Inicio />} />
      <Route path="productos" element={<Productos />} />
      <Route path="productos/:id" element={<ProductoDetalle />} />
      <Route path="servicios" element={<Servicios />} />
      <Route path="nosotros" element={<Nosotros />} />
      <Route path="contacto" element={<Contacto />} />
    </Route>
  </>
);

export default privateRoutes;
