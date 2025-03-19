import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { FaUserMinus, FaSearch, FaExclamationTriangle, FaTrash, FaHistory, FaUserLock } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosBajas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [motivoBaja, setMotivoBaja] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [accionTipo, setAccionTipo] = useState('desactivar');
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:5000/usuario');
        if (!response.ok) throw new Error('Error al cargar usuarios');
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        setAlerta({
          show: true,
          variant: 'danger',
          mensaje: error.message
        });
      }
    };
    fetchUsuarios();
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario => {
    const nombreCompleto = `${usuario.name} ${usuario.surname}`.toLowerCase();
    const coincideTexto = nombreCompleto.includes(filtro.toLowerCase()) ||
                         usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
                         usuario._id.toLowerCase().includes(filtro.toLowerCase());
    const coincideRol = rolFiltro === '' || usuario.role === rolFiltro;
    return coincideTexto && coincideRol;
  });

  const roles = [...new Set(usuarios.map(u => u.role))];

  const getNombreRol = (rol) => {
    const roles = {
      'admin': 'Administrador',
      'supervisor': 'Supervisor',
      'tecnico': 'Técnico',
      'cliente': 'Cliente'
    };
    return roles[rol] || rol;
  };

  const handleOpenModal = (usuario, tipo) => {
    setUsuarioSeleccionado(usuario);
    setMotivoBaja('');
    setConfirmacion('');
    setAccionTipo(tipo);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
    setMotivoBaja('');
    setConfirmacion('');
  };

  const handleProcesar = async () => {
    if (!motivoBaja.trim()) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Debe ingresar un motivo para la baja del usuario.'
      });
      return;
    }

    if (accionTipo === 'eliminar') {
      if (confirmacion !== usuarioSeleccionado.email) {
        setAlerta({
          show: true,
          variant: 'danger',
          mensaje: 'El email de confirmación no coincide con el email del usuario.'
        });
        return;
      }
    }

    try {
      if (accionTipo === 'desactivar') {
        const response = await fetch(`http://localhost:5000/usuario/${usuarioSeleccionado._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            status: 'inactive',
            motivoBaja: motivoBaja
          })
        });

        if (!response.ok) throw new Error('Error al desactivar usuario');
        const updatedUser = await response.json();
        setUsuarios(usuarios.map(u => u._id === updatedUser._id ? updatedUser : u));
        setAlerta({
          show: true,
          variant: 'success',
          mensaje: `El usuario "${updatedUser.name} ${updatedUser.surname}" ha sido desactivado correctamente.`
        });
      } else {
        const response = await fetch(`http://localhost:5000/usuario/${usuarioSeleccionado._id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ motivoBaja: motivoBaja })
        });

        if (!response.ok) throw new Error('Error al eliminar usuario');
        setUsuarios(usuarios.filter(u => u._id !== usuarioSeleccionado._id));
        setAlerta({
          show: true,
          variant: 'success',
          mensaje: `El usuario "${usuarioSeleccionado.name} ${usuarioSeleccionado.surname}" ha sido eliminado permanentemente.`
        });
      }
      handleCloseModal();
    } catch (error) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: error.message
      });
    }
  };

  const pageStyles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    title: { ...textStyles.title, marginBottom: '10px' },
    subtitle: { ...textStyles.subtitle, marginBottom: '20px' },
    badge: (status) => ({ 
      backgroundColor: status === 'active' ? '#28a745' : '#dc3545' 
    }),
    rolBadge: (rol) => {
      const colores = {
        'admin': '#dc3545',
        'supervisor': '#fd7e14',
        'tecnico': '#0dcaf0',
        'cliente': '#6c757d'
      };
      return { backgroundColor: colores[rol] || colors.primaryLight };
    },
    warningSection: {
      backgroundColor: '#fff3cd',
      borderLeft: '4px solid #ffc107',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '4px'
    }
  };

  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Baja de Usuarios</h2>
          <p style={textStyles.paragraph}>
            Gestione la desactivación o eliminación permanente de usuarios del sistema.
          </p>
        </Col>
      </Row>

      {alerta.show && (
        <Alert 
          variant={alerta.variant} 
          onClose={() => setAlerta({...alerta, show: false})} 
          dismissible
        >
          {alerta.mensaje}
        </Alert>
      )}

      <div style={pageStyles.warningSection}>
        <h5 style={{ color: '#856404', display: 'flex', alignItems: 'center' }}>
          <FaExclamationTriangle style={{ marginRight: '10px' }} /> Importante
        </h5>
        <p style={{ color: '#856404', margin: 0 }}>
          Existen dos opciones para dar de baja a los usuarios:
        </p>
        <ul style={{ color: '#856404', marginBottom: 0 }}>
          <li><strong>Desactivar usuario:</strong> El usuario no podrá iniciar sesión, pero sus datos se conservan.</li>
          <li><strong>Eliminar permanentemente:</strong> Todos los datos del usuario serán borrados. Acción irreversible.</li>
        </ul>
        <p style={{ color: '#856404', marginTop: '10px', marginBottom: 0 }}>
          Se recomienda desactivar usuarios en lugar de eliminarlos, salvo que sea necesario.
        </p>
      </div>

      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={4}>
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

      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Listado de Usuarios</Card.Title>
          
          {usuariosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron usuarios que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
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
                      <Badge style={pageStyles.rolBadge(usuario.role)}>
                        {getNombreRol(usuario.role)}
                      </Badge>
                    </td>
                    <td>
                      <Badge style={pageStyles.badge(usuario.status)}>
                        {usuario.status === 'active' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>{new Date(usuario.date).toLocaleDateString()}</td>
                    <td>
                      {usuario.status === 'active' && (
                        <Button 
                          variant="outline-warning" 
                          size="sm"
                          className="me-2"
                          onClick={() => handleOpenModal(usuario, 'desactivar')}
                          title="Desactivar usuario"
                        >
                          <FaUserLock size={14} /> Desactivar
                        </Button>
                      )}
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleOpenModal(usuario, 'eliminar')}
                        title="Eliminar permanentemente"
                      >
                        <FaTrash size={14} /> Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={{ ...pageStyles.subtitle, display: 'flex', alignItems: 'center' }}>
            <FaHistory style={{ marginRight: '10px' }} /> Historial de Bajas Recientes
          </Card.Title>
          
          <Alert variant="info">
            El historial de bajas muestra los usuarios desactivados o eliminados recientemente. 
            Esta información es importante para fines de auditoría y seguimiento.
          </Alert>
          
          <p className="text-muted text-center">
            No hay registros recientes de bajas de usuarios.
          </p>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header 
          closeButton 
          style={{ 
            backgroundColor: accionTipo === 'eliminar' ? '#f8d7da' : '#fff3cd', 
            color: accionTipo === 'eliminar' ? '#721c24' : '#856404' 
          }}
        >
          <Modal.Title>
            {accionTipo === 'eliminar' ? 'Eliminar Permanentemente' : 'Desactivar Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioSeleccionado && (
            <>
              <Alert variant={accionTipo === 'eliminar' ? 'danger' : 'warning'}>
                <p>
                  <strong>
                    {accionTipo === 'eliminar' 
                      ? '¡Atención! Esta acción no se puede deshacer.' 
                      : 'Está a punto de desactivar el siguiente usuario:'}
                  </strong>
                </p>
                <p>Usuario: <strong>{`${usuarioSeleccionado.name} ${usuarioSeleccionado.surname}`}</strong></p>
                <p>Email: <strong>{usuarioSeleccionado.email}</strong></p>
                <p>Rol: <strong>{getNombreRol(usuarioSeleccionado.role)}</strong></p>
                <p>ID: <strong>{usuarioSeleccionado._id}</strong></p>
              </Alert>
              
              <Form.Group className="mb-3">
                <Form.Label>Motivo de la baja *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={motivoBaja}
                  onChange={(e) => setMotivoBaja(e.target.value)}
                  placeholder="Indique el motivo por el cual se da de baja a este usuario"
                  required
                />
              </Form.Group>
              
              {accionTipo === 'eliminar' && (
                <Form.Group className="mb-3">
                  <Form.Label>
                    Para confirmar, escriba el email del usuario: <strong>{usuarioSeleccionado.email}</strong>
                  </Form.Label>
                  <Form.Control 
                    type="text" 
                    value={confirmacion}
                    onChange={(e) => setConfirmacion(e.target.value)}
                    placeholder="Escriba el email completo"
                    required
                  />
                  <Form.Text className="text-danger">
                    Esta acción eliminará permanentemente al usuario y todos sus datos asociados.
                  </Form.Text>
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button 
            variant={accionTipo === 'eliminar' ? 'danger' : 'warning'} 
            onClick={handleProcesar}
          >
            {accionTipo === 'eliminar' ? (
              <><FaUserMinus style={{ marginRight: '5px' }} /> Eliminar Permanentemente</>
            ) : (
              <><FaUserLock style={{ marginRight: '5px' }} /> Desactivar Usuario</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsuariosBajas;