import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert, ListGroup } from 'react-bootstrap';
import { FaLink, FaUnlink, FaPlus, FaEdit, FaSearch, FaCog, FaExchangeAlt, FaNetworkWired } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const IoTVinculacion = () => {
  // Estado para dispositivos y vinculaciones
  const [dispositivos, setDispositivos] = useState([]);
  const [vinculaciones, setVinculaciones] = useState([]);
  const [filtro, setFiltro] = useState('');
  
  // Estado para modales
  const [showModalVincular, setShowModalVincular] = useState(false);
  const [showModalDesvincular, setShowModalDesvincular] = useState(false);
  const [showModalConfiguracion, setShowModalConfiguracion] = useState(false);
  
  // Estado para selecciones
  const [dispositivoOrigen, setDispositivoOrigen] = useState('');
  const [dispositivoDestino, setDispositivoDestino] = useState('');
  const [vinculacionSeleccionada, setVinculacionSeleccionada] = useState(null);
  const [tipoVinculacion, setTipoVinculacion] = useState('bidireccional');
  const [reglas, setReglas] = useState({
    condicion: 'mayor_que',
    valor: '30',
    accion: 'encender'
  });
  
  // Estado para alertas
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  
  // Cargar datos simulados al iniciar
  useEffect(() => {
    // Datos de dispositivos (en un caso real, se obtendrían de la API)
    const datosDispositivos = [
      { 
        id: 'DISP-001', 
        nombre: 'Sensor de Temperatura', 
        tipo: 'sensor',
        ubicacion: 'Sala de Servidores',
        estado: 'conectado',
        modelo: 'ST-100'
      },
      { 
        id: 'DISP-002', 
        nombre: 'Control de Iluminación', 
        tipo: 'actuador',
        ubicacion: 'Oficina Principal',
        estado: 'conectado',
        modelo: 'CL-200'
      },
      { 
        id: 'DISP-003', 
        nombre: 'Cámara de Seguridad', 
        tipo: 'camara',
        ubicacion: 'Entrada Principal',
        estado: 'conectado',
        modelo: 'CS-300'
      },
      { 
        id: 'DISP-004', 
        nombre: 'Sensor de Movimiento', 
        tipo: 'sensor',
        ubicacion: 'Almacén',
        estado: 'desconectado',
        modelo: 'SM-150'
      },
      { 
        id: 'DISP-005', 
        nombre: 'Termostato Inteligente', 
        tipo: 'actuador',
        ubicacion: 'Sala de Conferencias',
        estado: 'conectado',
        modelo: 'TI-250'
      },
      { 
        id: 'DISP-006', 
        nombre: 'Sensor de Humedad', 
        tipo: 'sensor',
        ubicacion: 'Invernadero',
        estado: 'conectado',
        modelo: 'SH-120'
      },
      { 
        id: 'DISP-007', 
        nombre: 'Control de Riego', 
        tipo: 'actuador',
        ubicacion: 'Invernadero',
        estado: 'conectado',
        modelo: 'CR-180'
      }
    ];
    
    // Datos de vinculaciones existentes
    const datosVinculaciones = [
      {
        id: 'VINC-001',
        origen: {
          id: 'DISP-001',
          nombre: 'Sensor de Temperatura'
        },
        destino: {
          id: 'DISP-005',
          nombre: 'Termostato Inteligente'
        },
        tipo: 'bidireccional',
        estado: 'activo',
        fechaCreacion: '2023-01-15',
        reglas: {
          condicion: 'mayor_que',
          valor: '30',
          accion: 'ajustar'
        },
        descripcion: 'El sensor de temperatura activa el termostato cuando detecta temperaturas superiores a 30°C'
      },
      {
        id: 'VINC-002',
        origen: {
          id: 'DISP-006',
          nombre: 'Sensor de Humedad'
        },
        destino: {
          id: 'DISP-007',
          nombre: 'Control de Riego'
        },
        tipo: 'unidireccional',
        estado: 'activo',
        fechaCreacion: '2023-02-20',
        reglas: {
          condicion: 'menor_que',
          valor: '40',
          accion: 'encender'
        },
        descripcion: 'El sensor de humedad activa el sistema de riego cuando la humedad es inferior al 40%'
      },
      {
        id: 'VINC-003',
        origen: {
          id: 'DISP-004',
          nombre: 'Sensor de Movimiento'
        },
        destino: {
          id: 'DISP-003',
          nombre: 'Cámara de Seguridad'
        },
        tipo: 'unidireccional',
        estado: 'inactivo',
        fechaCreacion: '2023-03-10',
        reglas: {
          condicion: 'igual_a',
          valor: 'movimiento_detectado',
          accion: 'grabar'
        },
        descripcion: 'El sensor de movimiento activa la grabación de la cámara cuando detecta movimiento (actualmente desactivado)'
      }
    ];
    
    setDispositivos(datosDispositivos);
    setVinculaciones(datosVinculaciones);
  }, []);
  
  // Filtrar vinculaciones
  const vinculacionesFiltradas = vinculaciones.filter(vinculacion => {
    return vinculacion.origen.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
           vinculacion.destino.nombre.toLowerCase().includes(filtro.toLowerCase());
  });
  
  // Manejadores para modal de vinculación
  const handleOpenModalVincular = () => {
    setDispositivoOrigen('');
    setDispositivoDestino('');
    setTipoVinculacion('bidireccional');
    setReglas({
      condicion: 'mayor_que',
      valor: '30',
      accion: 'encender'
    });
    setShowModalVincular(true);
  };
  
  const handleCloseModalVincular = () => {
    setShowModalVincular(false);
  };
  
  const handleVincular = () => {
    // Validaciones básicas
    if (!dispositivoOrigen || !dispositivoDestino) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Debe seleccionar los dispositivos de origen y destino.'
      });
      return;
    }
    
    if (dispositivoOrigen === dispositivoDestino) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'No se puede vincular un dispositivo consigo mismo.'
      });
      return;
    }
    
    // Verificar si ya existe la vinculación
    const existeVinculacion = vinculaciones.some(
      v => (v.origen.id === dispositivoOrigen && v.destino.id === dispositivoDestino) ||
           (v.tipo === 'bidireccional' && v.origen.id === dispositivoDestino && v.destino.id === dispositivoOrigen)
    );
    
    if (existeVinculacion) {
      setAlerta({
        show: true,
        variant: 'warning',
        mensaje: 'Ya existe una vinculación entre estos dispositivos.'
      });
      return;
    }
    
    // Obtener datos de dispositivos
    const origen = dispositivos.find(d => d.id === dispositivoOrigen);
    const destino = dispositivos.find(d => d.id === dispositivoDestino);
    
    // Crear nueva vinculación
    const nuevaVinculacion = {
      id: `VINC-${Math.floor(Math.random() * 1000)}`,
      origen: {
        id: origen.id,
        nombre: origen.nombre
      },
      destino: {
        id: destino.id,
        nombre: destino.nombre
      },
      tipo: tipoVinculacion,
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      reglas: { ...reglas },
      descripcion: `Vinculación entre ${origen.nombre} y ${destino.nombre}`
    };
    
    // Actualizar estado
    setVinculaciones([...vinculaciones, nuevaVinculacion]);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Se ha vinculado "${origen.nombre}" con "${destino.nombre}" correctamente.`
    });
    
    // Cerrar modal
    handleCloseModalVincular();
  };
  
  // Manejadores para modal de desvinculación
  const handleOpenModalDesvincular = (vinculacion) => {
    setVinculacionSeleccionada(vinculacion);
    setShowModalDesvincular(true);
  };
  
  const handleCloseModalDesvincular = () => {
    setShowModalDesvincular(false);
    setVinculacionSeleccionada(null);
  };
  
  const handleDesvincular = () => {
    if (!vinculacionSeleccionada) return;
    
    // Filtrar para eliminar la vinculación
    const nuevasVinculaciones = vinculaciones.filter(v => v.id !== vinculacionSeleccionada.id);
    setVinculaciones(nuevasVinculaciones);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Se ha desvinculado "${vinculacionSeleccionada.origen.nombre}" de "${vinculacionSeleccionada.destino.nombre}" correctamente.`
    });
    
    // Cerrar modal
    handleCloseModalDesvincular();
  };
  
  // Manejadores para modal de configuración
  const handleOpenModalConfiguracion = (vinculacion) => {
    setVinculacionSeleccionada(vinculacion);
    setReglas({ ...vinculacion.reglas });
    setShowModalConfiguracion(true);
  };
  
  const handleCloseModalConfiguracion = () => {
    setShowModalConfiguracion(false);
    setVinculacionSeleccionada(null);
  };
  
  const handleGuardarConfiguracion = () => {
    if (!vinculacionSeleccionada) return;
    
    // Actualizar la vinculación con las nuevas reglas
    const nuevasVinculaciones = vinculaciones.map(v => {
      if (v.id === vinculacionSeleccionada.id) {
        return {
          ...v,
          reglas: { ...reglas }
        };
      }
      return v;
    });
    
    setVinculaciones(nuevasVinculaciones);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Se ha actualizado la configuración de la vinculación entre "${vinculacionSeleccionada.origen.nombre}" y "${vinculacionSeleccionada.destino.nombre}".`
    });
    
    // Cerrar modal
    handleCloseModalConfiguracion();
  };
  
  // Función para cambiar el estado de una vinculación (activar/desactivar)
  const handleCambiarEstado = (vinculacion) => {
    const nuevoEstado = vinculacion.estado === 'activo' ? 'inactivo' : 'activo';
    
    const nuevasVinculaciones = vinculaciones.map(v => {
      if (v.id === vinculacion.id) {
        return {
          ...v,
          estado: nuevoEstado
        };
      }
      return v;
    });
    
    setVinculaciones(nuevasVinculaciones);
    
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `La vinculación entre "${vinculacion.origen.nombre}" y "${vinculacion.destino.nombre}" ha sido ${nuevoEstado === 'activo' ? 'activada' : 'desactivada'}.`
    });
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
    },
    badge: (estado) => {
      let bg = colors.primaryLight;
      
      if (estado === 'activo') bg = '#28a745';
      if (estado === 'inactivo') bg = '#dc3545';
      
      return { backgroundColor: bg };
    },
    tipoBadge: (tipo) => {
      let bg = colors.primaryLight;
      
      if (tipo === 'bidireccional') bg = '#6f42c1';
      if (tipo === 'unidireccional') bg = '#fd7e14';
      
      return { backgroundColor: bg };
    },
    graphSection: {
      padding: '15px',
      minHeight: '200px'
    }
  };
  
  // Función para renderizar la descripción de la regla
  const renderizarDescripcionRegla = (regla) => {
    const condiciones = {
      mayor_que: 'mayor que',
      menor_que: 'menor que',
      igual_a: 'igual a',
      diferente_de: 'diferente de'
    };
    
    const acciones = {
      encender: 'encender',
      apagar: 'apagar',
      ajustar: 'ajustar configuración',
      notificar: 'enviar notificación',
      grabar: 'iniciar grabación'
    };
    
    return `Si el valor es ${condiciones[regla.condicion]} ${regla.valor}, se activará la acción: ${acciones[regla.accion]}.`;
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Vinculación de Dispositivos IoT</h2>
          <p style={textStyles.paragraph}>
            Administre las conexiones e interacciones entre dispositivos IoT para crear un ecosistema inteligente y automatizado.
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
          <FaNetworkWired style={{ marginRight: '10px' }} /> Información
        </h5>
        <p style={{ color: colors.primaryDark, margin: 0 }}>
          La vinculación permite que los dispositivos IoT interactúen entre sí de manera autónoma. Puede crear reglas para 
          que los sensores activen actuadores, que las cámaras respondan a eventos, o establecer cadenas de acciones entre múltiples dispositivos.
          Las vinculaciones pueden ser <Badge bg="primary">unidireccionales</Badge> (un dispositivo afecta a otro) o <Badge bg="info">bidireccionales</Badge> (ambos dispositivos interactúan entre sí).
        </p>
      </div>
      
      <div style={pageStyles.actionButtons}>
        <Button 
          variant="primary" 
          onClick={handleOpenModalVincular}
          style={{ 
            backgroundColor: colors.primaryDark,
            borderColor: colors.primaryDark
          }}
        >
          <FaLink style={{ marginRight: '5px' }} /> Crear Nueva Vinculación
        </Button>
      </div>
      
      {/* Filtro */}
      <Row className="mb-4">
        <Col>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre de dispositivo..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{ marginBottom: '20px' }}
          />
        </Col>
      </Row>
      
      {/* Gráfico de Vinculaciones */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Mapa de Vinculaciones</Card.Title>
          
          <div style={pageStyles.graphSection} className="text-center">
            <p className="text-muted mb-3">Aquí se mostraría un gráfico interactivo con las vinculaciones entre dispositivos.</p>
            <div className="d-flex justify-content-center align-items-center">
              <Badge bg="success" className="mx-2">Activo</Badge>
              <Badge bg="danger" className="mx-2">Inactivo</Badge>
              <Badge bg="primary" className="mx-2">Bidireccional</Badge>
              <Badge bg="info" className="mx-2">Unidireccional</Badge>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      {/* Tabla de Vinculaciones */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Vinculaciones Existentes</Card.Title>
          
          {vinculacionesFiltradas.length === 0 ? (
            <Alert variant="info">
              No se encontraron vinculaciones que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Dispositivo Origen</th>
                  <th>Dispositivo Destino</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Creada el</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {vinculacionesFiltradas.map((vinculacion) => (
                  <tr key={vinculacion.id}>
                    <td>{vinculacion.id}</td>
                    <td>{vinculacion.origen.nombre}</td>
                    <td>{vinculacion.destino.nombre}</td>
                    <td>
                      <Badge style={pageStyles.tipoBadge(vinculacion.tipo)}>
                        {vinculacion.tipo === 'bidireccional' ? 'Bidireccional' : 'Unidireccional'}
                      </Badge>
                    </td>
                    <td>
                      <Badge style={pageStyles.badge(vinculacion.estado)}>
                        {vinculacion.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>{vinculacion.fechaCreacion}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        className="me-2"
                        onClick={() => handleOpenModalConfiguracion(vinculacion)}
                      >
                        <FaCog size={14} /> Configurar
                      </Button>
                      <Button 
                        variant={vinculacion.estado === 'activo' ? 'outline-danger' : 'outline-success'} 
                        size="sm"
                        className="me-2"
                        onClick={() => handleCambiarEstado(vinculacion)}
                      >
                        {vinculacion.estado === 'activo' ? 'Desactivar' : 'Activar'}
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleOpenModalDesvincular(vinculacion)}
                      >
                        <FaUnlink size={14} /> Desvincular
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Detalles de Vinculaciones */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Detalles de Vinculaciones</Card.Title>
          
          <ListGroup>
            {vinculacionesFiltradas.map((vinculacion) => (
              <ListGroup.Item key={vinculacion.id} className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-1">
                    <Badge style={pageStyles.tipoBadge(vinculacion.tipo)} className="me-2">
                      {vinculacion.tipo === 'bidireccional' ? 'Bidireccional' : 'Unidireccional'}
                    </Badge>
                    {vinculacion.origen.nombre} <FaExchangeAlt className="mx-2" /> {vinculacion.destino.nombre}
                  </h6>
                  <Badge style={pageStyles.badge(vinculacion.estado)}>
                    {vinculacion.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </Badge>
                </div>
                <p className="mb-1">
                  <strong>Descripción:</strong> {vinculacion.descripcion}
                </p>
                <p className="mb-0">
                  <strong>Regla:</strong> {renderizarDescripcionRegla(vinculacion.reglas)}
                </p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
      
      {/* Modal para Vincular Dispositivos */}
      <Modal show={showModalVincular} onHide={handleCloseModalVincular} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
          <Modal.Title>Crear Nueva Vinculación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dispositivo Origen</Form.Label>
                  <Form.Select 
                    value={dispositivoOrigen}
                    onChange={(e) => setDispositivoOrigen(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar dispositivo...</option>
                    {dispositivos.map(dispositivo => (
                      <option key={dispositivo.id} value={dispositivo.id}>
                        {dispositivo.nombre} ({dispositivo.tipo})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dispositivo Destino</Form.Label>
                  <Form.Select 
                    value={dispositivoDestino}
                    onChange={(e) => setDispositivoDestino(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar dispositivo...</option>
                    {dispositivos.map(dispositivo => (
                      <option key={dispositivo.id} value={dispositivo.id}>
                        {dispositivo.nombre} ({dispositivo.tipo})
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Tipo de Vinculación</Form.Label>
              <div>
                <Form.Check 
                  type="radio"
                  id="tipo-unidireccional"
                  label="Unidireccional (el dispositivo origen afecta al destino)"
                  name="tipoVinculacion"
                  value="unidireccional"
                  checked={tipoVinculacion === 'unidireccional'}
                  onChange={(e) => setTipoVinculacion(e.target.value)}
                />
                <Form.Check 
                  type="radio"
                  id="tipo-bidireccional"
                  label="Bidireccional (ambos dispositivos interactúan entre sí)"
                  name="tipoVinculacion"
                  value="bidireccional"
                  checked={tipoVinculacion === 'bidireccional'}
                  onChange={(e) => setTipoVinculacion(e.target.value)}
                />
              </div>
            </Form.Group>
            
            <h6 className="mt-4 mb-3">Configurar Reglas de Interacción</h6>
            
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Condición</Form.Label>
                  <Form.Select 
                    value={reglas.condicion}
                    onChange={(e) => setReglas({...reglas, condicion: e.target.value})}
                  >
                    <option value="mayor_que">Mayor que</option>
                    <option value="menor_que">Menor que</option>
                    <option value="igual_a">Igual a</option>
                    <option value="diferente_de">Diferente de</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Valor</Form.Label>
                  <Form.Control 
                    type="text"
                    value={reglas.valor}
                    onChange={(e) => setReglas({...reglas, valor: e.target.value})}
                    placeholder="Ej: 30, movimiento_detectado, etc."
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Acción</Form.Label>
                  <Form.Select 
                    value={reglas.accion}
                    onChange={(e) => setReglas({...reglas, accion: e.target.value})}
                  >
                    <option value="encender">Encender</option>
                    <option value="apagar">Apagar</option>
                    <option value="ajustar">Ajustar Configuración</option>
                    <option value="notificar">Enviar Notificación</option>
                    <option value="grabar">Iniciar Grabación</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <div className="alert alert-info mt-3">
              <small>
                <strong>Descripción de la regla:</strong> {renderizarDescripcionRegla(reglas)}
              </small>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalVincular}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleVincular}
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark
            }}
          >
            <FaLink style={{ marginRight: '5px' }} /> Crear Vinculación
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para Desvincular */}
      <Modal show={showModalDesvincular} onHide={handleCloseModalDesvincular}>
        <Modal.Header closeButton style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          <Modal.Title>Confirmar Desvinculación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vinculacionSeleccionada && (
            <>
              <Alert variant="warning">
                <p>¿Está seguro de que desea eliminar la vinculación entre:</p>
                <p className="mb-0"><strong>{vinculacionSeleccionada.origen.nombre}</strong> y <strong>{vinculacionSeleccionada.destino.nombre}</strong>?</p>
              </Alert>
              <p>Esta acción eliminará todas las reglas de interacción configuradas entre estos dispositivos.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalDesvincular}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDesvincular}>
            <FaUnlink style={{ marginRight: '5px' }} /> Confirmar Desvinculación
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Modal para Configuración */}
      <Modal show={showModalConfiguracion} onHide={handleCloseModalConfiguracion}>
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryMedium, color: colors.white }}>
          <Modal.Title>Configurar Vinculación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {vinculacionSeleccionada && (
            <>
              <div className="mb-4">
                <h6>Vinculación</h6>
                <p className="mb-0">
                  <strong>{vinculacionSeleccionada.origen.nombre}</strong> → <strong>{vinculacionSeleccionada.destino.nombre}</strong>
                </p>
                <Badge style={pageStyles.tipoBadge(vinculacionSeleccionada.tipo)} className="mt-2">
                  {vinculacionSeleccionada.tipo === 'bidireccional' ? 'Bidireccional' : 'Unidireccional'}
                </Badge>
              </div>
              
              <h6 className="mb-3">Editar Reglas de Interacción</h6>
              
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Condición</Form.Label>
                    <Form.Select 
                      value={reglas.condicion}
                      onChange={(e) => setReglas({...reglas, condicion: e.target.value})}
                    >
                      <option value="mayor_que">Mayor que</option>
                      <option value="menor_que">Menor que</option>
                      <option value="igual_a">Igual a</option>
                      <option value="diferente_de">Diferente de</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Valor</Form.Label>
                    <Form.Control 
                      type="text"
                      value={reglas.valor}
                      onChange={(e) => setReglas({...reglas, valor: e.target.value})}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Acción</Form.Label>
                    <Form.Select 
                      value={reglas.accion}
                      onChange={(e) => setReglas({...reglas, accion: e.target.value})}
                    >
                      <option value="encender">Encender</option>
                      <option value="apagar">Apagar</option>
                      <option value="ajustar">Ajustar Configuración</option>
                      <option value="notificar">Enviar Notificación</option>
                      <option value="grabar">Iniciar Grabación</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              
              <div className="alert alert-info mt-3">
                <small>
                  <strong>Descripción de la regla:</strong> {renderizarDescripcionRegla(reglas)}
                </small>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalConfiguracion}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGuardarConfiguracion}
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark
            }}
          >
            <FaCog style={{ marginRight: '5px' }} /> Guardar Configuración
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default IoTVinculacion;