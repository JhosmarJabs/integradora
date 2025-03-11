import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col, Form, Image, Card } from "react-bootstrap";
import Cards from "../../components/CardsV"; // Componente de tarjetas
import productos from "../../services/base"; // Base de datos simulada
import { colors, typography } from "../../styles/styles"; // Importamos los estilos de la guía

const Inicio = () => {
  const [destacados, setDestacados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    features: false,
    categories: false,
    products: false,
    testimonials: false,
    cta: false
  });

  useEffect(() => {
    // Filtrar productos destacados (con rating alto o descuento)
    const productosDestacados = productos
      .filter(p => p.rating >= 4.7 || p.discount >= 10)
      .slice(0, 4);
    setDestacados(productosDestacados);

    // Extraer categorías únicas de productos
    const categoriasUnicas = [...new Set(productos.map(p => p.category))];
    const categoriasData = categoriasUnicas.map(categoria => {
      const productosCategoria = productos.filter(p => p.category === categoria);
      return {
        nombre: categoria,
        cantidad: productosCategoria.length,
        imagen: productosCategoria[0]?.image // Usamos la imagen del primer producto
      };
    });
    setCategorias(categoriasData);

    // Activar animaciones secuencialmente
    setTimeout(() => setIsVisible(prev => ({ ...prev, hero: true })), 100);
    setTimeout(() => setIsVisible(prev => ({ ...prev, features: true })), 500);
    setTimeout(() => setIsVisible(prev => ({ ...prev, categories: true })), 900);
    setTimeout(() => setIsVisible(prev => ({ ...prev, products: true })), 1300);
    setTimeout(() => setIsVisible(prev => ({ ...prev, testimonials: true })), 1700);
    setTimeout(() => setIsVisible(prev => ({ ...prev, cta: true })), 2100);
  }, []);



  // Features detalladas
  const features = [
    {
      icono: "🏠",
      titulo: "Control Total del Hogar",
      descripcion: "Gestiona todos tus dispositivos desde una sola aplicación, incluso cuando no estés en casa."
    },
    {
      icono: "🔐",
      titulo: "Seguridad Avanzada",
      descripcion: "Protección con cifrado de nivel bancario y autenticación de múltiples factores."
    },
    {
      icono: "💡",
      titulo: "Automatizaciones Inteligentes",
      descripcion: "Crea rutinas personalizadas basadas en horarios, ubicación o sensores."
    },
    {
      icono: "📊",
      titulo: "Análisis de Consumo",
      descripcion: "Monitorea y optimiza el uso de energía en tiempo real con informes detallados."
    },
    {
      icono: "🔄",
      titulo: "Actualizaciones Automáticas",
      descripcion: "Siempre con las últimas funciones y parches de seguridad sin intervención manual."
    },
    {
      icono: "🌐",
      titulo: "Compatibilidad Universal",
      descripcion: "Funciona con todos los asistentes de voz populares y estándares IoT."
    }
  ];

  // Estilos específicos que no se pueden lograr fácilmente con Bootstrap
  const customStyles = {
    heroSection: {
      backgroundImage: "linear-gradient(135deg, rgba(13, 27, 42, 0.9) 0%, rgba(27, 38, 59, 0.95) 100%), url('https://images.unsplash.com/photo-1558002038-1055e2debb44?q=80&w=2940')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: isVisible.hero ? 1 : 0,
      transform: isVisible.hero ? "translateY(0)" : "translateY(20px)",
      transition: "all 0.8s ease-out",
    },
    featuresSection: {
      opacity: isVisible.features ? 1 : 0,
      transform: isVisible.features ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    categoriesSection: {
      backgroundImage: "linear-gradient(135deg, rgba(65, 90, 119, 0.95) 0%, rgba(27, 38, 59, 0.9) 100%)",
      opacity: isVisible.categories ? 1 : 0,
      transform: isVisible.categories ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    productsSection: {
      opacity: isVisible.products ? 1 : 0,
      transform: isVisible.products ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    testimonialsSection: {
      opacity: isVisible.testimonials ? 1 : 0,
      transform: isVisible.testimonials ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    ctaSection: {
      backgroundImage: "linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(27, 38, 59, 0.9) 100%), url('https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2940')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: isVisible.cta ? 1 : 0,
      transform: isVisible.cta ? "translateY(0)" : "translateY(30px)",
      transition: "all 0.8s ease-out",
    },
    yellowButton: {
      backgroundColor: "#ffe607",
      borderColor: "#ffe607",
      color: colors.primaryDark,
    },
    ctaYellowButton: {
      backgroundColor: "#ffe607",
      borderColor: "#ffe607",
      color: colors.primaryDark,
      borderRadius: "0 30px 30px 0"
    },
    categoryOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(13, 27, 42, 0.7)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "20px",
    },
    featureIcon: {
      fontSize: "2.5rem",
      backgroundColor: "rgba(65, 90, 119, 0.05)",
      width: "80px",
      height: "80px",
      lineHeight: "80px",
      borderRadius: "50%",
      display: "inline-block",
    },
    statNumber: {
      fontSize: "2.5rem", 
      fontWeight: "bold", 
      color: "#ffe607"
    },
    titleUnderline: {
      display: "block",
      width: "80px",
      height: "4px",
      backgroundColor: "#ffe607",
      borderRadius: "2px",
      margin: "15px auto"
    },
    whiteUnderline: {
      backgroundColor: "white"
    },
    testimonialQuote: {
      fontSize: "70px",
      position: "absolute",
      top: "20px",
      right: "30px",
      color: "rgba(65, 90, 119, 0.1)",
      fontFamily: "serif",
    },
    ctaInput: {
      borderRadius: "30px 0 0 30px",
      border: "none",
      padding: "15px 20px"
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-5" style={customStyles.heroSection}>
        <Container className="py-5 text-center text-white">
          <h1 className="display-3 fw-bold mb-4" style={{fontFamily: typography.fontPrimary}}>
            Transforma tu Hogar con Tecnología Inteligente
          </h1>
          <p className="fs-4 fw-light mb-5 mx-auto" style={{maxWidth: "700px"}}>
            Soluciones IoT avanzadas que hacen tu vida más cómoda, eficiente y segura.
          </p>
          <div className="mb-5">
            <Button 
              className="btn-lg rounded-pill me-3 px-4 py-3 fw-bold" 
              style={customStyles.yellowButton}
            >
              Explorar Soluciones
            </Button>
            <Button 
              variant="outline-light" 
              className="btn-lg rounded-pill px-4 py-3"
            >
              Ver Demostración
            </Button>
          </div>
          
          {/* Estadísticas destacadas */}
          <div className="d-flex justify-content-center flex-wrap gap-5 mt-5">
            <div className="text-center">
              <div style={customStyles.statNumber}>5,000+</div>
              <div className="opacity-75">Hogares conectados</div>
            </div>
            <div className="text-center">
              <div style={customStyles.statNumber}>98%</div>
              <div className="opacity-75">Clientes satisfechos</div>
            </div>
            <div className="text-center">
              <div style={customStyles.statNumber}>24/7</div>
              <div className="opacity-75">Soporte técnico</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sección de Características */}
      <section className="py-5 bg-light" style={customStyles.featuresSection}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">
              Características Principales
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <p className="lead text-muted mx-auto mb-5" style={{maxWidth: "700px"}}>
              Nuestra tecnología está diseñada para adaptarse a tus necesidades, ofreciéndote control, seguridad y eficiencia.
            </p>
          </div>
          
          <Row className="g-4">
            {features.map((feature, idx) => (
              <Col md={6} lg={4} key={idx}>
                <Card className="h-100 border-0 shadow-sm hover-translate-up">
                  <Card.Body className="p-4 text-center">
                    <div className="mb-3 text-center">
                      <span style={customStyles.featureIcon}>{feature.icono}</span>
                    </div>
                    <h3 className="fs-4 fw-bold mb-3" style={{color: colors.primaryDark}}>{feature.titulo}</h3>
                    <p className="text-muted" style={{color: colors.primaryLight}}>{feature.descripcion}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Categorías */}
      <section className="py-5 text-white" style={customStyles.categoriesSection}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">
              Nuestras Categorías
              <span style={{...customStyles.titleUnderline, ...customStyles.whiteUnderline}}></span>
            </h2>
            <p className="lead opacity-75 mx-auto mb-5" style={{maxWidth: "700px"}}>
              Descubre nuestras soluciones en distintas áreas para hacer tu espacio más inteligente.
            </p>
          </div>
          
          <Row className="g-4">
            {categorias.map((categoria, idx) => (
              <Col md={6} lg={3} key={idx}>
                <div className="position-relative rounded-4 overflow-hidden shadow h-100" style={{height: "200px", cursor: "pointer"}}>
                  <img 
                    src={categoria.imagen} 
                    alt={categoria.nombre}
                    className="w-100 h-100" 
                    style={{objectFit: "cover"}}
                  />
                  <div style={customStyles.categoryOverlay}>
                    <h3 className="fs-4 fw-bold mb-1">{categoria.nombre}</h3>
                    <p className="small opacity-75">{categoria.cantidad} productos</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Sección de Productos Destacados */}
      <section className="py-5 bg-white" style={customStyles.productsSection}>
        <Container className="py-5">
          <div className="d-flex justify-content-between align-items-center mb-5 flex-wrap">
            <h2 className="display-5 fw-bold text-dark mb-3 mb-md-0">
              Productos Destacados
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <a href="/productos" className="text-decoration-none fw-bold text-primary d-flex align-items-center">
              Ver todos los productos <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>
          
          <Cards items={destacados.length > 0 ? destacados : productos.slice(0, 4)} />
        </Container>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-5 bg-light" style={customStyles.testimonialsSection}>
        <Container className="py-5">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-dark">
              Lo que dicen nuestros clientes
              <span style={customStyles.titleUnderline}></span>
            </h2>
            <p className="lead text-muted mx-auto mb-5" style={{maxWidth: "700px"}}>
              Miles de hogares y empresas han mejorado con nuestras soluciones inteligentes.
            </p>
          </div>
        </Container>
      </section>

      {/* Sección CTA (Call to Action) */}
      <section className="py-5 text-white" style={customStyles.ctaSection}>
        <Container className="py-5 text-center">
          <h2 className="display-4 fw-bold mb-3" style={{maxWidth: "800px", margin: "0 auto"}}>
            Comienza tu transformación digital hoy
          </h2>
          <p className="lead opacity-75 mb-5 mx-auto" style={{maxWidth: "700px"}}>
            Suscríbete para recibir las últimas novedades, ofertas exclusivas y consejos para optimizar tu hogar inteligente.
          </p>
          
          <div className="mx-auto" style={{maxWidth: "500px"}}>
            <Form className="d-flex">
              <Form.Control 
                type="email" 
                placeholder="Ingresa tu correo electrónico" 
                className="flex-grow-1"
                style={customStyles.ctaInput}
              />
              <Button style={customStyles.ctaYellowButton} className="fw-bold">
                Suscribirse
              </Button>
            </Form>
          </div>
          
          <p className="mt-4 opacity-75 small">
            <i className="bi bi-shield-check me-2"></i>
            Tu información está segura con nosotros. No compartimos tus datos.
          </p>
        </Container>
      </section>
    </>
  );
};

export default Inicio;  