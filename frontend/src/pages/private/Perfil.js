import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Form, Button, Badge, Nav, Tab } from 'react-bootstrap';
import { colors, typography, textStyles, buttons } from '../../styles/styles';

const Perfil = () => {
  // Estados para los datos del usuario
  const [userData, setUserData] = useState({
    id: 'USR-1001',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '+34 612 345 678',
    fechaRegistro: '2024-01-15',
    direccion: 'Calle Principal 123',
    ciudad: 'Madrid',
    codigoPostal: '28001',
    pais: 'España',
    idioma: 'Español',
    avatar: null,
    vinculacionesIoT: [
      { id: 'VINC-001', plataforma: 'Amazon Alexa', estado: 'activo', fechaVinculacion: '2024-02-10' },
      { id: 'VINC-002', plataforma: 'Google Home', estado: 'activo', fechaVinculacion: '2024-02-15' },
      { id: 'VINC-003', plataforma: 'Apple HomeKit', estado: 'inactivo', fechaVinculacion: '2024-03-05' }
    ]
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [activeTab, setActiveTab] = useState('vista-general');
  
  // Función para manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Función para guardar cambios
  const handleSave = () => {
    setUserData({...formData});
    setIsEditing(false);
    // En una aplicación real, aquí enviaríamos los datos al backend
    alert('Información actualizada correctamente');
  };
  
  // Función para cancelar edición
  const handleCancel = () => {
    setFormData({...userData});
    setIsEditing(false);
  };
  
  // Función para manejar eliminación de cuenta
  const handleDeleteAccount = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      // En una aplicación real, aquí enviaríamos la solicitud al backend
      alert('Cuenta eliminada correctamente');
      // Redireccionar al login o página principal
    }
  };
  
  // Función para eliminar vinculación IoT
  const handleRemoveIoTLink = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta vinculación?')) {
      const updatedLinks = userData.vinculacionesIoT.filter(link => link.id !== id);
      setUserData({
        ...userData,
        vinculacionesIoT: updatedLinks
      });
      // En una aplicación real, aquí enviaríamos la solicitud al backend
      alert('Vinculación eliminada correctamente');
    }
  };
  
  // Función para cambiar estado de vinculación IoT
  const handleToggleIoTStatus = (id) => {
    const updatedLinks = userData.vinculacionesIoT.map(link => {
      if (link.id === id) {
        return {
          ...link,
          estado: link.estado === 'activo' ? 'inactivo' : 'activo'
        };
      }
      return link;
    });
    
    setUserData({
      ...userData,
      vinculacionesIoT: updatedLinks
    });
    // En una aplicación real, aquí enviaríamos la solicitud al backend
    alert('Estado de vinculación actualizado correctamente');
  };

  return (
    <div>
      <h2 style={textStyles.title}>Perfil de Usuario</h2>
      <p style={textStyles.paragraph}>Administra tu información personal y configuraciones.</p>
      
      <Tab.Container activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Row className="mb-4">
          <Col sm={12}>
            <Card style={{
              borderRadius: '10px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              border: 'none'
            }}>
              <Card.Body>
                <Nav variant="tabs">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="vista-general" 
                      style={{
                        fontFamily: typography.fontPrimary,
                        color: activeTab === 'vista-general' ? colors.primaryDark : colors.accent,
                        fontWeight: activeTab === 'vista-general' ? 'bold' : 'normal'
                      }}
                    >
                      Vista General
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="modificacion" 
                      style={{
                        fontFamily: typography.fontPrimary,
                        color: activeTab === 'modificacion' ? colors.primaryDark : colors.accent,
                        fontWeight: activeTab === 'modificacion' ? 'bold' : 'normal'
                      }}
                    >
                      Modificación
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="vinculacion-iot" 
                      style={{
                        fontFamily: typography.fontPrimary,
                        color: activeTab === 'vinculacion-iot' ? colors.primaryDark : colors.accent,
                        fontWeight: activeTab === 'vinculacion-iot' ? 'bold' : 'normal'
                      }}
                    >
                      Vinculación IoT
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="eliminacion-cuenta" 
                      style={{
                        fontFamily: typography.fontPrimary,
                        color: activeTab === 'eliminacion-cuenta' ? colors.primaryDark : colors.accent,
                        fontWeight: activeTab === 'eliminacion-cuenta' ? 'bold' : 'normal'
                      }}
                    >
                      Eliminación de Cuenta
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Row>
          <Col sm={12}>
            <Tab.Content>
              {/* Vista General */}
              <Tab.Pane eventKey="vista-general">
                <Card style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: 'none'
                }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{
                        color: colors.primaryDark,
                        fontFamily: typography.fontPrimary,
                        margin: 0
                      }}>
                        Información Personal
                      </h4>
                      
                      <Button 
                        style={buttons.primary} 
                        onClick={() => setActiveTab('modificacion')}
                      >
                        <i className="fas fa-edit me-2"></i> Editar Perfil
                      </Button>
                    </div>
                    
                    <Row>
                      <Col md={2} className="text-center mb-4">
                        <div style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '50%',
                          backgroundColor: colors.accent,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          color: colors.white,
                          fontSize: '36px',
                          fontWeight: 'bold'
                        }}>
                          {userData.nombre.charAt(0) + userData.apellido.charAt(0)}
                        </div>
                      </Col>
                      
                      <Col md={5}>
                        <div className="mb-3">
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Nombre Completo</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.nombre} {userData.apellido}
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Email</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.email}
                          </p>
                        </div>
                        
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Teléfono</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.telefono}
                          </p>
                        </div>
                      </Col>
                      
                      <Col md={5}>
                        <div className="mb-3">
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Dirección</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.direccion}
                          </p>
                        </div>
                        
                        <div className="mb-3">
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Ciudad</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.ciudad}, {userData.codigoPostal}
                          </p>
                        </div>
                        
                        <div>
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>País</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.pais}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    
                    <hr style={{ margin: '20px 0' }} />
                    
                    <div className="mb-4">
                      <h5 style={{
                        color: colors.primaryDark,
                        fontFamily: typography.fontPrimary
                      }}>
                        Preferencias
                      </h5>
                      
                      <Row>
                        <Col md={6}>
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Idioma</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {userData.idioma}
                          </p>
                        </Col>
                        
                        <Col md={6}>
                          <p style={{ margin: 0, fontSize: '14px', color: colors.accent }}>Fecha de Registro</p>
                          <p style={{ margin: 0, fontWeight: 'bold', color: colors.primaryDark }}>
                            {new Date(userData.fechaRegistro).toLocaleDateString('es-ES')}
                          </p>
                        </Col>
                      </Row>
                    </div>
                    
                    <div>
                      <h5 style={{
                        color: colors.primaryDark,
                        fontFamily: typography.fontPrimary
                      }}>
                        Vinculaciones IoT
                      </h5>
                      
                      {userData.vinculacionesIoT.length > 0 ? (
                        <div className="d-flex flex-wrap gap-2">
                          {userData.vinculacionesIoT.map((link) => (
                            <Badge 
                              key={link.id}
                              bg="none" 
                              style={{ 
                                backgroundColor: link.estado === 'activo' ? '#5cb85c' : '#d9534f',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                fontSize: '14px'
                              }}
                            >
                              {link.plataforma}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p style={{ color: colors.accent }}>No hay vinculaciones IoT activas</p>
                      )}
                      
                      <Button 
                        variant="link" 
                        className="mt-2 p-0" 
                        style={{ 
                          color: colors.primaryDark, 
                          textDecoration: 'none',
                          fontFamily: typography.fontPrimary,
                          fontSize: '14px'
                        }}
                        onClick={() => setActiveTab('vinculacion-iot')}
                      >
                        Gestionar vinculaciones <i className="fas fa-chevron-right ms-1"></i>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Modificación de Perfil */}
              <Tab.Pane eventKey="modificacion">
                <Card style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: 'none'
                }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{
                        color: colors.primaryDark,
                        fontFamily: typography.fontPrimary,
                        margin: 0
                      }}>
                        Modificar Información
                      </h4>
                    </div>
                    
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                              type="text"
                              name="nombre"
                              value={formData.nombre}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                              type="text"
                              name="apellido"
                              value={formData.apellido}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                              type="text"
                              name="telefono"
                              value={formData.telefono}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                              type="text"
                              name="direccion"
                              value={formData.direccion}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Ciudad</Form.Label>
                            <Form.Control
                              type="text"
                              name="ciudad"
                              value={formData.ciudad}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>Código Postal</Form.Label>
                            <Form.Control
                              type="text"
                              name="codigoPostal"
                              value={formData.codigoPostal}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={4}>
                          <Form.Group className="mb-3">
                            <Form.Label>País</Form.Label>
                            <Form.Control
                              type="text"
                              name="pais"
                              value={formData.pais}
                              onChange={handleChange}
                            />
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Idioma</Form.Label>
                            <Form.Select
                              name="idioma"
                              value={formData.idioma}
                              onChange={handleChange}
                            >
                              <option value="Español">Español</option>
                              <option value="Inglés">Inglés</option>
                              <option value="Francés">Francés</option>
                              <option value="Alemán">Alemán</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <div className="d-flex gap-2 mt-4 justify-content-end">
                        <Button 
                          style={{
                            ...buttons.secondary,
                            backgroundColor: colors.accent,
                            borderColor: colors.accent
                          }} 
                          onClick={() => setActiveTab('vista-general')}
                        >
                          Cancelar
                        </Button>
                        <Button 
                          style={buttons.primary} 
                          onClick={handleSave}
                        >
                          Guardar Cambios
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Vinculación IoT */}
              <Tab.Pane eventKey="vinculacion-iot">
                <Card style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: 'none'
                }}>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h4 style={{
                        color: colors.primaryDark,
                        fontFamily: typography.fontPrimary,
                        margin: 0
                      }}>
                        Vinculaciones IoT
                      </h4>
                      
                      <Button 
                        style={buttons.primary}
                      >
                        <i className="fas fa-plus me-2"></i> Nueva Vinculación
                      </Button>
                    </div>
                    
                    {userData.vinculacionesIoT.length === 0 ? (
                      <div className="text-center my-5">
                        <p style={{ color: colors.accent }}>No hay vinculaciones IoT configuradas</p>
                        <Button style={buttons.primary} className="mt-2">
                          Agregar Primera Vinculación
                        </Button>
                      </div>
                    ) : (
                      <div className="table-responsive">
                        <table className="table">
                          <thead style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
                            <tr>
                              <th style={{ padding: '12px 16px' }}>ID</th>
                              <th style={{ padding: '12px 16px' }}>Plataforma</th>
                              <th style={{ padding: '12px 16px' }}>Estado</th>
                              <th style={{ padding: '12px 16px' }}>Fecha de Vinculación</th>
                              <th style={{ padding: '12px 16px' }}>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userData.vinculacionesIoT.map((link) => (
                              <tr key={link.id} style={{ verticalAlign: 'middle' }}>
                                <td style={{ padding: '12px 16px' }}>{link.id}</td>
                                <td style={{ padding: '12px 16px' }}>{link.plataforma}</td>
                                <td style={{ padding: '12px 16px' }}>
                                  <Badge 
                                    bg="none" 
                                    style={{ 
                                      backgroundColor: link.estado === 'activo' ? '#5cb85c' : '#d9534f',
                                      padding: '6px 10px',
                                      borderRadius: '20px'
                                    }}
                                  >
                                    {link.estado === 'activo' ? 'Activo' : 'Inactivo'}
                                  </Badge>
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                  {new Date(link.fechaVinculacion).toLocaleDateString('es-ES')}
                                </td>
                                <td style={{ padding: '12px 16px' }}>
                                  <Button 
                                    variant="outline-primary" 
                                    size="sm" 
                                    className="me-2"
                                    onClick={() => handleToggleIoTStatus(link.id)}
                                    style={{
                                      borderColor: colors.primaryMedium,
                                      color: colors.primaryMedium,
                                      padding: '4px 8px',
                                      fontSize: '12px'
                                    }}
                                  >
                                    {link.estado === 'activo' ? 'Desactivar' : 'Activar'}
                                  </Button>
                                  <Button 
                                    variant="outline-danger" 
                                    size="sm"
                                    onClick={() => handleRemoveIoTLink(link.id)}
                                    style={{
                                      borderColor: '#d9534f',
                                      color: '#d9534f',
                                      padding: '4px 8px',
                                      fontSize: '12px'
                                    }}
                                  >
                                    Eliminar
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Tab.Pane>
              
              {/* Eliminación de Cuenta */}
              <Tab.Pane eventKey="eliminacion-cuenta">
                <Card style={{
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  border: 'none',
                  backgroundColor: '#fff8f8'
                }}>
                  <Card.Body>
                    <div className="text-center mb-4">
                      <i className="fas fa-exclamation-triangle" style={{ fontSize: '48px', color: '#d9534f' }}></i>
                      <h4 style={{
                        color: '#d9534f',
                        fontFamily: typography.fontPrimary,
                        margin: '20px 0'
                      }}>
                        Eliminar Cuenta
                      </h4>
                    </div>
                    
                    <div className="text-center mb-4">
                      <p style={{ color: colors.primaryDark }}>
                        Esta acción es permanente y no se puede deshacer. Todos tus datos, configuraciones y vinculaciones serán eliminados.
                      </p>
                    </div>
                    
                    <Form>
                      <Form.Group className="mb-4">
                        <Form.Check 
                          type="checkbox" 
                          id="confirm-delete"
                          label="Entiendo que esta acción es permanente y deseo eliminar mi cuenta"
                        />
                      </Form.Group>
                      
                      <Form.Group className="mb-4">
                        <Form.Label>Para confirmar, escribe "ELIMINAR" en el siguiente campo:</Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="ELIMINAR"
                        />
                      </Form.Group>
                      
                      <div className="d-grid gap-2">
                        <Button 
                          style={{
                            ...buttons.primary,
                            backgroundColor: '#d9534f',
                            borderColor: '#d9534f'
                          }}
                          onClick={handleDeleteAccount}
                        >
                          Eliminar mi cuenta permanentemente
                        </Button>
                        <Button 
                          style={{
                            ...buttons.secondary,
                            backgroundColor: colors.accent,
                            borderColor: colors.accent
                          }} 
                          onClick={() => setActiveTab('vista-general')}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Perfil;