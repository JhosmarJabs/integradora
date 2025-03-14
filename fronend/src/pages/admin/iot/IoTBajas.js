import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert } from 'react-bootstrap';
import { FaTrash, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const IoTBajas = () => {
  // Estado para los dispositivos IoT
  const [dispositivos, setDispositivos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  
  // Estado para confirmación de eliminación
  const [showModal, setShowModal] = useState(false);
  const [dispositivoSeleccionado, setDispositivoSeleccionado] = useState(null);
  const [motivo, setMotivo] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  
  // Cargar dispositivos simulados al iniciar
  useEffect(() => {
    // Datos de ejemplo (en un caso real, se obtendrían de la API)
    const datosDispositivos = [
      { 
        id: 'DISP-001', 
        nombre: 'Sensor de Temperatura', 
        tipo: 'sensor',
        ubicacion: 'Sala de Servidores',
        estado: 'conectado',
        ultimaActividad: '2023-06-15 14:30:22',
        bateria: 85,
        conexion: 'WiFi',
        propietario: 'Juan Pérez',
        fechaRegistro: '2022-05-10'
      },
      { 
        id: 'DISP-002', 
        nombre: 'Control de Iluminación', 
        tipo: 'actuador',
        ubicacion: 'Oficina Principal',
        estado: 'conectado',
        ultimaActividad: '2023-06-15 15:45:10',
        bateria: 92,
        conexion: 'Bluetooth',
        propietario: 'María López',
        fechaRegistro: '2022-06-22'
      },
      { 
        id: 'DISP-003', 
        nombre: 'Cámara de Seguridad', 
        tipo: 'camara',
        ubicacion: 'Entrada Principal',
        estado: 'conectado',
        ultimaActividad: '2023-06-15 16:20:05',
        bateria: 78,
        conexion: 'WiFi',
        propietario: 'Carlos Rodríguez',
        fechaRegistro: '2022-07-15'
      },
      { 
        id: 'DISP-004', 
        nombre: 'Sensor de Movimiento', 
        tipo: 'sensor',
        ubicacion: 'Almacén',
        estado: 'desconectado',
        ultimaActividad: '2023-06-14 09:15:38',
        bateria: 12,
        conexion: 'WiFi',
        propietario: 'Ana García',
        fechaRegistro: '2022-08-03'
      },
      { 
        id: 'DISP-005', 
        nombre: 'Termostato Inteligente', 
        tipo: 'actuador',
        ubicacion: 'Sala de Conferencias',
        estado: 'mantenimiento',
        ultimaActividad: '2023-06-13 11:30:45',
        bateria: 65,
        conexion: 'Zigbee',
        propietario: 'Roberto Fernández',
        fechaRegistro: '2022-09-18'
      }
    ];
    
    setDispositivos(datosDispositivos);
  }, []);
  
  // Filtrar dispositivos
  const dispositivosFiltrados = dispositivos.filter(dispositivo => {
    const coincideTexto = dispositivo.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
                         dispositivo.id.toLowerCase().includes(filtro.toLowerCase()) ||
                         dispositivo.ubicacion.toLowerCase().includes(filtro.toLowerCase());
    const coincideTipo = tipoFiltro === '' || dispositivo.tipo === tipoFiltro;
    return coincideTexto && coincideTipo;
  });
  
  // Obtener tipos únicos para el filtro
  const tipos = [...new Set(dispositivos.map(d => d.tipo))];
  
  // Manejadores
  const handleOpenModal = (dispositivo) => {
    setDispositivoSeleccionado(dispositivo);
    setMotivo('');
    setConfirmacion('');
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setDispositivoSeleccionado(null);
    setMotivo('');
    setConfirmacion('');
  };
  
  const handleEliminar = () => {
    // Validar que se ha ingresado un motivo
    if (!motivo.trim()) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Debe ingresar un motivo para la baja del dispositivo.'
      });
      return;
    }
    
    // Validar confirmación
    if (confirmacion !== dispositivoSeleccionado.id) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'El ID de confirmación no coincide con el ID del dispositivo.'
      });
      return;
    }
    
    // Proceder con la eliminación
    // En un caso real, se enviaría una petición a la API
    const nuevosDispositivos = dispositivos.filter(d => d.id !== dispositivoSeleccionado.id);
    setDispositivos(nuevosDispositivos);
    
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `El dispositivo "${dispositivoSeleccionado.nombre}" (${dispositivoSeleccionado.id}) ha sido dado de baja correctamente.`
    });
    
    handleCloseModal();
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
    badge: (estado) => {
      let bg = colors.primaryLight;
      
      if (estado === 'conectado') bg = '#28a745';
      if (estado === 'desconectado') bg = '#dc3545';
      if (estado === 'mantenimiento') bg = '#ffc107';
      
      return { backgroundColor: bg };
    },
    tipoBadge: (tipo) => {
      let bg = colors.primaryLight;
      
      if (tipo === 'sensor') bg = '#0dcaf0';
      if (tipo === 'actuador') bg = '#6f42c1';
      if (tipo === 'camara') bg = '#fd7e14';
      
      return { backgroundColor: bg };
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
          <h2 style={pageStyles.title}>Baja de Dispositivos IoT</h2>
          <p style={textStyles.paragraph}>
            Gestione la baja de dispositivos IoT del sistema. Esta acción es permanente y requiere confirmación.
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
          La eliminación de un dispositivo IoT es permanente y no se puede deshacer. Todos los datos asociados al dispositivo también serán eliminados.
          Asegúrese de haber realizado copias de seguridad si necesita conservar los datos históricos.
        </p>
      </div>
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, ID o ubicación..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select 
            value={tipoFiltro}
            onChange={(e) => setTipoFiltro(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tipos.map((tipo, idx) => (
              <option key={idx} value={tipo}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {/* Tabla de Dispositivos */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Listado de Dispositivos IoT</Card.Title>
          
          {dispositivosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron dispositivos que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Ubicación</th>
                  <th>Estado</th>
                  <th>Propietario</th>
                  <th>Fecha Registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dispositivosFiltrados.map((dispositivo) => (
                  <tr key={dispositivo.id}>
                    <td>{dispositivo.id}</td>
                    <td>{dispositivo.nombre}</td>
                    <td>
                      <Badge style={pageStyles.tipoBadge(dispositivo.tipo)}>
                        {dispositivo.tipo.charAt(0).toUpperCase() + dispositivo.tipo.slice(1)}
                      </Badge>
                    </td>
                    <td>{dispositivo.ubicacion}</td>
                    <td>
                      <Badge style={pageStyles.badge(dispositivo.estado)}>
                        {dispositivo.estado.charAt(0).toUpperCase() + dispositivo.estado.slice(1)}
                      </Badge>
                    </td>
                    <td>{dispositivo.propietario}</td>
                    <td>{dispositivo.fechaRegistro}</td>
                    <td>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleOpenModal(dispositivo)}
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
      
      {/* Modal de Confirmación */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          <Modal.Title>Confirmar Baja de Dispositivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dispositivoSeleccionado && (
            <>
              <Alert variant="danger">
                <p><strong>¡Atención!</strong> Esta acción no se puede deshacer.</p>
                <p>Está a punto de eliminar el siguiente dispositivo:</p>
                <ul>
                  <li><strong>ID:</strong> {dispositivoSeleccionado.id}</li>
                  <li><strong>Nombre:</strong> {dispositivoSeleccionado.nombre}</li>
                  <li><strong>Tipo:</strong> {dispositivoSeleccionado.tipo}</li>
                  <li><strong>Ubicación:</strong> {dispositivoSeleccionado.ubicacion}</li>
                </ul>
              </Alert>
              
              <Form.Group className="mb-3">
                <Form.Label>Motivo de la baja *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  placeholder="Indique el motivo por el cual se da de baja este dispositivo"
                  required
                />
              </Form.Group>
              
              <Form.Group className="mb-3">
                <Form.Label>Para confirmar, ingrese el ID del dispositivo *</Form.Label>
                <Form.Control 
                  type="text" 
                  value={confirmacion}
                  onChange={(e) => setConfirmacion(e.target.value)}
                  placeholder={dispositivoSeleccionado.id}
                  required
                />
                <Form.Text className="text-muted">
                  Ingrese exactamente <strong>{dispositivoSeleccionado.id}</strong> para confirmar.
                </Form.Text>
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Confirmar Baja
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default IoTBajas;