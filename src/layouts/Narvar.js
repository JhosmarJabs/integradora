import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { colors } from "../styles/styles"; // Importamos estilos

const NavbarComponent = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      style={{ backgroundColor: colors.white, borderBottom: `2px solid ${colors.primaryLight}` }}
      expand="md"
      expanded={expanded}
      className="mb-3"
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand as={Link} to="/" style={{ color: colors.primaryDark, fontWeight: "bold" }}>
          JADA Company
        </Navbar.Brand>

        {/* BOTÓN DE TOGGLE (MENÚ MÓVIL) */}
        <Navbar.Toggle aria-controls="navbar-nav" onClick={() => setExpanded(!expanded)} />

        {/* LINKS DEL NAVBAR */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)} style={{ color: colors.primaryMedium }}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/productos" onClick={() => setExpanded(false)} style={{ color: colors.primaryMedium }}>
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios" onClick={() => setExpanded(false)} style={{ color: colors.primaryMedium }}>
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/nosotros" onClick={() => setExpanded(false)} style={{ color: colors.primaryMedium }}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto" onClick={() => setExpanded(false)} style={{ color: colors.primaryMedium }}>
              Contacto
            </Nav.Link>
          </Nav>

          {/* BARRA DE BÚSQUEDA */}
          <Form className="d-flex" onSubmit={(e) => e.preventDefault()}>
            <FormControl 
              type="search" 
              placeholder="Buscar" 
              className="me-2"
              aria-label="Buscar"
              style={{ borderColor: colors.primaryLight }}
            />
            <Button style={{ backgroundColor: colors.accent, borderColor: colors.accent }}>
              Buscar
            </Button>
          </Form>

          {/* BOTÓN DE INICIAR SESIÓN */}
          <Button 
            as={Link} 
            to="/login" 
            style={{ backgroundColor: colors.primaryDark, borderColor: colors.primaryDark }} 
            className="ms-3"
          >
            Iniciar Sesión
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;