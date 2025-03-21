import React, { useState } from 'react';
import { Container, Navbar, Button, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { colors, typography } from '../../styles/styles';
import { 
  FaUser,
  FaBell, 
  FaBars, 
  FaSignOutAlt,
  FaCog, 
  FaQuestionCircle
} from 'react-icons/fa';

const NavbarPrivada = ({ toggleSidebar, collapsed }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Datos de ejemplo para notificaciones
  const notifications = [
    { id: 1, text: "Nueva actualización disponible para tu dispositivo", time: "Hace 5 min", read: false },
    { id: 2, text: "Alerta de temperatura alta en Dispositivo #102", time: "Hace 20 min", read: false },
    { id: 3, text: "Recordatorio: Mantenimiento programado", time: "Hace 1 hora", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Manejo del cierre de sesión
  const handleLogout = () => {
    // Aquí iría la lógica para cerrar sesión
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm" style={{ zIndex: 999 }}>
      <Container fluid>
        {/* Botón para toggle sidebar en móviles */}
        {collapsed && (
          <Button 
            variant="light" 
            className="me-2 border-0"
            onClick={toggleSidebar}
            aria-label="Abrir menú"
          >
            <FaBars />
          </Button>
        )}
        
        {/* Espacio flexible para empujar elementos a la derecha */}
        <div className="ms-auto d-flex align-items-center">
          {/* Botón de ayuda */}
          <Button 
            variant="light" 
            className="me-2 border-0 d-none d-md-flex"
            style={{ borderRadius: '50%', padding: '8px' }}
            title="Ayuda"
          >
            <FaQuestionCircle color={colors.primaryMedium} />
          </Button>
          
          {/* Notificaciones */}
          <div className="position-relative me-2">
            <Button 
              variant="light" 
              className="border-0"
              style={{ borderRadius: '50%', padding: '8px' }}
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notificaciones"
            >
              <FaBell color={colors.primaryMedium} />
              {unreadCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill
                  style={{ 
                    position: 'absolute', 
                    top: '0', 
                    right: '0',
                    fontSize: '10px',
                    transform: 'translate(25%, -25%)'
                  }}
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>
            
            {/* Panel de notificaciones */}
            {showNotifications && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  width: '320px',
                  backgroundColor: colors.white,
                  borderRadius: '8px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.15)',
                  zIndex: 1000,
                  marginTop: '8px',
                  overflow: 'hidden'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{ 
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  backgroundColor: colors.primaryDark,
                  color: colors.white,
                }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="m-0">Notificaciones</h6>
                    <span style={{ fontSize: '12px', cursor: 'pointer' }}>
                      Marcar todas como leídas
                    </span>
                  </div>
                </div>
                
                <div style={{ maxHeight: '350px', overflowY: 'auto' }}>
                  {notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      style={{
                        padding: '12px 15px',
                        borderBottom: '1px solid #eee',
                        backgroundColor: notification.read ? 'white' : `${colors.primaryLight}10`,
                        cursor: 'pointer'
                      }}
                    >
                      <div className="d-flex">
                        <div style={{ 
                          minWidth: '8px', 
                          backgroundColor: notification.read ? 'transparent' : colors.primaryMedium,
                          borderRadius: '4px',
                          marginRight: '10px'
                        }}></div>
                        <div>
                          <p style={{ 
                            margin: '0 0 5px 0', 
                            fontSize: '14px',
                            color: colors.primaryDark
                          }}>
                            {notification.text}
                          </p>
                          <span style={{ 
                            fontSize: '12px', 
                            color: colors.accent
                          }}>
                            {notification.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ 
                  padding: '10px', 
                  textAlign: 'center', 
                  fontSize: '14px',
                  color: colors.primaryMedium,
                  cursor: 'pointer',
                  borderTop: '1px solid #eee',
                }}>
                  Ver todas las notificaciones
                </div>
              </div>
            )}
          </div>
          
          {/* Menú de usuario */}
          <Dropdown align="end">
            <Dropdown.Toggle 
              variant="light" 
              id="dropdown-user" 
              style={{ 
                border: 'none', 
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                padding: '0 8px',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: colors.primaryLight,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.white,
                border: `2px solid ${colors.white}`,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <FaUser />
              </div>
              <div className="d-none d-md-block ms-2 me-1">
                <div style={{ 
                  textAlign: 'left', 
                  lineHeight: '1.2',
                  color: colors.primaryDark
                }}>
                  <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                    Usuario Demo
                  </div>
                  <div style={{ fontSize: '12px', color: colors.accent }}>
                    Cliente
                  </div>
                </div>
              </div>
            </Dropdown.Toggle>
            
            <Dropdown.Menu style={{ minWidth: '200px', marginTop: '8px' }}>
              <div className="px-3 py-2 text-center d-md-none border-bottom">
                <div style={{ fontWeight: 'bold', color: colors.primaryDark }}>
                  Usuario Demo
                </div>
                <div style={{ fontSize: '12px', color: colors.accent }}>
                  Cliente
                </div>
              </div>
              
              <Dropdown.Item as={Link} to="/privado/perfil">
                <FaUser className="me-2" size={14} /> Mi Perfil
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/privado/configuracion">
                <FaCog className="me-2" size={14} /> Configuración
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <FaSignOutAlt className="me-2" size={14} /> Cerrar Sesión
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarPrivada;