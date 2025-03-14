import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, ProgressBar } from 'react-bootstrap';
import { colors, textStyles } from '../../../styles/styles';

const IoTGeneral = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [tipoFiltro, setTipoFiltro] = useState('');
  
  // Simular carga de datos
  useEffect(() => {
    // Datos de ejemplo
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
        propietario: 'Juan Pérez'
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
        propietario: 'María López'
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
        propietario: 'Carlos Rodríguez'
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
        propietario: 'Ana García'
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
        propietario: 'Roberto Fernández'
      }
    ];
    
    setDispositivos(datosDispositivos);
  }, []);
  
  // Filtrar dispositivos
  const dispositivosFiltrados = dispositivos.filter(dispositivo => {
    const coincideTexto = dispositivo.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
                         dispositivo.ubicacion.toLowerCase().includes(filtro.toLowerCase());
    const coincideTipo = tipoFiltro === '' || dispositivo.tipo === tipoFiltro;
    return coincideTexto && coincideTipo;
  });
  
  // Obtener tipos únicos para el filtro
  const tipos = [...new Set(dispositivos.map(d => d.tipo))];
  
  // Estadísticas de dispositivos
  const estadisticas = {
    total: dispositivos.length,
    conectados: dispositivos.filter(d => d.estado === 'conectado').length,
    desconectados: dispositivos.filter(d => d.estado === 'desconectado').length,
    mantenimiento: dispositivos.filter(d => d.estado === 'mantenimiento').length,
    sensores: dispositivos.filter(d => d.tipo === 'sensor').length,
    actuadores: dispositivos.filter(d => d.tipo === 'actuador').length,
    camaras: dispositivos.filter(d => d.tipo === 'camara').length
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
    },
    batteryStatus: (value) => {
      let color = '#dc3545'; // rojo para batería baja
      if (value > 70) color = '#28a745'; // verde para batería alta
      else if (value > 30) color = '#ffc107'; // amarillo para batería media
      
      return {
        color: color,
        fontWeight: 'bold'
      };
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={textStyles.title}>Vista General de IoT</h2>
          <p style={textStyles.paragraph}>Monitoreo y administración de dispositivos IoT conectados al sistema.</p>
        </Col>
      </Row>
      
      {/* Estadísticas */}
      <Row className="mb-4">
        <Col md={4} lg={3}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard}}>
            <div style={pageStyles.statTitle}>Total Dispositivos</div>
            <div style={pageStyles.statValue}>{estadisticas.total}</div>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#28a745'}}>
            <div style={pageStyles.statTitle}>Dispositivos Conectados</div>
            <div style={pageStyles.statValue}>{estadisticas.conectados}</div>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#dc3545'}}>
            <div style={pageStyles.statTitle}>Dispositivos Desconectados</div>
            <div style={pageStyles.statValue}>{estadisticas.desconectados}</div>
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#ffc107'}}>
            <div style={pageStyles.statTitle}>En Mantenimiento</div>
            <div style={pageStyles.statValue}>{estadisticas.mantenimiento}</div>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={4}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#0dcaf0'}}>
            <div style={pageStyles.statTitle}>Sensores</div>
            <div style={pageStyles.statValue}>{estadisticas.sensores}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#6f42c1'}}>
            <div style={pageStyles.statTitle}>Actuadores</div>
            <div style={pageStyles.statValue}>{estadisticas.actuadores}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card style={{...pageStyles.card, ...pageStyles.statCard, borderLeftColor: '#fd7e14'}}>
            <div style={pageStyles.statTitle}>Cámaras</div>
            <div style={pageStyles.statValue}>{estadisticas.camaras}</div>
          </Card>
        </Col>
      </Row>
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre o ubicación..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={2}>
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
        <Col md={2}>
          <Button 
            variant="primary"
            style={{ backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }}
            className="w-100"
          >
            Añadir Dispositivo
          </Button>
        </Col>
      </Row>
      
      {/* Tabla de Dispositivos */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title className="mb-4">Listado de Dispositivos IoT</Card.Title>
          <Table responsive hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Ubicación</th>
                <th>Estado</th>
                <th>Batería</th>
                <th>Conexión</th>
                <th>Última Actividad</th>
                <th>Propietario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dispositivosFiltrados.map((dispositivo) => (
                <tr key={dispositivo.id}>
                  <td>{dispositivo.id}</td>
                  <td>{dispositivo.nombre}</td>
                  <td>
                    <Badge bg={
                      dispositivo.tipo === 'sensor' ? 'info' : 
                      dispositivo.tipo === 'actuador' ? 'primary' : 'warning'
                    }>
                      {dispositivo.tipo.charAt(0).toUpperCase() + dispositivo.tipo.slice(1)}
                    </Badge>
                  </td>
                  <td>{dispositivo.ubicacion}</td>
                  <td>
                    <Badge bg={
                      dispositivo.estado === 'conectado' ? 'success' : 
                      dispositivo.estado === 'desconectado' ? 'danger' : 'warning'
                    }>
                      {dispositivo.estado.charAt(0).toUpperCase() + dispositivo.estado.slice(1)}
                    </Badge>
                  </td>
                  <td>
                    <div style={{ width: '100px' }}>
                      <ProgressBar 
                        now={dispositivo.bateria} 
                        label={`${dispositivo.bateria}%`}
                        variant={
                          dispositivo.bateria > 70 ? 'success' : 
                          dispositivo.bateria > 30 ? 'warning' : 'danger'
                        }
                        style={{ height: '15px' }}
                      />
                    </div>
                  </td>
                  <td>{dispositivo.conexion}</td>
                  <td>{dispositivo.ultimaActividad}</td>
                  <td>{dispositivo.propietario}</td>
                  <td>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                    >
                      Monitorear
                    </Button>
                    <Button 
                      variant="outline-secondary" 
                      size="sm"
                      className="me-2"
                    >
                      Configurar
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                    >
                      Reiniciar
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

export default IoTGeneral;