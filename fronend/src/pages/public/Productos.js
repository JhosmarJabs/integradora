import React, { useState, useEffect } from "react";
 // Importar la lista de productos
import { colors, textStyles} from "../../styles/styles"; // Importando estilos del sistema
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
    busqueda: "",
  });
  
  // Estado para controlar si el panel de filtros está expandido
  const [filtrosExpandidos, setFiltrosExpandidos] = useState(false);
  // Estado para productos filtrados
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  // Estado para contador de filtros activos
  const [filtrosActivos, setFiltrosActivos] = useState(0);
  // Estado para vista de cuadrícula o lista
  const [vistaGrilla, setVistaGrilla] = useState(true);
  //Estado para almacenar los productos desde la API
  const [productos, setProductos] = useState([]);

    // Obtener los productos desde MongoDB al cargar el componente
    useEffect(() => {
      const fetchProductos = async () => {
        try {
          const response = await fetch('http://localhost:5000/productos'); // Ajusta la URL según tu configuración
          if (!response.ok) {
            throw new Error("Error al obtener los productos");
          }
          const data = await response.json();
          setProductos(data);
          setProductosFiltrados(data);
        } catch (error) {
          console.error("Error al obtener los productos:", error);
        }
      };
  
      fetchProductos();
    }, []);

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
      busqueda: "",
    });
    document.querySelectorAll(".form-select").forEach((select) => (select.value = ""));
    document.querySelector("input[name='busqueda']").value = "";
  };

  const toggleFiltros = () => {
    setFiltrosExpandidos(!filtrosExpandidos);
  };

  const toggleVistaGrilla = () => {
    setVistaGrilla(!vistaGrilla);
  };

  // Aplicar filtros cuando cambien
  useEffect(() => {
    let resultado = [...productos];
    let contadorFiltros = 0;

    // Filtro de búsqueda
    if (filtros.busqueda) {
      resultado = resultado.filter(producto => 
        producto.title.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        producto.description.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
        producto.category.toLowerCase().includes(filtros.busqueda.toLowerCase())
      );
      contadorFiltros++;
    }

    // Filtros de categoría
    if (filtros.tipo) {
      // Simulando un filtro por tipo (adaptarlo a la estructura real de tus datos)
      resultado = resultado.filter(producto => 
        producto.category && producto.category.toLowerCase() === filtros.tipo.toLowerCase()
      );
      contadorFiltros++;
    }

    // Filtro por precio
    if (filtros.precio) {
      switch (filtros.precio) {
        case "low":
          resultado = resultado.filter(producto => producto.price < 500);
          break;
        case "medium":
          resultado = resultado.filter(producto => producto.price >= 500 && producto.price <= 1000);
          break;
        case "high":
          resultado = resultado.filter(producto => producto.price > 1000);
          break;
        default:
          break;
      }
      contadorFiltros++;
    }

    // Simulación de otros filtros (adaptar según la estructura real de tus datos)
    if (filtros.tamaño) contadorFiltros++;
    if (filtros.filtracionLuz) contadorFiltros++;
    if (filtros.color) contadorFiltros++;

    // Ordenamiento
    if (filtros.ordenar) {
      if (filtros.ordenar === "asc") {
        resultado.sort((a, b) => a.price - b.price);
      } else if (filtros.ordenar === "desc") {
        resultado.sort((a, b) => b.price - a.price);
      } else if (filtros.ordenar === "rating") {
        resultado.sort((a, b) => b.rating - a.rating);
      } else if (filtros.ordenar === "newest") {
        // Simulando ordenamiento por novedad
        resultado.sort((a, b) => b._id.localeCompare(a._id));
      }
      contadorFiltros++;
    }

    setProductosFiltrados(resultado);
    setFiltrosActivos(contadorFiltros);
  }, [filtros]);

  const styles = {
    pageContainer: {
      backgroundColor: "#f8f9fa",
      minHeight: "calc(100vh - 76px)",
      paddingTop: "30px",
      paddingBottom: "60px",
    },
    header: {
      marginBottom: "30px",
    },
    title: {
      ...textStyles.title,
      marginBottom: "10px",
      color: colors.primaryDark,
    },
    subtitle: {
      ...textStyles.paragraph,
      color: colors.primaryLight,
      marginBottom: "20px",
    },
    filterBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.white,
      padding: "15px 20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      marginBottom: "20px",
    },
    searchContainer: {
      position: "relative",
      flex: "1 1 auto",
      maxWidth: "400px",
    },
    searchInput: {
      width: "100%",
      padding: "10px 15px 10px 40px",
      borderRadius: "8px",
      border: `1px solid ${colors.accent}`,
      fontSize: "15px",
      transition: "all 0.3s",
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.primaryLight,
    },
    filterActions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    filterButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px 15px",
      backgroundColor: filtrosExpandidos ? colors.primaryMedium : colors.white,
      color: filtrosExpandidos ? colors.white : colors.primaryDark,
      border: `1px solid ${colors.primaryLight}`,
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
      fontWeight: "500",
    },
    filterCount: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: "20px",
      height: "20px",
      borderRadius: "10px",
      backgroundColor: filtrosActivos > 0 ? "#ffe607" : colors.accent,
      color: filtrosActivos > 0 ? colors.primaryDark : colors.white,
      fontSize: "12px",
      fontWeight: "bold",
      padding: "0 6px",
    },
    viewToggle: {
      display: "flex",
      alignItems: "center",
    },
    viewButton: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.2s",
      marginLeft: "8px",
    },
    activeViewButton: {
      backgroundColor: colors.primaryLight,
      color: colors.white,
    },
    inactiveViewButton: {
      backgroundColor: "#e9ecef",
      color: colors.primaryDark,
    },
    filterPanel: {
      backgroundColor: colors.white,
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "25px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      display: filtrosExpandidos ? "block" : "none",
    },
    filterGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "15px",
    },
    filterGroup: {
      marginBottom: "15px",
    },
    filterLabel: {
      display: "block",
      fontSize: "14px",
      fontWeight: "600",
      color: colors.primaryDark,
      marginBottom: "8px",
    },
    filterSelect: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: `1px solid ${colors.accent}`,
      backgroundColor: "#fff",
      fontSize: "14px",
    },
    clearButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 15px",
      color: "#dc3545",
      backgroundColor: "rgba(220, 53, 69, 0.1)",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    applyButton: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 20px",
      color: "#fff",
      backgroundColor: colors.primaryDark,
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s",
    },
    resultsInfo: {
      fontSize: "15px",
      color: colors.primaryMedium,
      marginBottom: "20px",
    },
    productGrid: {
      display: "grid",
      gridTemplateColumns: vistaGrilla 
        ? "repeat(auto-fill, minmax(280px, 1fr))" 
        : "1fr",
      gap: "20px",
    },
    productCard: {
      backgroundColor: colors.white,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      display: vistaGrilla ? "block" : "flex",
    },
    noResults: {
      textAlign: "center",
      padding: "40px 20px",
      backgroundColor: colors.white,
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    },
    noResultsIcon: {
      fontSize: "48px",
      color: colors.primaryLight,
      marginBottom: "20px",
    },
    noResultsText: {
      fontSize: "18px",
      color: colors.primaryDark,
      marginBottom: "10px",
    },
    noResultsSubtext: {
      fontSize: "15px",
      color: colors.primaryLight,
    },
  };

  return (
    <div style={styles.pageContainer}>
      <div className="container">
        {/* Encabezado de la página */}
        <div style={styles.header}>
          <h1 style={styles.title}>Nuestros Productos</h1>
          <p style={styles.subtitle}>
            Encuentra las mejores soluciones para el control de luz y privacidad en tu hogar u oficina.
          </p>
        </div>

        {/* Barra de búsqueda y acciones de filtro */}
        <div style={styles.filterBar}>
          <div style={styles.searchContainer}>
            <i className="bi bi-search" style={styles.searchIcon}></i>
            <input
              name="busqueda"
              type="text"
              placeholder="Buscar productos..."
              style={styles.searchInput}
              onChange={handleChange}
              value={filtros.busqueda}
            />
          </div>
          
          <div style={styles.filterActions}>
            <button 
              style={styles.filterButton} 
              onClick={toggleFiltros}
            >
              <i className="bi bi-funnel"></i>
              Filtros
              {filtrosActivos > 0 && <span style={styles.filterCount}>{filtrosActivos}</span>}
            </button>
            
            <div style={styles.viewToggle}>
              <div 
                style={{
                  ...styles.viewButton, 
                  ...(vistaGrilla ? styles.activeViewButton : styles.inactiveViewButton)
                }}
                onClick={() => vistaGrilla || toggleVistaGrilla()}
              >
                <i className="bi bi-grid-3x3-gap-fill"></i>
              </div>
              <div 
                style={{
                  ...styles.viewButton, 
                  ...(!vistaGrilla ? styles.activeViewButton : styles.inactiveViewButton)
                }}
                onClick={() => !vistaGrilla || toggleVistaGrilla()}
              >
                <i className="bi bi-list-ul"></i>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel de filtros expandible */}
        <div style={styles.filterPanel}>
          <div style={styles.filterGrid}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Ordenar por</label>
              <select 
                name="ordenar" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.ordenar}
              >
                <option value="">Relevancia</option>
                <option value="asc">Precio: Menor a Mayor</option>
                <option value="desc">Precio: Mayor a Menor</option>
                <option value="rating">Mejor valorados</option>
                <option value="newest">Más recientes</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Tamaño</label>
              <select 
                name="tamaño" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.tamaño}
              >
                <option value="">Todos los tamaños</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Filtración de luz</label>
              <select 
                name="filtracionLuz" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.filtracionLuz}
              >
                <option value="">Todas las opciones</option>
                <option value="baja">Baja (Translúcido)</option>
                <option value="media">Media (Semi-opaco)</option>
                <option value="alta">Alta (Blackout)</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Color</label>
              <select 
                name="color" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.color}
              >
                <option value="">Todos los colores</option>
                <option value="blanco">Blanco</option>
                <option value="beige">Beige</option>
                <option value="gris">Gris</option>
                <option value="negro">Negro</option>
                <option value="madera">Acabado madera</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Tipo</label>
              <select 
                name="tipo" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.tipo}
              >
                <option value="">Todos los tipos</option>
                <option value="Domótica">Domótica</option>
                <option value="Seguridad">Seguridad</option>
                <option value="Energía">Energía</option>
                <option value="Climatización">Climatización</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Precio</label>
              <select 
                name="precio" 
                className="form-select" 
                style={styles.filterSelect}
                onChange={handleChange}
                value={filtros.precio}
              >
                <option value="">Cualquier precio</option>
                <option value="low">Menos de $500</option>
                <option value="medium">$500 - $1000</option>
                <option value="high">Más de $1000</option>
              </select>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "15px", marginTop: "20px" }}>
            <button 
              style={styles.clearButton}
              onClick={limpiarFiltros}
            >
              <i className="bi bi-trash3"></i>
              Limpiar filtros
            </button>
            <button 
              style={styles.applyButton}
              onClick={toggleFiltros}
            >
              <i className="bi bi-check2"></i>
              Aplicar filtros
            </button>
          </div>
        </div>
        
        {/* Información de resultados */}
        <div style={styles.resultsInfo}>
          Mostrando {productosFiltrados.length} productos {filtrosActivos > 0 ? "filtrados" : ""}
        </div>
        
        {/* Resultados */}
        {productosFiltrados.length > 0 ? (
          <div className="productResults">
            {/* Si queremos usar el componente CardsP */}
            {/* <CardsP productos={productosFiltrados} vistaGrilla={vistaGrilla} /> */}
            
            {/* O podemos implementar nuestra propia visualización */}
            <div style={styles.productGrid}>
              {productosFiltrados.map(producto => (
                <div 
                  key={producto._id} 
                  style={styles.productCard}
                  onClick={() => window.location.href = `/producto/${producto._id}`}
                >
                  {/* Aquí iría la implementación de la tarjeta de producto */}
                  {/* Este es solo un placeholder que deberías reemplazar con tus propias tarjetas */}
                  <div style={{
                    padding: vistaGrilla ? "0" : "15px",
                    display: "flex",
                    flexDirection: vistaGrilla ? "column" : "row",
                  }}>
                    <div style={{
                      width: vistaGrilla ? "100%" : "180px",
                      height: vistaGrilla ? "200px" : "150px",
                      overflow: "hidden",
                      borderRadius: vistaGrilla ? "12px 12px 0 0" : "8px",
                    }}>
                      <img 
                        src={producto.image} 
                        alt={producto.title} 
                        style={{
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover"
                        }}
                      />
                    </div>
                    <div style={{
                      padding: vistaGrilla ? "15px" : "0 0 0 20px",
                      flex: 1,
                    }}>
                      <h3 style={{
                        fontSize: vistaGrilla ? "18px" : "20px",
                        fontWeight: "600",
                        marginBottom: "8px",
                        color: colors.primaryDark,
                      }}>{producto.title}</h3>
                      
                      <p style={{
                        fontSize: "14px",
                        marginBottom: "10px",
                        color: colors.primaryLight,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}>{producto.description}</p>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "14px",
                        marginBottom: "8px",
                      }}>
                        <span style={{
                          display: "inline-block",
                          padding: "4px 8px",
                          backgroundColor: "rgba(65, 90, 119, 0.1)",
                          color: colors.primaryMedium,
                          borderRadius: "4px",
                          marginRight: "8px",
                        }}>{producto.category}</span>
                        
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          color: "#ffc107",
                        }}>
                          <i className="bi bi-star-fill"></i>
                          <span style={{ color: colors.primaryDark, fontWeight: "600" }}>{producto.rating}</span>
                          <span style={{ color: colors.primaryLight, fontSize: "12px" }}>({producto.reviews})</span>
                        </div>
                      </div>
                      
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "8px",
                      }}>
                        <div>
                          {producto.discount > 0 && (
                            <span style={{
                              textDecoration: "line-through",
                              fontSize: "14px",
                              color: colors.primaryLight,
                              marginRight: "8px",
                            }}>${producto.price.toFixed(2)}</span>
                          )}
                          <span style={{
                            fontSize: vistaGrilla ? "18px" : "22px",
                            fontWeight: "bold",
                            color: colors.primaryDark,
                          }}>
                            ${(producto.price * (1 - producto.discount/100)).toFixed(2)}
                          </span>
                        </div>
                        
                        <button style={{
                          backgroundColor: colors.primaryMedium,
                          color: colors.white,
                          border: "none",
                          borderRadius: "8px",
                          padding: "8px 15px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}>
                          Ver Mas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.noResults}>
            <div style={styles.noResultsIcon}>
              <i className="bi bi-search"></i>
            </div>
            <h3 style={styles.noResultsText}>No se encontraron productos</h3>
            <p style={styles.noResultsSubtext}>
              Prueba con diferentes criterios de búsqueda o elimina algunos filtros.
            </p>
            <button 
              style={{
                ...styles.clearButton,
                margin: "20px auto 0",
                display: "inline-flex",
              }}
              onClick={limpiarFiltros}
            >
              <i className="bi bi-arrow-repeat"></i>
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos;
