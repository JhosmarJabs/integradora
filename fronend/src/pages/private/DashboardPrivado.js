import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { colors, typography, textStyles, buttons } from '../../styles/styles';

const DashboardPrivado = () => {
  // Estados para los datos del dashboard
  const [statistics, setStatistics] = useState({
    activeDevices: 0,
    totalDevices: 0,
    alerts: 0,
    efficiency: 0
  });
  
  const [loading, setLoading] = useState(true);
  
  // Estado para la configuración de horario
  const [schedule, setSchedule] = useState({
    morningStart: '08:00',
    morningEnd: '12:00',
    eveningStart: '16:00',
    eveningEnd: '20:00',
    daysActive: ['lunes', 'martes', 'miércoles', 'jueves', 'viernes']
  });
  
  // Simulación de carga de datos (se reemplazaría por llamadas a API reales)
  useEffect(() => {
    // Simulación de llamada a API
    setTimeout(() => {
      setStatistics({
        activeDevices: 12,
        totalDevices: 15,
        alerts: 2,
        efficiency: 85
      });
      setLoading(false);
    }, 1000);
  }, []);
  
  // Función para manejar cambios en el horario (se conectaría a backend)
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value
    });
  };
  
  // Función para guardar la configuración (se conectaría a backend)
  const saveSchedule = () => {
    console.log('Guardando configuración:', schedule);
    // Aquí iría la llamada a la API para guardar los cambios
    alert('Configuración guardada correctamente');
  };
  
  // Función para manejar cambios en los días activos
  const handleDayToggle = (day) => {
    if (schedule.daysActive.includes(day)) {
      setSchedule({
        ...schedule,
        daysActive: schedule.daysActive.filter(d => d !== day)
      });
    } else {
      setSchedule({
        ...schedule,
        daysActive: [...schedule.daysActive, day]
      });
    }
  };
  
  // Estilos para las tarjetas de estadísticas
  const statCardStyle = {
    padding: '20px',
    borderRadius: '10px',
    height: '100%',
    border: 'none',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-5px)'
    }
  };

  return (
    <div>
      <h2 style={textStyles.title}>Dashboard General</h2>
      <p style={textStyles.paragraph}>Bienvenido al panel de control, desde aquí puedes gestionar tu hogar inteligente.</p>
      
      {loading ? (
        <div className="text-center my-5">
          <p style={textStyles.paragraph}>Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Sección de estadísticas */}
          <h3 style={textStyles.subtitle} className="mt-4 mb-3">Estadísticas</h3>
          <Row>
            <Col md={3} className="mb-4">
              <Card style={{...statCardStyle, backgroundColor: colors.primaryLight}}>
                <Card.Body className="text-center">
                  <h1 style={{color: colors.white, fontSize: '2.5rem'}}>{statistics.activeDevices}</h1>
                  <p style={{color: colors.white, fontFamily: typography.fontPrimary}}>Dispositivos Activos</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card style={{...statCardStyle, backgroundColor: colors.primaryMedium}}>
                <Card.Body className="text-center">
                  <h1 style={{color: colors.white, fontSize: '2.5rem'}}>{statistics.totalDevices}</h1>
                  <p style={{color: colors.white, fontFamily: typography.fontPrimary}}>Dispositivos Totales</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card style={{...statCardStyle, backgroundColor: '#d9534f'}}>
                <Card.Body className="text-center">
                  <h1 style={{color: colors.white, fontSize: '2.5rem'}}>{statistics.alerts}</h1>
                  <p style={{color: colors.white, fontFamily: typography.fontPrimary}}>Alertas</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card style={{...statCardStyle, backgroundColor: '#5cb85c'}}>
                <Card.Body className="text-center">
                  <h1 style={{color: colors.white, fontSize: '2.5rem'}}>{statistics.efficiency}%</h1>
                  <p style={{color: colors.white, fontFamily: typography.fontPrimary}}>Eficiencia</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Sección de Control Manual */}
          <h3 style={textStyles.subtitle} className="mt-5 mb-3">Control Manual</h3>
          <Row>
            <Col md={6}>
              <Card style={{...statCardStyle, backgroundColor: colors.white}}>
                <Card.Body>
                  <h4 style={{color: colors.primaryDark, fontFamily: typography.fontPrimary}}>Activación Rápida</h4>
                  <Row className="mt-3">
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.primary} className="w-100">Luces ON</Button>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.secondary} className="w-100">Luces OFF</Button>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.primary} className="w-100">Clima ON</Button>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.secondary} className="w-100">Clima OFF</Button>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.primary} className="w-100">Seguridad ON</Button>
                    </Col>
                    <Col xs={6} className="mb-2">
                      <Button style={buttons.secondary} className="w-100">Seguridad OFF</Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card style={{...statCardStyle, backgroundColor: colors.white}}>
                <Card.Body>
                  <h4 style={{color: colors.primaryDark, fontFamily: typography.fontPrimary}}>Configuración de Horario</h4>
                  <Form className="mt-3">
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mañana - Inicio</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="morningStart" 
                            value={schedule.morningStart} 
                            onChange={handleScheduleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mañana - Fin</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="morningEnd" 
                            value={schedule.morningEnd} 
                            onChange={handleScheduleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tarde - Inicio</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="eveningStart" 
                            value={schedule.eveningStart} 
                            onChange={handleScheduleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Tarde - Fin</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="eveningEnd" 
                            value={schedule.eveningEnd} 
                            onChange={handleScheduleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Días Activos</Form.Label>
                      <div className="d-flex flex-wrap">
                        {['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'].map(day => (
                          <Form.Check 
                            key={day}
                            type="checkbox"
                            id={`day-${day}`}
                            label={day.charAt(0).toUpperCase() + day.slice(1)}
                            checked={schedule.daysActive.includes(day)}
                            onChange={() => handleDayToggle(day)}
                            className="me-3 mb-2"
                          />
                        ))}
                      </div>
                    </Form.Group>
                    
                    <Button 
                      style={buttons.primary} 
                      className="mt-2" 
                      onClick={saveSchedule}
                    >
                      Guardar Configuración
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Accesos Rápidos */}
          <h3 style={textStyles.subtitle} className="mt-5 mb-3">Accesos Rápidos</h3>
          <Row>
            <Col md={4} className="mb-4">
              <Link to="/privado/dispositivos" style={{ textDecoration: 'none' }}>
                <Card style={{...statCardStyle, backgroundColor: colors.white}}>
                  <Card.Body className="text-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: colors.primaryLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px'
                    }}>
                      <i className="fas fa-wifi" style={{ color: colors.white, fontSize: '24px' }}></i>
                    </div>
                    <h4 style={{color: colors.primaryDark, fontFamily: typography.fontPrimary}}>Dispositivos</h4>
                    <p style={textStyles.paragraph}>Gestiona todos tus dispositivos IoT</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            
            <Col md={4} className="mb-4">
              <Card style={{...statCardStyle, backgroundColor: colors.white}}>
                <Card.Body className="text-center">
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: colors.primaryLight,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 15px'
                  }}>
                    <i className="fas fa-chart-bar" style={{ color: colors.white, fontSize: '24px' }}></i>
                  </div>
                  <h4 style={{color: colors.primaryDark, fontFamily: typography.fontPrimary}}>Reportes</h4>
                  <p style={textStyles.paragraph}>Visualiza reportes y estadísticas</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4} className="mb-4">
              <Link to="/privado/perfil" style={{ textDecoration: 'none' }}>
                <Card style={{...statCardStyle, backgroundColor: colors.white}}>
                  <Card.Body className="text-center">
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: colors.primaryLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 15px'
                    }}>
                      <i className="fas fa-user-cog" style={{ color: colors.white, fontSize: '24px' }}></i>
                    </div>
                    <h4 style={{color: colors.primaryDark, fontFamily: typography.fontPrimary}}>Perfil</h4>
                    <p style={textStyles.paragraph}>Configura tu cuenta de usuario</p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardPrivado;