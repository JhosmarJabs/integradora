import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { colors, typography, textStyles, buttons } from "../../styles/styles";

const Perfil = () => {
  // Estados para almacenar datos del usuario
  const [userData, setUserData] = useState({
    nombre: "",
    correo: "",
  });
  
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Simulación de carga de datos del usuario
  useEffect(() => {
    setTimeout(() => {
      setUserData({
        nombre: "Usuario Ejemplo",
        correo: "usuario@ejemplo.com",
      });
    }, 500);
  }, []);

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para guardar cambios del perfil
  const handleSaveChanges = (e) => {
    e.preventDefault();

    
    // Simular actualización exitosa
    setSuccessMsg("¡Perfil actualizado correctamente!");
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };

  // Función para confirmar eliminación de cuenta
  const handleDeleteAccount = () => {

    // Redireccionar al inicio (o donde quieras después de eliminar)
    window.location.href = "/";
  };

  const headerStyle = {
    backgroundColor: colors.primarioLight,
    borderBottom: `2px solid ${colors.primarioMedium}`
  };

  const iconCircleStyle = {
    width: "50px", 
    height: "50px", 
    borderRadius: "50%", 
    backgroundColor: colors.primarioDark,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    color: colors.white
  };

  const titleStyle = {
    ...textStyles.título,
    margin: 0
  };

  const primaryButtonStyle = {
    ...buttons.primary
  };

  return (
    <Container className="py-4">
      <Card className="shadow-sm">
        <Card.Header 
          className="text-center py-3" 
          style={headerStyle}
        >
          <div className="d-flex align-items-center justify-content-center">
            <div style={iconCircleStyle}>
              <i className="bi bi-person-fill" style={{ fontSize: "1.5rem" }}></i>
            </div>
            <h2 style={titleStyle}>PERFIL</h2>
          </div>
        </Card.Header>
        
        <Card.Body>
          {successMsg && <Alert variant="success">{successMsg}</Alert>}
          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
          
          <Form onSubmit={handleSaveChanges}>
            <Form.Group className="mb-3">
              <Form.Label style={textStyles.subtítulo}>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                style={{ fontFamily: typography.fontSecondary }}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label style={textStyles.subtítulo}>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={userData.correo}
                onChange={handleChange}
                style={{ fontFamily: typography.fontSecondary }}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between align-items-center">
              <Button 
                type="submit" 
                style={primaryButtonStyle}
              >
                Guardar Cambios
              </Button>
              
              {!showConfirmation ? (
                <Button 
                  variant="outline-danger" 
                  onClick={() => setShowConfirmation(true)}
                  style={{ 
                    fontFamily: typography.fontSecondary,
                    padding: "8px 16px",
                    borderRadius: "5px" 
                  }}
                >
                  Eliminar Cuenta
                </Button>
              ) : (
                <div>
                  <Button 
                    variant="danger" 
                    onClick={handleDeleteAccount}
                    className="me-2"
                    style={{ fontFamily: typography.fontSecondary }}
                  >
                    Confirmar
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowConfirmation(false)}
                    style={{ fontFamily: typography.fontSecondary }}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Perfil;