import React, { useState } from "react";
import persianas from "../../services/persianas"; // Importar la lista de persianas
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import { colors, textStyles, typography, buttons, layout } from "../../styles/styles";

const DashboardPersianas = () => {
  // Estado para vista de cuadrícula o lista (por defecto cuadrícula como en la imagen)
  const [vistaGrilla, setVistaGrilla] = useState(true);

  const toggleVistaGrilla = () => {
    setVistaGrilla(!vistaGrilla);
  };

  // Estilos adaptados utilizando las constantes existentes en styles.js
  const componentStyles = {
    pageContainer: {
      backgroundColor: "#f8f9fa",
      minHeight: "calc(100vh - 76px)",
      paddingTop: "30px",
      paddingBottom: "60px",
    },
    header: {
      marginBottom: "30px",
    },
    controlBar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.white,
      padding: "15px 20px",
      borderRadius: "12px",
      boxShadow: "0 2px 10px rgba(19, 53, 165, 0.46)",
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
      fontFamily: typography.fontSecondary,
    },
    searchIcon: {
      position: "absolute",
      left: "15px",
      top: "50%",
      transform: "translateY(-50%)",
      color: colors.primaryLight,
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
    resultsInfo: {
      fontSize: "15px",
      color: colors.primaryMedium,
      marginBottom: "20px",
      fontFamily: typography.fontSecondary,
    },
    persianasGrid: {
      display: "grid",
      gridTemplateColumns: vistaGrilla 
        ? "repeat(auto-fill, minmax(280px, 1fr))" 
        : "1fr",
      gap: "20px",
    },
    persianaCard: {
      backgroundColor: colors.white,
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      display: vistaGrilla ? "block" : "flex",
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: vistaGrilla ? "100%" : "180px",
      height: vistaGrilla ? "180px" : "150px",
      backgroundColor: "#f5f5f5",
      borderRadius: vistaGrilla ? "12px 12px 0 0" : "8px",
      padding: "20px",
    },
    persianIcon: {
      fontSize: "50px",
      color: colors.primaryMedium,
    },
    cardContent: {
      padding: vistaGrilla ? "15px" : "0 0 0 20px",
      flex: 1,
    },
    cardTitle: {
      fontSize: vistaGrilla ? "18px" : "20px",
      fontWeight: "600",
      marginBottom: "8px",
      color: colors.primaryDark,
      fontFamily: typography.fontPrimary,
    },
    cardRoom: {
      fontSize: "14px",
      marginBottom: "10px",
      color: colors.primaryLight,
      fontFamily: typography.fontSecondary,
    },
    statusContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "10px",
    },
    statusBadge: {
      display: "inline-block",
      padding: "4px 8px",
      borderRadius: "4px",
      fontSize: "12px",
      fontWeight: "600",
      fontFamily: typography.fontSecondary,
    },
    statusActive: {
      backgroundColor: "rgba(40, 167, 69, 0.1)",
      color: "#28a745",
    },
    statusInactive: {
      backgroundColor: "rgba(108, 117, 125, 0.1)",
      color: "#6c757d",
    },
    actionButton: {
      ...buttons.secondary,
      backgroundColor: colors.primaryMedium,
      color: colors.white,
      padding: "8px 15px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "600",
    },
  };

  return (
    <div style={componentStyles.pageContainer}>
      <div className="container">
        {/* Encabezado */}
        <div style={componentStyles.header}>
          <h1 style={textStyles.title}>Mis Dispositivos</h1>
          <p style={textStyles.paragraph}>
            Gestiona tus persianas inteligentes en cada habitación de tu hogar
          </p>
        </div>

        {/* Barra de control */}
        <div style={componentStyles.controlBar}>
          <div style={componentStyles.searchContainer}>
            <i className="bi bi-search" style={componentStyles.searchIcon}></i>
            <input
              type="text"
              placeholder="Buscar dispositivos..."
              style={componentStyles.searchInput}
            />
          </div>
          
          <div style={componentStyles.viewToggle}>
            <div 
              style={{
                ...componentStyles.viewButton, 
                ...(vistaGrilla ? componentStyles.activeViewButton : componentStyles.inactiveViewButton)
              }}
              onClick={() => vistaGrilla || toggleVistaGrilla()}
            >
              <i className="bi bi-grid-3x3-gap-fill"></i>
            </div>
            <div 
              style={{
                ...componentStyles.viewButton, 
                ...(!vistaGrilla ? componentStyles.activeViewButton : componentStyles.inactiveViewButton)
              }}
              onClick={() => !vistaGrilla || toggleVistaGrilla()}
            >
              <i className="bi bi-list-ul"></i>
            </div>
          </div>
        </div>
        
        {/* Información de resultados */}
        <div style={componentStyles.resultsInfo}>
          Mostrando {persianas.length} dispositivos
        </div>
        
        {/* Grid de persianas */}
        <div style={componentStyles.persianasGrid}>
          {persianas.map(persiana => (
            <div 
              key={persiana._id} 
              style={componentStyles.persianaCard}
            >
              <div style={{
                padding: vistaGrilla ? "0" : "15px",
                display: "flex",
                flexDirection: vistaGrilla ? "column" : "row",
              }}>
                <div style={componentStyles.iconContainer}>
                  <i className={`bi ${persiana.icon}`} style={componentStyles.persianIcon}></i>
                </div>
                <div style={componentStyles.cardContent}>
                  <h3 style={componentStyles.cardTitle}>{persiana.title}</h3>
                  <p style={componentStyles.cardRoom}>
                    <i className="bi bi-house-door" style={{marginRight: "5px"}}></i>
                    {persiana.room}
                  </p>
                  
                  <div style={componentStyles.statusContainer}>
                    <span style={{
                      ...componentStyles.statusBadge,
                      ...(persiana.status === "activo" ? componentStyles.statusActive : componentStyles.statusInactive)
                    }}>
                      <i className={`bi ${persiana.status === "activo" ? "bi-circle-fill" : "bi-circle"}`} style={{fontSize: "10px", marginRight: "5px"}}></i>
                      {persiana.status === "activo" ? "Activo" : "Inactivo"}
                    </span>
                    
                    <button style={componentStyles.actionButton}>
                      Ver Más
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPersianas;