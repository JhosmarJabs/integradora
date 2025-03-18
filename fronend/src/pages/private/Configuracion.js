import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col, Nav, Tab } from "react-bootstrap";
import { colors, iotStyles } from "../../styles/styles"; // Importamos styles
import { FaArrowLeft, FaTemperatureLow, FaTint, FaWindowMaximize } from 'react-icons/fa';

const Configuracion = () => {

  return (
    <>
      <Container className="py-4">
        <div className="bg-secondary text-white text-center py-3 mb-4">
          <h3 className="mb-0">CONFIGURACIÓN</h3>
        </div>

        <Tab.Container id="configuracion-tabs" defaultActiveKey="visualizacion">
          <Row>
            <Col md={3}>
              <Nav variant="pills" className="flex-column mb-4">
                <Nav.Item>
                  <Nav.Link eventKey="visualizacion">Visualización IOT</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="modificaciones">Modificaciones</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="agregar">Agregar Dispositivo</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="horario">Configuración Horario</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col md={9}>
              <Tab.Content>
                {/* Sección de Visualización IOT  */}
                <Tab.Pane eventKey="visualizacion">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Visualización IOT</h5>
                    </Card.Header>
                    <Card.Body>
                      {selectedDevice === null ? (
                        // Vista de lista de dispositivos
                        <>
                          <h5 className="mb-4">Mis Dispositivos IoT</h5>
                          <Row>
                            {devices.map(device => (
                              <Col md={3} sm={6} key={device.id} className="mb-4">
                                <Card 
                                  className="h-100" 
                                  style={iotStyles.deviceCard}
                                  onClick={() => handleSelectDevice(device.id)}
                                >
                                  <Card.Body className="text-center">
                                    <FaWindowMaximize size={40} className="mb-3" />
                                    <Card.Title>{device.name}</Card.Title>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </>
                      ) : (
                        // Vista detallada del dispositivo seleccionado
                        <div>
                          <Button 
                            variant="outline-secondary" 
                            className="mb-4" 
                            onClick={handleBack}
                          >
                            <FaArrowLeft /> Volver
                          </Button>
                          
                          <Card className="shadow-sm">
                            <Card.Header as="h5">
                              {devices.find(d => d.id === selectedDevice).name}
                            </Card.Header>
                            <Card.Body>
                              <Row>
                                {/* Datos de temperatura y humedad */}
                                <Col md={6} className="mb-4">
                                  <Row>
                                    <Col xs={6}>
                                      <div style={iotStyles.sensorCard}>
                                        <FaTemperatureLow size={24} className="mb-2" />
                                        <h4>{deviceData[selectedDevice].temperature}°C</h4>
                                        <p className="mb-0">temperatura</p>
                                      </div>
                                    </Col>
                                    <Col xs={6}>
                                      <div style={iotStyles.sensorCard}>
                                        <FaTint size={24} className="mb-2" />
                                        <h4>{deviceData[selectedDevice].humidity}%</h4>
                                        <p className="mb-0">humedad</p>
                                      </div>
                                    </Col>
                                  </Row>
                                </Col>
                                
                                {/* Control de persianas */}
                                <Col md={6}>
                                  <h5 className="mb-3 text-center">Persianas</h5>
                                  <Row className="align-items-center">
                                    <Col xs={5} className="text-center">
                                      <div style={iotStyles.iconCircle}>
                                        <FaWindowMaximize size={36} />
                                      </div>
                                    </Col>
                                    <Col xs={3}>
                                      <Form.Range 
                                        value={blindLevel}
                                        onChange={handleBlindChange}
                                        min={0}
                                        max={100}
                                        step={1}
                                        className="vertical-slider"
                                        style={iotStyles.verticalSlider}
                                      />
                                    </Col>
                                    <Col xs={4} className="text-center">
                                      <Button
                                        variant={blindState === 'Abierto' ? 'primary' : 'secondary'}
                                        className="mb-2 d-block w-100"
                                        onClick={toggleBlindState}
                                      >
                                        Abierto
                                      </Button>
                                      <Button
                                        variant={blindState === 'Cerrado' ? 'primary' : 'secondary'}
                                        className="d-block w-100"
                                        onClick={toggleBlindState}
                                      >
                                        Cerrado
                                      </Button>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* Sección de Modificaciones */}
                <Tab.Pane eventKey="modificaciones">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Modificaciones</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={handleModificacionSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Nombre</Form.Label>
                          <Form.Control
                            type="text"
                            name="nombre"
                            value={modificacionData.nombre}
                            onChange={handleModificacionChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Lugar</Form.Label>
                          <Form.Control
                            type="text"
                            name="lugar"
                            value={modificacionData.lugar}
                            onChange={handleModificacionChange}
                          />
                        </Form.Group>
                        
                        <div className="text-end mt-3">
                          <Button type="submit" variant="primary">Guardar Modificaciones</Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* Sección de Agregar Dispositivo */}
                <Tab.Pane eventKey="agregar">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Agregar Dispositivo</h5>
                    </Card.Header>
                    <Card.Body>
                      <div style={iotStyles.addDeviceContainer}>
                        <i className="bi bi-plus-circle" style={iotStyles.addDeviceIcon}></i>
                        <h4 className="mt-3">Agregar Nuevo Dispositivo</h4>
                        <p className="text-muted">Haga clic en el botón para agregar un nuevo dispositivo IOT</p>
                        <Button variant="success" size="lg" className="mt-2">
                          <i className="bi bi-plus-lg me-2"></i>
                          Agregar Dispositivo
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                {/* Sección de Configuración de Horario */}
                <Tab.Pane eventKey="horario">
                  <Card className="shadow-sm">
                    <Card.Header className="bg-light">
                      <h5 className="mb-0">Configuración de Horario</h5>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={handleHorarioSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Horario</Form.Label>
                          <Form.Control
                            type="time"
                            name="horario"
                            value={horarioData.horario}
                            onChange={handleHorarioChange}
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Lugar</Form.Label>
                          <Form.Control
                            type="text"
                            name="lugar"
                            value={horarioData.lugar}
                            onChange={handleHorarioChange}
                          />
                        </Form.Group>
                        
                        <div className="d-flex justify-content-between mt-4">
                          <Button variant="secondary" type="button">
                            Cancelar
                          </Button>
                          <Button variant="success" type="submit">
                            Agregar
                          </Button>
                        </div>
                      </Form>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default Configuracion;