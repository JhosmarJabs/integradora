import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { colors, typography, layout } from '../styles/styles';

const PrivateLayout = () => {
  const location = useLocation();
  
  // Función para verificar si un enlace está activo
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  // Estilos para los elementos de navegación
  const navLinkStyle = {
    padding: '10px 15px',
    borderRadius: '5px',
    marginBottom: '10px',
    fontFamily: typography.fontPrimary,
    fontSize: '16px',
    fontWeight: '500',
    display: 'block',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };

  // Estilo para enlaces activos e inactivos
  const getNavLinkStyle = (path) => {
    return {
      ...navLinkStyle,
      backgroundColor: isActive(path) ? colors.primaryMedium : 'transparent',
      color: isActive(path) ? colors.white : colors.primaryDark,
      ':hover': {
        backgroundColor: colors.accent,
        color: colors.white,
      }
    };
  };

  return (
    <Container fluid style={{ minHeight: 'calc(100vh - 150px)' }}>
      <Row>
        {/* Barra lateral de navegación */}
        <Col md={3} lg={2} style={{
          backgroundColor: colors.white,
          padding: '20px 0',
          borderRight: `1px solid ${colors.accent}`,
          minHeight: 'calc(100vh - 150px)'
        }}>
          <div style={{ padding: '20px 0' }}>
            <h4 style={{
              color: colors.primaryDark,
              fontFamily: typography.fontPrimary,
              fontWeight: 'bold',
              padding: '0 15px',
              marginBottom: '20px'
            }}>
              Área Privada
            </h4>
            
            <Nav className="flex-column">
              <Link to="/privado/dashboard" style={getNavLinkStyle('/privado/dashboard')}>
                Dashboard General
              </Link>
              <Link to="/privado/dispositivos" style={getNavLinkStyle('/privado/dispositivos')}>
                Dispositivos (IoT)
              </Link>
              <Link to="/privado/perfil" style={getNavLinkStyle('/privado/perfil')}>
                Perfil de Usuario
              </Link>
            </Nav>
          </div>
        </Col>
        
        {/* Contenido principal */}
        <Col md={9} lg={10} style={{ 
          padding: '30px', 
          backgroundColor: '#f8f9fa' 
        }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default PrivateLayout;