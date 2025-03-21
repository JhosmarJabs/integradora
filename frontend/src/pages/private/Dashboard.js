import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';

const Dashboard = () => {
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
    setTimeout(() => {
      setStatistics({
        activeDevices: 12,
        totalDevices: 15,
        alerts: 2,
        efficiency: 85
      });
      setLoading(false);
    }, 500);
  }, []);
  
  // Función para manejar cambios en el horario
  const handleScheduleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value
    });
  };
  
  // Función para guardar la configuración
  const saveSchedule = () => {
    console.log('Configuración guardada:', schedule);
    // Aquí iría la llamada a la API para guardar los cambios
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
  
  return (
    <div className="p-4">
      <h2 className="mb-1 text-2xl font-bold text-gray-800">Dashboard General</h2>
      <p className="mb-4 text-gray-600">Bienvenido al panel de control, desde aquí puedes gestionar tu hogar inteligente.</p>
      
      {loading ? (
        <div className="text-center my-5">
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      ) : (
        <>
          {/* Sección de estadísticas */}
          <h3 className="mb-3 text-xl font-semibold text-gray-700">Estadísticas</h3>
          <Row className="mb-5">
            <Col md={3} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#476685' }}>
                <Card.Body className="text-center py-4">
                  <h1 className="text-4xl font-bold text-white mb-2">{statistics.activeDevices}</h1>
                  <p className="text-white mb-0">Dispositivos Activos</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#1B2A4A' }}>
                <Card.Body className="text-center py-4">
                  <h1 className="text-4xl font-bold text-white mb-2">{statistics.totalDevices}</h1>
                  <p className="text-white mb-0">Dispositivos Totales</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#E74C3C' }}>
                <Card.Body className="text-center py-4">
                  <h1 className="text-4xl font-bold text-white mb-2">{statistics.alerts}</h1>
                  <p className="text-white mb-0">Alertas</p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={3} className="mb-4">
              <Card className="h-100 shadow-sm" style={{ borderRadius: '10px', border: 'none', backgroundColor: '#58B957' }}>
                <Card.Body className="text-center py-4">
                  <h1 className="text-4xl font-bold text-white mb-2">{statistics.efficiency}%</h1>
                  <p className="text-white mb-0">Eficiencia</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          {/* Sección de Control Manual */}
          <h3 className="mb-3 text-xl font-semibold text-gray-700">Control Manual</h3>
          <Row className="mb-5">
            <Col md={6} className="mb-4">
              <Card className="shadow-sm h-100" style={{ borderRadius: '10px', border: 'none' }}>
                <Card.Body className="p-4">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Activación Rápida</h4>
                  <Row>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#1B2A4A', border: 'none', borderRadius: '8px' }}
                      >
                        Luces ON
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#6C757D', border: 'none', borderRadius: '8px' }}
                      >
                        Luces OFF
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#1B2A4A', border: 'none', borderRadius: '8px' }}
                      >
                        Clima ON
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#6C757D', border: 'none', borderRadius: '8px' }}
                      >
                        Clima OFF
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#1B2A4A', border: 'none', borderRadius: '8px' }}
                      >
                        Seguridad ON
                      </Button>
                    </Col>
                    <Col xs={6} className="mb-3">
                      <Button 
                        className="w-100 py-2" 
                        style={{ backgroundColor: '#6C757D', border: 'none', borderRadius: '8px' }}
                      >
                        Seguridad OFF
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} className="mb-4">
              <Card className="shadow-sm h-100" style={{ borderRadius: '10px', border: 'none' }}>
                <Card.Body className="p-4">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800">Configuración de Horario</h4>
                  <Form>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="text-gray-600 text-sm">Mañana - Inicio</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="morningStart" 
                            value={schedule.morningStart} 
                            onChange={handleScheduleChange}
                            className="border-gray-300 rounded"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="text-gray-600 text-sm">Mañana - Fin</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="morningEnd" 
                            value={schedule.morningEnd} 
                            onChange={handleScheduleChange}
                            className="border-gray-300 rounded"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="text-gray-600 text-sm">Tarde - Inicio</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="eveningStart" 
                            value={schedule.eveningStart} 
                            onChange={handleScheduleChange}
                            className="border-gray-300 rounded"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label className="text-gray-600 text-sm">Tarde - Fin</Form.Label>
                          <Form.Control 
                            type="time" 
                            name="eveningEnd" 
                            value={schedule.eveningEnd} 
                            onChange={handleScheduleChange}
                            className="border-gray-300 rounded"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label className="text-gray-600 text-sm d-block mb-2">Días Activos</Form.Label>
                      <div className="d-flex flex-wrap">
                        {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'].map(day => (
                          <Form.Check 
                            key={day}
                            type="checkbox"
                            id={`day-${day}`}
                            label={day}
                            checked={schedule.daysActive.includes(day.toLowerCase())}
                            onChange={() => handleDayToggle(day.toLowerCase())}
                            className="me-3 mb-2"
                            inline
                          />
                        ))}
                      </div>
                      <div className="d-flex flex-wrap">
                        {['Sábado', 'Domingo'].map(day => (
                          <Form.Check 
                            key={day}
                            type="checkbox"
                            id={`day-${day}`}
                            label={day}
                            checked={schedule.daysActive.includes(day.toLowerCase())}
                            onChange={() => handleDayToggle(day.toLowerCase())}
                            className="me-3 mb-2"
                            inline
                          />
                        ))}
                      </div>
                    </Form.Group>
                    
                    <div className="text-end">
                      <Button 
                        onClick={saveSchedule}
                        className="mt-2 px-4 py-2"
                        style={{ backgroundColor: '#1B2A4A', border: 'none', borderRadius: '8px' }}
                      >
                        Guardar Configuración
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;