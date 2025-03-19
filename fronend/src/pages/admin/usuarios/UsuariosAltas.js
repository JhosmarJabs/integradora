import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, InputGroup } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaPhone, FaUserPlus, FaEye, FaEyeSlash, FaUserShield } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosAltas = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Para validación en frontend
    name: '',
    surname: '',
    phone: '',
    role: 'cliente',
    status: 'active'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  const [loading, setLoading] = useState(false);
  
  const roles = [
    { id: 'admin', nombre: 'Administrador', descripcion: 'Acceso completo al sistema' },
    { id: 'cliente', nombre: 'Cliente', descripcion: 'Acceso limitado a sus datos' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
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

    setLoading(true);

    // Preparar los datos para enviar al backend
    const userData = {
      email: formData.email,
      password: formData.password,
      name: formData.name,
      surname: formData.surname,
      phone: formData.phone,
      role: formData.role,
      status: formData.status
    };

    try {
      // Enviar los datos al backend
      const response = await fetch('http://localhost:5000/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlerta({
          show: true,
          variant: 'success',
          mensaje: `El usuario ${formData.name} ${formData.surname} ha sido registrado correctamente.`
        });

        // Reiniciar formulario
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          name: '',
          surname: '',
          phone: '',
          role: 'cliente',
          status: 'active'
        });
        setValidated(false);
      } else {
        setAlerta({
          show: true,
          variant: 'danger',
          mensaje: data.message || 'Error al registrar el usuario.'
        });
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'Ocurrió un problema al registrar el usuario.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      surname: '',
      phone: '',
      role: 'cliente',
      status: 'active'
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
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nombre</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el nombre"
                      name="name"
                      value={formData.name}
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
                <Form.Group className="mb-3" controlId="formSurname">
                  <Form.Label>Apellido</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaUser /></InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese el apellido"
                      name="surname"
                      value={formData.surname}
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
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Teléfono</Form.Label>
                  <InputGroup hasValidation>
                    <InputGroup.Text><FaPhone /></InputGroup.Text>
                    <Form.Control
                      type="tel"
                      placeholder="(555) 123-4567"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor ingrese un teléfono.
                    </Form.Control.Feedback>
                  </InputGroup>
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
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3" controlId="formRole">
              <Form.Label>Rol del Usuario</Form.Label>
              <Row>
                {roles.map((rol) => (
                  <Col key={rol.id} md={6} className="mb-3">
                    <Card 
                      style={{
                        ...pageStyles.roleCard,
                        ...(formData.role === rol.id ? pageStyles.roleCardSelected : {})
                      }}
                      onClick={() => setFormData({...formData, role: rol.id})}
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
            
            <Form.Group className="mb-4" controlId="formStatus">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
              </Form.Select>
              <Form.Text className="text-muted">
                Los usuarios inactivos no pueden iniciar sesión en el sistema.
              </Form.Text>
            </Form.Group>
            
            <div style={pageStyles.actionButtons}>
              <Button 
                variant="outline-secondary" 
                onClick={handleReset}
                disabled={loading}
              >
                Limpiar
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
                style={{ 
                  backgroundColor: colors.primaryDark,
                  borderColor: colors.primaryDark
                }}
              >
                {loading ? (
                  'Registrando...'
                ) : (
                  <>
                    <FaUserPlus style={{ marginRight: '5px' }} /> Registrar Usuario
                  </>
                )}
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