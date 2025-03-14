import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge } from 'react-bootstrap';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosGeneral = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  
  // Simular carga de datos
  useEffect(() => {
    // Datos de ejemplo
    const datosUsuarios = [
      { 
        id: '1', 
        nombre: 'Juan', 
        apellido: 'Pérez', 
        email: 'juan.perez@ejemplo.com', 
        telefono: '555-1234', 
        rol: 'admin',
        activo: true,
        fechaRegistro: '2023-01-15'
      },
      { 
        id: '2', 
        nombre: 'María', 
        apellido: 'López', 
        email: 'maria.lopez@ejemplo.com', 
        telefono: '555-5678', 
        rol: 'cliente',
        activo: true,
        fechaRegistro: '2023-02-20'
      },
      { 
        id: '3', 
        nombre: 'Carlos', 
        apellido: 'Rodríguez', 
        email: 'carlos.rodriguez@ejemplo.com', 
        telefono: '555-9012', 
        rol: 'vendedor',
        activo: true,
        fechaRegistro: '2023-03-10'
      },
      { 
        id: '4', 
        nombre: 'Ana', 
        apellido: 'García', 
        email: 'ana.garcia@ejemplo.com', 
        telefono: '555-3456', 
        rol: 'cliente',
        activo: false,
        fechaRegistro: '2023-04-05'
      },
      { 
        id: '5', 
        nombre: 'Roberto', 
        apellido: 'Fernández', 
        email: 'roberto.fernandez@ejemplo.com', 
        telefono: '555-7890', 
        rol: 'admin',
        activo: true,
        fechaRegistro: '2023-05-18'
      }
    ];
    
    setUsuarios(datosUsuarios);
  }, []);
  
  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
    const coincideTexto = nombreCompleto.includes(filtro.toLowerCase()) || 
                         usuario.email.toLowerCase().includes(filtro.toLowerCase());
    const coincideRol = rolFiltro === '' || usuario.rol === rolFiltro;
    return coincideTexto && coincideRol;
  });
  
  // Obtener roles únicos para el filtro
  const roles = [...new Set(usuarios.map(u => u.rol))];
  
  // Estadísticas de usuarios
  const estadisticas = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.activo).length,
    inactivos: usuarios.filter(u => !u.activo).length,
    administradores: usuarios.filter(u => u.rol === 'admin').length,
    clientes: usuarios.filter(u => u.rol === 'cliente').length,
    vendedores: usuarios.filter(u => u.rol === 'vendedor').length
  };
  
  // Estilos
  const pageStyles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    statCard: {
      borderLeft: `4px solid ${colors.primaryMedium}`,
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '20px'
    },
    statTitle: {
      fontSize: '14px',
      color: colors.primaryMedium,
      marginBottom: '5px'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: colors.primaryDark
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={textStyles.title}>Vista General de Usuarios</h2>
          <p style={textStyles.paragraph}>Gestión y visualización de todos los usuarios del sistema.</p>
        </Col>
      </Row>
      
      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard}}>
            <div style={pageStyles.statTitle}>Total Usuarios</div>
            <div style={pageStyles.statValue}>{estadisticas.total}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#28a745'}}>
            <div style={pageStyles.statTitle}>Usuarios Activos</div>
            <div style={pageStyles.statValue}>{estadisticas.activos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#dc3545'}}>
            <div style={pageStyles.statTitle}>Usuarios Inactivos</div>
            <div style={pageStyles.statValue}>{estadisticas.inactivos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#007bff'}}>
            <div style={pageStyles.statTitle}>Administradores</div>
            <div style={pageStyles.statValue}>{estadisticas.administradores}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#6f42c1'}}>
            <div style={pageStyles.statTitle}>Clientes</div>
            <div style={pageStyles.statValue}>{estadisticas.clientes}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#fd7e14'}}>
            <div style={pageStyles.statTitle}>Vendedores</div>
            <div style={pageStyles.statValue}>{estadisticas.vendedores}</div>
          </Card>
        </Col>
      </Row>
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col md={9}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o email..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Select 
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {roles.map((rol, idx) => (
              <option key={idx} value={rol}>{rol.charAt(0).toUpperCase() + rol.slice(1)}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {/* Tabla de Usuarios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title className="mb-4">Listado de Usuarios</Card.Title>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.telefono}</td>
                  <td>
                    <Badge bg={
                      usuario.rol === 'admin' ? 'danger' : 
                      usuario.rol === 'vendedor' ? 'warning' : 'info'
                    }>
                      {usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={usuario.activo ? 'success' : 'secondary'}>
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>{usuario.fechaRegistro}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                    >
                      Ver
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button 
                      variant={usuario.activo ? 'outline-warning' : 'outline-success'} 
                      size="sm"
                    >
                      {usuario.activo ? 'Desactivar' : 'Activar'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuariosGeneral;