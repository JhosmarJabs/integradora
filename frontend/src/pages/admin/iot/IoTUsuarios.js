import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { FaUserPlus, FaUserMinus, FaUserEdit, FaUsers, FaLink, FaUnlink } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const IoTUsuarios = () => {
  // Estado para los datos
  const [usuarios, setUsuarios] = useState([]);
  const [dispositivos, setDispositivos] = useState([]);
  const [asignaciones, setAsignaciones] = useState([]);
  const [filtro, setFiltro] = useState('');
  
  // Estado para modales
  const [showModalAsignar, setShowModalAsignar] = useState(false);
  const [showModalRevocar, setShowModalRevocar] = useState(false);
  
  // Estado para selecciones en modales
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState('');
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState('');
  const [asignacionSeleccionada, setAsignacionSeleccionada] = useState(null);
  const [permisos, setPermisos] = useState({
    lectura: true,
    escritura: false,
    administrador: false
  });
  
  // Estado para alertas
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  
  // Cargar datos simulados al iniciar
  useEffect(() => {
    // Datos de usuarios (en un caso real, se obtendrían de la API)
    const datosUsuarios = [
      { id: 'USR001', nombre: 'Juan Pérez', email: 'juan.perez@ejemplo.com', rol: 'admin' },
      { id: 'USR002', nombre: 'María López', email: 'maria.lopez@ejemplo.com', rol: 'usuario' },
      { id: 'USR003', nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@ejemplo.com', rol: 'técnico' },
      { id: 'USR004', nombre: 'Ana García', email: 'ana.garcia@ejemplo.com', rol: 'usuario' },
      { id: 'USR005', nombre: 'Roberto Fernández', email: 'roberto.fernandez@ejemplo.com', rol: 'admin' }
    ];
    
    // Datos de dispositivos
    const datosDispositivos = [
      { id: 'DISP-001', nombre: 'Sensor de Temperatura', tipo: 'sensor', ubicacion: 'Sala de Servidores' },
      { id: 'DISP-002', nombre: 'Control de Iluminación', tipo: 'actuador', ubicacion: 'Oficina Principal' },
      { id: 'DISP-003', nombre: 'Cámara de Seguridad', tipo: 'camara', ubicacion: 'Entrada Principal' },
      { id: 'DISP-004', nombre: 'Sensor de Movimiento', tipo: 'sensor', ubicacion: 'Almacén' },
      { id: 'DISP-005', nombre: 'Termostato Inteligente', tipo: 'actuador', ubicacion: 'Sala de Conferencias' }
    ];
    
    // Datos de asignaciones usuario-dispositivo
    const datosAsignaciones = [
      { 
        id: 'ASIG-001', 
        usuario: 'USR001', 
        nombreUsuario: 'Juan Pérez',
        dispositivo: 'DISP-001', 
        nombreDispositivo: 'Sensor de Temperatura', 
        permisos: { lectura: true, escritura: true, administrador: true },
        fechaAsignacion: '2023-01-15',
        asignadoPor: 'Admin del Sistema'
      },
      { 
        id: 'ASIG-002', 
        usuario: 'USR002', 
        nombreUsuario: 'María López',
        dispositivo: 'DISP-002', 
        nombreDispositivo: 'Control de Iluminación', 
        permisos: { lectura: true, escritura: true, administrador: false },
        fechaAsignacion: '2023-02-20',
        asignadoPor: 'Juan Pérez'
      },
      { 
        id: 'ASIG-003', 
        usuario: 'USR003', 
        nombreUsuario: 'Carlos Rodríguez',
        dispositivo: 'DISP-003', 
        nombreDispositivo: 'Cámara de Seguridad', 
        permisos: { lectura: true, escritura: false, administrador: false },
        fechaAsignacion: '2023-03-05',
        asignadoPor: 'Admin del Sistema'
      }
    ];
    
    setUsuarios(datosUsuarios);
    setDispositivos(datosDispositivos);
    setAsignaciones(datosAsignaciones);
  }, []);
  
  // Filtrar asignaciones
  const asignacionesFiltradas = asignaciones.filter(asignacion => {
    return asignacion.nombreUsuario.toLowerCase().includes(filtro.toLowerCase()) || 
           asignacion.nombreDispositivo.toLowerCase().includes(filtro.toLowerCase());
  });
  
  // Manejadores para modal de asignación
  const handleShowModalAsignar = () => {
    setUsuarioSeleccionado('');
    setDispositivoSeleccionado('');
    setPermisos({
      lectura: true,
      escritura: false,
      administrador: false
    });
    setShowModalAsignar(true);
  };
  
  const handleCloseModalAsignar = () => {
    setShowModalAsignar(false);
  };
  
  const handleAsignar = () => {
    // Validaciones
    if (!usuarioSeleccionado || !dispositivoSeleccionado) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Debe seleccionar un usuario y un dispositivo.'
      });
      return;
    }
    
    // Verificar si ya existe la asignación
    const existeAsignacion = asignaciones.some(
      a => a.usuario === usuarioSeleccionado && a.dispositivo === dispositivoSeleccionado
    );
    
    if (existeAsignacion) {
      setAlerta({
        show: true,
        variant: 'warning',
        mensaje: 'Este usuario ya tiene asignado este dispositivo.'
      });
      return;
    }
    
    // Obtener datos de usuario y dispositivo
    const usuario = usuarios.find(u => u.id === usuarioSeleccionado);
    const dispositivo = dispositivos.find(d => d.id === dispositivoSeleccionado);
    
    // Crear nueva asignación
    const nuevaAsignacion = {
      id: `ASIG-${Math.floor(Math.random() * 1000)}`,
      usuario: usuarioSeleccionado,
      nombreUsuario: usuario.nombre,
      dispositivo: dispositivoSeleccionado,
      nombreDispositivo: dispositivo.nombre,
      permisos: { ...permisos },
      fechaAsignacion: new Date().toISOString().split('T')[0],
      asignadoPor: 'Usuario Actual' // En un caso real, sería el usuario logueado
    };
    
    // Actualizar estado
    setAsignaciones([...asignaciones, nuevaAsignacion]);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Se ha asignado "${dispositivo.nombre}" a ${usuario.nombre} correctamente.`
    });
    
    // Cerrar modal
    handleCloseModalAsignar();
  };
  
  // Manejadores para modal de revocación
  const handleShowModalRevocar = (asignacion) => {
    setAsignacionSeleccionada(asignacion);
    setShowModalRevocar(true);
  };
  
  const handleCloseModalRevocar = () => {
    setShowModalRevocar(false);
    setAsignacionSeleccionada(null);
  };
  
  const handleRevocar = () => {
    if (!asignacionSeleccionada) return;
    
    // Filtrar para eliminar la asignación
    const nuevasAsignaciones = asignaciones.filter(a => a.id !== asignacionSeleccionada.id);
    setAsignaciones(nuevasAsignaciones);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Se ha revocado el acceso de ${asignacionSeleccionada.nombreUsuario} al dispositivo "${asignacionSeleccionada.nombreDispositivo}".`
    });
    
    // Cerrar modal
    handleCloseModalRevocar();
  };
  
  // Función para renderizar el tipo de permiso
  const renderPermisoBadge = (permisos) => {
    if (permisos.administrador) {
      return <Badge bg="danger">Administrador</Badge>;
    } else if (permisos.escritura) {
      return <Badge bg="warning">Lectura/Escritura</Badge>;
    } else {
      return <Badge bg="info">Solo Lectura</Badge>;
    }
  };
  
  const pageStyles = {
    card: {
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      marginBottom: '20px'
    },
    title: {
      ...textStyles.title,
      marginBottom: '10px'
    },
    subtitle: {
      ...textStyles.subtitle,
      marginBottom: '20px'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginBottom: '20px'
    },
    infoSection: {
      backgroundColor: colors.primaryLight + '20',  // Color primario con baja opacidad
      borderLeft: `4px solid ${colors.primaryMedium}`,
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '4px'
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Gestión de Usuarios de IoT</h2>
          <p style={textStyles.paragraph}>
            Administre los permisos de usuarios sobre los dispositivos IoT del sistema.
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
      
      <div style={pageStyles.infoSection}>
        <h5 style={{ color: colors.primaryDark, display: 'flex', alignItems: 'center' }}>
          <FaUsers style={{ marginRight: '10px' }} /> Información
        </h5>
        <p style={{ color: colors.primaryDark, margin: 0 }}>
          Desde esta sección puede gestionar qué usuarios tienen acceso a cada dispositivo IoT y qué tipo de permisos tienen.
          Los permisos pueden ser: <Badge bg="info">Solo Lectura</Badge>, <Badge bg="warning">Lectura/Escritura</Badge> o <Badge bg="danger">Administrador</Badge>.
        </p>
      </div>
      
      <div style={pageStyles.actionButtons}>
        <Button 
          variant="primary" 
          onClick={handleShowModalAsignar}
          style={{ 
            backgroundColor: colors.primaryDark,
            borderColor: colors.primaryDark
          }}
        >
          <FaUserPlus style={{ marginRight: '5px' }} /> Asignar Dispositivo
        </Button>
      </div>
      
      {/* Filtro */}
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre de usuario o dispositivo..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
      </Row>
      
      {/* Tabla de Asignaciones */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Asignaciones Actuales</Card.Title>
          
          {asignacionesFiltradas.length === 0 ? (
            <Alert variant="info">
              No se encontraron asignaciones que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Dispositivo</th>
                  <th>Permisos</th>
                  <th>Fecha Asignación</th>
                  <th>Asignado Por</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {asignacionesFiltradas.map((asignacion) => (
                  <tr key={asignacion.id}>
                    <td>{asignacion.id}</td>
                    <td>{asignacion.nombreUsuario}</td>
                    <td>{asignacion.nombreDispositivo}</td>
                    <td>
                      {renderPermisoBadge(asignacion.permisos)}
                    </td>
                    <td>{asignacion.fechaAsignacion}</td>
                    <td>{asignacion.asignadoPor}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleShowModalRevocar(asignacion)}
                      >
                        <FaUserMinus size={14} /> Revocar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Modal de Asignación */}
      <Modal show={showModalAsignar} onHide={handleCloseModalAsignar}>
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
          <Modal.Title>Asignar Dispositivo a Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Select 
                value={usuarioSeleccionado}
                onChange={(e) => setUsuarioSeleccionado(e.target.value)}
                required
              >
                <option value="">Seleccionar usuario...</option>
                {usuarios.map(usuario => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre} ({usuario.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Dispositivo</Form.Label>
              <Form.Select 
                value={dispositivoSeleccionado}
                onChange={(e) => setDispositivoSeleccionado(e.target.value)}
                required
              >
                <option value="">Seleccionar dispositivo...</option>
                {dispositivos.map(dispositivo => (
                  <option key={dispositivo.id} value={dispositivo.id}>
                    {dispositivo.nombre} ({dispositivo.ubicacion})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Permisos</Form.Label>
              <div>
                <Form.Check 
                  type="checkbox"
                  id="permiso-lectura"
                  label="Lectura (ver datos del dispositivo)"
                  checked={permisos.lectura}
                  onChange={(e) => setPermisos({...permisos, lectura: e.target.checked})}
                  disabled={permisos.escritura || permisos.administrador}
                />
                <Form.Check 
                  type="checkbox"
                  id="permiso-escritura"
                  label="Escritura (modificar configuración)"
                  checked={permisos.escritura}
                  onChange={(e) => setPermisos({
                    ...permisos, 
                    escritura: e.target.checked,
                    lectura: e.target.checked ? true : permisos.lectura
                  })}
                  disabled={permisos.administrador}
                />
                <Form.Check 
                  type="checkbox"
                  id="permiso-admin"
                  label="Administrador (control total, incluye asignar usuarios)"
                  checked={permisos.administrador}
                  onChange={(e) => setPermisos({
                    lectura: e.target.checked ? true : permisos.lectura,
                    escritura: e.target.checked ? true : permisos.escritura,
                    administrador: e.target.checked
                  })}
                />
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalAsignar}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAsignar}
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark
            }}
          >
            <FaLink style={{ marginRight: '5px' }} /> Asignar
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal de Revocación */}
      <Modal show={showModalRevocar} onHide={handleCloseModalRevocar}>
        <Modal.Header closeButton style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          <Modal.Title>Revocar Acceso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {asignacionSeleccionada && (
            <>
              <Alert variant="warning">
                <p>Está a punto de revocar el acceso del usuario:</p>
                <p><strong>{asignacionSeleccionada.nombreUsuario}</strong></p>
                <p>al dispositivo:</p>
                <p><strong>{asignacionSeleccionada.nombreDispositivo}</strong></p>
                <p>¿Está seguro de que desea continuar?</p>
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalRevocar}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleRevocar}>
            <FaUnlink style={{ marginRight: '5px' }} /> Revocar Acceso
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default IoTUsuarios;