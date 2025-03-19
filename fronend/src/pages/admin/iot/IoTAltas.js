import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaPlus, FaQrcode, FaWifi, FaBluetooth, FaNetworkWired } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const IoTAltas = () => {
  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    tipo: 'sensor',
    ubicacion: '',
    conexion: 'wifi',
    propietario: '',
    descripcion: '',
    configuracion: {}
  });
  
  const [validated, setValidated] = useState(false);
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  const [showConfiguracionAvanzada, setShowConfiguracionAvanzada] = useState(false);
  
  const generarID = () => {
    const randomID = 'DISP-' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    setFormData({ ...formData, id: randomID });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleTipoChange = (e) => {
    const tipo = e.target.value;
    let configuracion = {};
    
    if (tipo === 'sensor') {
      configuracion = { intervaloMuestreo: 60, unidadMedida: '', rangoMin: 0, rangoMax: 100 };
    } else if (tipo === 'actuador') {
      configuracion = { tipoControl: 'binario', estadoInicial: 'apagado' };
    } else if (tipo === 'camara') {
      configuracion = { resolucion: '720p', fps: 30, almacenamiento: 'nube' };
    }
    
    setFormData({ ...formData, tipo, configuracion });
  };
  
  const handleConfiguracionChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, configuracion: { ...formData.configuracion, [name]: value } });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/dispositivos-iot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al registrar el dispositivo');
      }

      const savedDispositivo = await response.json();
      setAlerta({
        show: true,
        variant: 'success',
        mensaje: `El dispositivo "${savedDispositivo.nombre}" ha sido registrado correctamente con ID: ${savedDispositivo.idDispositivo}`
      });

      // Resetear formulario
      setFormData({
        id: '',
        nombre: '',
        tipo: 'sensor',
        ubicacion: '',
        conexion: 'wifi',
        propietario: '',
        descripcion: '',
        configuracion: {}
      });
      setValidated(false);
      setShowConfiguracionAvanzada(false);
    } catch (error) {
      setAlerta({ show: true, variant: 'danger', mensaje: error.message });
    }
  };
  
  const pageStyles = {
    card: { borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '20px' },
    title: { ...textStyles.title, marginBottom: '10px' },
    subtitle: { ...textStyles.subtitle, marginBottom: '20px' },
    formGroup: { marginBottom: '20px' },
    actionButtons: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' },
    configHeader: { borderBottom: '1px solid #dee2e6', paddingBottom: '10px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Registro de Dispositivos IoT</h2>
          <p style={textStyles.paragraph}>Utilice este formulario para dar de alta nuevos dispositivos IoT en el sistema.</p>
        </Col>
      </Row>
      
      {alerta.show && (
        <Alert variant={alerta.variant} onClose={() => setAlerta({ ...alerta, show: false })} dismissible>
          {alerta.mensaje}
        </Alert>
      )}
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Formulario de Registro</Card.Title>
          
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>ID de Dispositivo</Form.Label>
                  <InputGroup>
                    <Form.Control 
                      type="text" 
                      name="id" 
                      value={formData.id} 
                      onChange={handleChange}
                      placeholder="DISP-0000"
                      required
                    />
                    <Button variant="outline-secondary" onClick={generarID} title="Generar ID aleatorio">
                      <FaQrcode />
                    </Button>
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">El ID del dispositivo es obligatorio.</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Nombre del Dispositivo</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="nombre" 
                    value={formData.nombre} 
                    onChange={handleChange}
                    placeholder="Ej: Sensor de Temperatura Sala"
                    required
                  />
                  <Form.Control.Feedback type="invalid">El nombre del dispositivo es obligatorio.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={4}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Tipo de Dispositivo</Form.Label>
                  <Form.Select name="tipo" value={formData.tipo} onChange={handleTipoChange} required>
                    <option value="sensor">Sensor</option>
                    <option value="actuador">Actuador</option>
                    <option value="camara">Cámara</option>
                    <option value="gateway">Gateway</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Tipo de Conexión</Form.Label>
                  <Form.Select name="conexion" value={formData.conexion} onChange={handleChange} required>
                    <option value="wifi">WiFi</option>
                    <option value="bluetooth">Bluetooth</option>
                    <option value="zigbee">Zigbee</option>
                    <option value="ethernet">Ethernet</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group style={pageStyles.formGroup}>
                  <Form.Label>Ubicación</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="ubicacion" 
                    value={formData.ubicacion} 
                    onChange={handleChange}
                    placeholder="Ej: Sala de Servidores"
                    required
                  />
                  <Form.Control.Feedback type="invalid">La ubicación del dispositivo es obligatoria.</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Propietario / Responsable</Form.Label>
              <Form.Control 
                type="text" 
                name="propietario" 
                value={formData.propietario} 
                onChange={handleChange}
                placeholder="Nombre del responsable del dispositivo"
                required
              />
              <Form.Control.Feedback type="invalid">El propietario o responsable es obligatorio.</Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group style={pageStyles.formGroup}>
              <Form.Label>Descripción</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                name="descripcion" 
                value={formData.descripcion} 
                onChange={handleChange}
                placeholder="Descripción breve del dispositivo y su función"
              />
            </Form.Group>
            
            <div style={pageStyles.configHeader}>
              <Button variant="link" onClick={() => setShowConfiguracionAvanzada(!showConfiguracionAvanzada)} className="p-0">
                {showConfiguracionAvanzada ? "Ocultar configuración avanzada" : "Mostrar configuración avanzada"}
              </Button>
            </div>
            
            {showConfiguracionAvanzada && (
              <Card style={{ marginBottom: '20px' }}>
                <Card.Body>
                  <Card.Title style={{ fontSize: '16px', marginBottom: '15px' }}>Configuración Específica</Card.Title>
                  {formData.tipo === 'sensor' && (
                    <Row>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Intervalo de Muestreo (segundos)</Form.Label>
                          <Form.Control type="number" name="intervaloMuestreo" value={formData.configuracion.intervaloMuestreo || ''} onChange={handleConfiguracionChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Unidad de Medida</Form.Label>
                          <Form.Control type="text" name="unidadMedida" value={formData.configuracion.unidadMedida || ''} onChange={handleConfiguracionChange} placeholder="Ej: °C, %, lux" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Rango Mínimo</Form.Label>
                          <Form.Control type="number" name="rangoMin" value={formData.configuracion.rangoMin || ''} onChange={handleConfiguracionChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Rango Máximo</Form.Label>
                          <Form.Control type="number" name="rangoMax" value={formData.configuracion.rangoMax || ''} onChange={handleConfiguracionChange} />
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  {formData.tipo === 'actuador' && (
                    <Row>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Tipo de Control</Form.Label>
                          <Form.Select name="tipoControl" value={formData.configuracion.tipoControl || ''} onChange={handleConfiguracionChange}>
                            <option value="binario">Binario (On/Off)</option>
                            <option value="variable">Variable (Dimmer)</option>
                            <option value="multiestado">Multi-estado</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Estado Inicial</Form.Label>
                          <Form.Select name="estadoInicial" value={formData.configuracion.estadoInicial || ''} onChange={handleConfiguracionChange}>
                            <option value="apagado">Apagado</option>
                            <option value="encendido">Encendido</option>
                            <option value="ultimo">Último estado</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                  {formData.tipo === 'camara' && (
                    <Row>
                      <Col md={4}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Resolución</Form.Label>
                          <Form.Select name="resolucion" value={formData.configuracion.resolucion || ''} onChange={handleConfiguracionChange}>
                            <option value="480p">480p</option>
                            <option value="720p">720p</option>
                            <option value="1080p">1080p</option>
                            <option value="4k">4K</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>FPS</Form.Label>
                          <Form.Control type="number" name="fps" value={formData.configuracion.fps || ''} onChange={handleConfiguracionChange} />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group style={pageStyles.formGroup}>
                          <Form.Label>Almacenamiento</Form.Label>
                          <Form.Select name="almacenamiento" value={formData.configuracion.almacenamiento || ''} onChange={handleConfiguracionChange}>
                            <option value="local">Local</option>
                            <option value="nube">Nube</option>
                            <option value="hibrido">Híbrido</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  )}
                </Card.Body>
              </Card>
            )}
            
            <div style={pageStyles.actionButtons}>
              <Button variant="outline-secondary" onClick={() => { setFormData({ id: '', nombre: '', tipo: 'sensor', ubicacion: '', conexion: 'wifi', propietario: '', descripcion: '', configuracion: {} }); setValidated(false); setShowConfiguracionAvanzada(false); }}>
                Limpiar
              </Button>
              <Button variant="primary" type="submit" style={{ backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }}>
                <FaPlus style={{ marginRight: '5px' }} /> Registrar Dispositivo
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Tipos de Conexión</Card.Title>
          <Row>
            <Col md={4} className="mb-3">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaWifi size={24} color={colors.primaryMedium} style={{ marginRight: '10px' }} />
                <div>
                  <h6 style={{ margin: 0 }}>WiFi</h6>
                  <small className="text-muted">Conexión inalámbrica estándar</small>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaBluetooth size={24} color={colors.primaryMedium} style={{ marginRight: '10px' }} />
                <div>
                  <h6 style={{ margin: 0 }}>Bluetooth</h6>
                  <small className="text-muted">Para dispositivos de corto alcance</small>
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaNetworkWired size={24} color={colors.primaryMedium} style={{ marginRight: '10px' }} />
                <div>
                  <h6 style={{ margin: 0 }}>Ethernet</h6>
                  <small className="text-muted">Conexión cableada para mayor estabilidad</small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default IoTAltas;