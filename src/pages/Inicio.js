import React, { useState } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import Cards from "../components/cards"; // Componente de tarjetas
import productos from "../services/base"; // Base de datos simulada
import { colors } from "../styles/styles"; // Importamos los estilos de la guía

const Inicio = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {/* Banner principal */}
      <section style={{ backgroundColor: colors.primaryDark, color: colors.white, textAlign: "center", padding: "50px 0" }}>
        <Container>
          <h1 className="display-4">Innovación IoT para tu Hogar y Negocio</h1>
          <p className="lead">Haz que tu espacio sea más inteligente y eficiente.</p>
          <Button style={{ backgroundColor: colors.accent, borderColor: colors.accent }} size="lg">
            Explorar Productos
          </Button>
        </Container>
      </section>

      {/* Sección de Características con Carrusel Controlado */}
      <section style={{ padding: "50px 0" }}>
        <Container>
          <h2 className="text-center mb-4" style={{ color: colors.primaryDark }}>Características Destacadas</h2>
          <Carousel style={{ padding: "50px 0" }} activeIndex={index} onSelect={handleSelect} interval={2000}>
            <Carousel.Item>
              <div className="text-center">
                <h4 style={{ color: colors.primaryDark }}>🔧 Instalación Rápida</h4>
                <p style={{ color: colors.primaryLight }}>Conéctalo y configúralo en minutos.</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <h4 style={{ color: colors.primaryDark }}>🔒 Seguridad Avanzada</h4>
                <p style={{ color: colors.primaryLight }}>Protección total con encriptación de datos.</p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="text-center">
                <h4 style={{ color: colors.primaryDark }}>⚡ Ahorro Energético</h4>
                <p style={{ color: colors.primaryLight }}>Reduce el consumo eléctrico de tus dispositivos.</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      {/* Sección de Productos usando Cards.js */}
      <section style={{ backgroundColor: colors.primaryLight, padding: "50px 0" }}>
        <Container>
          <h2 className="text-center mb-4" style={{ color: colors.white }}>Lo Mejor en Tecnología IoT</h2>
          <Cards items={productos} />
        </Container>
      </section>
    </>
  );
};

export default Inicio;
