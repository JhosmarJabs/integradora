import React, { useState } from "react";
import productos from "../../services/base"; // Importar la lista de productos
import CardsP from "../../components/CardsP"; // Importar las tarjetas
import "bootstrap/dist/css/bootstrap.min.css"; // Importar Bootstrap
import "bootstrap-icons/font/bootstrap-icons.min.css"; // Importar Bootstrap Icons

const Productos = () => {
  const [filtros, setFiltros] = useState({
    ordenar: "",
    tamaño: "",
    filtracionLuz: "",
    color: "",
    tipo: "",
    precio: "",
  });

  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const limpiarFiltros = () => {
    setFiltros({
      ordenar: "",
      tamaño: "",
      filtracionLuz: "",
      color: "",
      tipo: "",
      precio: "",
    });
    document.querySelectorAll(".form-select").forEach((select) => (select.value = ""));
  };

  return (
    <div className="container py-4">
      {/* Contenedor de filtros en una fila */}
      <div className="bg-light p-3 rounded mb-4 d-flex align-items-center">
        <div className="d-flex flex-grow-1 gap-2">
          <select name="ordenar" className="form-select me-2" onChange={handleChange}>
            <option value="">Ordenar</option>
            <option value="asc">Precio: Menor a Mayor</option>
            <option value="desc">Precio: Mayor a Menor</option>
          </select>

          <select name="tamaño" className="form-select me-2" onChange={handleChange}>
            <option value="">Tamaño</option>
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>

          <select name="filtracionLuz" className="form-select me-2" onChange={handleChange}>
            <option value="">Filtración de la luz</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
          </select>

          <select name="color" className="form-select me-2" onChange={handleChange}>
            <option value="">Color</option>
            <option value="blanco">Blanco</option>
            <option value="negro">Negro</option>
            <option value="gris">Gris</option>
          </select>

          <select name="tipo" className="form-select me-2" onChange={handleChange}>
            <option value="">Tipo</option>
            <option value="roller">Roller</option>
            <option value="veneciana">Veneciana</option>
            <option value="panel">Panel Japonés</option>
          </select>

          <select name="precio" className="form-select me-2" onChange={handleChange}>
            <option value="">Precio</option>
            <option value="low">Menos de $500</option>
            <option value="medium">$500 - $1000</option>
            <option value="high">Más de $1000</option>
          </select>
        </div>

        {/* Botón de limpiar filtros con icono */}
        <button className="btn btn-secondary ms-3" onClick={limpiarFiltros}>
          <i className="bi bi-trash3"></i> {/* Icono de limpieza */}
        </button>
      </div>

      {/* Renderizar CardsP con la lista de productos */}
      <CardsP productos={productos} />
    </div>
  );
};

export default Productos;
