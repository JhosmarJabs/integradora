import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaUserPlus, FaEye, FaEyeSlash, FaIdCard, FaUserShield } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosAltas = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    username: '',
    password: '',
    confirmPassword: '',
    rol: 'cliente',
    departamento: '',
    activo: true
  });
  
  // Estados adicionales
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  
  // Opciones de roles
  const roles = [
    { id: 'admin', nombre: 'Administrador', descripcion: 'Acceso completo al sistema' },
    { id: 'supervisor', nombre: 'Supervisor', descripcion: 'Gestión de datos y reportes' },
    { id: 'tecnico', nombre: 'Técnico', descripcion: 'Gestión de dispositivos IoT' },
    { id: 'cliente', nombre: 'Cliente', descripcion: 'Acceso limitado a sus datos' }
  ];
  
  // Opciones de departamentos
  const departamentos = [
    'Tecnología',
    'Ventas',
    'Administración',
    'Soporte',
    'Marketing',
    'Operaciones',
    'Recursos Humanos'
  ];
  
  // Manejadores de eventos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleGenerarUsername = () => {
    if (formData.nombre && formData.apellido) {
      const nombre = formData.nombre.toLowerCase().replace(/\s/g, '');
      const apellido = formData.apellido.toLowerCase().replace(/\s/g, '');
      const username = `${nombre}.${apellido}`;
      setFormData({
        ...formData,
        username
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Validar que las contraseñas coincidan
    if (formData.password !== formData.confirmPassword) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Las contraseñas no coinciden.'
      });
      return;
    }
    
    // En un caso real, aquí se enviaría la información a una API
    console.log("Datos del usuario a registrar:", formData);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `El usuario ${formData.nombre} ${formData.apellido} ha sido registrado correctamente.`
    });
    
    // Reiniciar formulario
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      username: '',
      password: '',
      confirmPassword: '',
      rol: 'cliente',
      departamento: '',
      activo: true
    });
    setValidated(false);
  };
  
  const handleReset = () => {
    setFormData({
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      username: '',
      password: '',
      confirmPassword: '',
      rol: 'cliente',
      departamento: '',
      activo: true
    });
    setValidated(false);
    setAlerta({ show: false, variant: '', mensaje: '' });
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
    formGroup: {
      marginBottom: '20px'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: '10px',
      marginTop: '20px'
    },
    infoSection: {
      backgroundColor: colors.primaryLight + '20',
      borderLeft: `4px solid ${colors.primaryMedium}`,
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '4px'
    },
    roleCard: {
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      height: '100%'
    },
    roleCardSelected: {
      borderColor: colors.primaryDark,
      boxShadow: `0 0 0 2px ${colors.primaryDark}`,
      backgroundColor: colors.primaryLight + '10'
    },
    roleIcon: {
      fontSize: '24px',
      marginBottom: '10px',
      color: colors.primaryMedium
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Alta de Usuarios</h2>
          <p style={textStyles.paragraph}>
            Utilice este formulario para registrar nuevos usuarios en el sistema.
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
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formNombre">
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese el nombre.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formApellido">
                  <Form.Label>Apellido</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese el apellido.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      placeholder="ejemplo@correo.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un email válido.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formTelefono">
                  <Form.Label>Teléfono</Form.Label>
                  <InputGroup>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="(555) 123-4567"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Nombre de Usuario</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaIdCard /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="nombre.apellido"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <Button 
                      variant="outline-secondary" 
                      onClick={handleGenerarUsername}
                      title="Generar automáticamente"
                    >
                      Generar
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un nombre de usuario.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formDepartamento">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Select
                    name="departamento"
                    value={formData.departamento}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar departamento</option>
                    {departamentos.map((depto, index) => (
                      <option key={index} value={depto}>{depto}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingrese la contraseña"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      La contraseña debe tener al menos 8 caracteres.
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirmar Contraseña</Form.Label>
                  <InputGroup hasValidation>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirme la contraseña"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid">
                      Por favor confirme la contraseña.
                    </Form.Control.Feedback>
                  </InputGroup>
                  <Form.Text className="text-muted">
                    Las contraseñas deben coincidir.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="formRol">
              <Form.Label>Rol del Usuario</Form.Label>
              <Row>
                {roles.map((rol) => (
                  <Col key={rol.id} md={3} className="mb-3">
                    <Card 
                      style={{
                        ...pageStyles.roleCard,
                        ...(formData.rol === rol.id ? pageStyles.roleCardSelected : {})
                      }}
                      onClick={() => setFormData({...formData, rol: rol.id})}
                    >
                      <Card.Body className="text-center">
                        <div style={pageStyles.roleIcon}>
                          <FaUserShield />
                        </div>
                        <Card.Title style={{ fontSize: '16px', marginBottom: '5px' }}>
                          {rol.nombre}
                        </Card.Title>
                        <Card.Text style={{ fontSize: '12px', color: '#6c757d' }}>
                          {rol.descripcion}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="formActivo">
              <Form.Check 
                type="checkbox"
                label="Usuario activo"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Los usuarios inactivos no pueden iniciar sesión en el sistema.
              </Form.Text>
            </Form.Group>
            
            <div style={pageStyles.actionButtons}>
              <Button 
                variant="outline-secondary" 
                onClick={handleReset}
              >
                Limpiar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                style={{ 
                  backgroundColor: colors.primaryDark,
                  borderColor: colors.primaryDark
                }}
              >
                <FaUserPlus style={{ marginRight: '5px' }} /> Registrar Usuario
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Recomendaciones de Seguridad</Card.Title>
          
          <div style={pageStyles.infoSection}>
            <h6>Para una mejor seguridad, recomiende a los usuarios:</h6>
            <ul>
              <li>Usar contraseñas de al menos 8 caracteres.</li>
              <li>Incluir letras (mayúsculas y minúsculas), números y símbolos.</li>
              <li>No usar información personal fácilmente deducible.</li>
              <li>No compartir contraseñas con otras personas.</li>
              <li>Cambiar contraseñas regularmente.</li>
              <li>Activar la autenticación de dos factores cuando esté disponible.</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UsuariosAltas;