import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge } from 'react-bootstrap';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosGeneral = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');

  // Cargar datos desde la API
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/usuario');
        if (!response.ok) throw new Error('Error al cargar usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsuarios();
  }, []);

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const nombreCompleto = `${usuario.name} ${usuario.surname}`.toLowerCase();
    const coincideTexto = nombreCompleto.includes(filtro.toLowerCase()) || 
                         usuario.email.toLowerCase().includes(filtro.toLowerCase());
    const coincideRol = rolFiltro === '' || usuario.role === rolFiltro;
    return coincideTexto && coincideRol;
  });

  // Obtener roles únicos para el filtro (sin 'vendedor')
  const roles = [...new Set(usuarios.map(u => u.role))].filter(rol => rol !== 'vendedor');

  // Estadísticas de usuarios (sin 'vendedores')
  const estadisticas = {
    total: usuarios.length,
    activos: usuarios.filter(u => u.status === 'active').length,
    inactivos: usuarios.filter(u => u.status === 'inactive').length,
    administradores: usuarios.filter(u => u.role === 'admin').length,
    clientes: usuarios.filter(u => u.role === 'cliente').length,
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

  const getNombreRol = (rol) => {
    const roles = {
      'admin': 'Administrador',
      'supervisor': 'Supervisor',
      'tecnico': 'Técnico',
      'cliente': 'Cliente'
    };
    return roles[rol] || rol;
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
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard }}>
            <div style={pageStyles.statTitle}>Total Usuarios</div>
            <div style={pageStyles.statValue}>{estadisticas.total}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#28a745' }}>
            <div style={pageStyles.statTitle}>Usuarios Activos</div>
            <div style={pageStyles.statValue}>{estadisticas.activos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#dc3545' }}>
            <div style={pageStyles.statTitle}>Usuarios Inactivos</div>
            <div style={pageStyles.statValue}>{estadisticas.inactivos}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#007bff' }}>
            <div style={pageStyles.statTitle}>Administradores</div>
            <div style={pageStyles.statValue}>{estadisticas.administradores}</div>
          </Card>
        </Col>
        <Col md={4} lg={2}>
          <Card style={{ ...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#6f42c1' }}>
            <div style={pageStyles.statTitle}>Clientes</div>
            <div style={pageStyles.statValue}>{estadisticas.clientes}</div>
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
              <option key={idx} value={rol}>{getNombreRol(rol)}</option>
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
                <tr key={usuario._id}>
                  <td>{usuario._id}</td>
                  <td>{`${usuario.name} ${usuario.surname}`}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.phone}</td>
                  <td>
                    <Badge bg={
                      usuario.role === 'admin' ? 'danger' : 
                      usuario.role === 'supervisor' ? 'warning' : 
                      usuario.role === 'tecnico' ? 'info' : 'secondary'
                    }>
                      {getNombreRol(usuario.role)}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={usuario.status === 'active' ? 'success' : 'secondary'}>
                      {usuario.status === 'active' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td>{new Date(usuario.date).toLocaleDateString()}</td>
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
                      variant={usuario.status === 'active' ? 'outline-warning' : 'outline-success'} 
                      size="sm"
                    >
                      {usuario.status === 'active' ? 'Desactivar' : 'Activar'}
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