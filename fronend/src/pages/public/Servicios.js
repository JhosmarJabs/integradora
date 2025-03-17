import React, { useState, useEffect, useCallback } from 'react';
import { colors, textStyles, layout, buttons } from '../../styles/styles';
import { Container, Row, Col, Card, Image, Badge } from 'react-bootstrap';

// Iconos para los servicios (reemplazar por componentes reales de iconos si están disponibles)
const ServiceIcons = {
  persianas: "🏠",
  diseno: "✏️",
  mantenimiento: "🔧",
  comercial: "🏢",
  instalacion: "📍",
  calidad: "⭐",
  atencion: "👥",
  ambiente: "🌱",
  precios: "💰"
};

const Servicios = () => {
  // Estados para animaciones y efectos interactivos
  const [animate, setAnimate] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Activar animaciones al cargar el componente
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Estilos optimizados
  const styles = {
    // Secciones y contenedores
    section: { 
      marginBottom: '70px',
      position: 'relative',
    },
    hero: {
      background: `linear-gradient(135deg, ${colors.primaryDark} 0%, ${colors.primaryMedium} 100%)`,
      padding: '80px 0',
      color: colors.white,
      marginBottom: '50px',
      position: 'relative',
      overflow: 'hidden',
    },
    heroPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `radial-gradient(${colors.white} 1px, transparent 1px)`,
      backgroundSize: '20px 20px',
      opacity: 0.1,
    },
    
    // Tarjetas y elementos con sombra
    card: {
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      height: '100%',
      border: 'none',
    },
    benefitCard: {
      borderRadius: '10px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      height: '100%',
      border: 'none',
      backgroundColor: colors.primaryLight,
      color: colors.white,
      overflow: 'hidden',
      position: 'relative',
    },
    image: { 
      borderRadius: '10px', 
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.5s ease',
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '10px',
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
    },
    
    // Tipografía y textos
    title: { 
      ...textStyles.title, 
      color: colors.white, 
      fontSize: '48px', 
      marginBottom: '25px', 
      fontWeight: 800,
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 0.8s ease, transform 0.8s ease',
    },
    subtitle: { 
      ...textStyles.subtitle, 
      position: 'relative', 
      paddingBottom: '15px', 
      marginBottom: '25px',
      transition: 'color 0.3s ease',
    },
    paragraph: { 
      ...textStyles.paragraph, 
      fontSize: '17px', 
      lineHeight: '1.7',
    },
    
    // Elementos decorativos
    badge: {
      backgroundColor: colors.primaryLight,
      color: colors.white,
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: 'bold',
      display: 'inline-block',
      marginBottom: '15px',
    },
    heroSubtitle: {
      ...textStyles.paragraph, 
      color: colors.white, 
      fontSize: '20px', 
      maxWidth: '700px', 
      margin: '0 auto', 
      opacity: animate ? 0.9 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity 1s ease 0.2s, transform 1s ease 0.2s',
    },
    
    // Animaciones
    fadeIn: (delay = 0) => ({
      opacity: animate ? 1 : 0, 
      transition: `opacity 0.8s ease ${delay}s`,
    }),
    slideUp: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),
    slideRight: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateX(0)' : 'translateX(-20px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),
    slideLeft: (delay = 0) => ({
      opacity: animate ? 1 : 0,
      transform: animate ? 'translateX(0)' : 'translateX(20px)',
      transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
    }),
    
    // Estilos para listas
    listItem: {
      marginBottom: '15px',
      paddingLeft: '5px',
    }
  };

  // Datos para servicios
  const serviciosData = [
    {
      id: 'persianas',
      titulo: 'Venta e Instalación de Persianas',
      descripcion: 'Ofrecemos una amplia variedad de persianas para todos los gustos y necesidades:',
      listItems: [
        {
          titulo: 'Persianas de Interior',
          descripcion: 'Elegantes y funcionales, disponibles en una variedad de materiales como aluminio, madera y PVC.'
        },
        {
          titulo: 'Persianas de Exterior',
          descripcion: 'Resistentes a las condiciones climáticas, ideales para terrazas, balcones y ventanas.'
        },
        {
          titulo: 'Persianas Inteligentes',
          descripcion: 'Controla la luz y la privacidad de tu hogar con persianas automatizadas, compatibles con sistemas de domótica.'
        }
      ],
      imagen: "https://st2.depositphotos.com/2001755/8564/i/450/depositphotos_85647140-stock-photo-beautiful-landscape-with-birds.jpg"
    },
    {
      id: 'diseno',
      titulo: 'Diseño Personalizado',
      descripcion: 'En JADA Company, entendemos que cada espacio es único. Por eso, ofrecemos:',
      listItems: [
        {
          titulo: 'Asesoramiento Personalizado',
          descripcion: 'Nuestros expertos te guiarán en la elección de materiales, colores y estilos que mejor se adapten a tu espacio.'
        },
        {
          titulo: 'Medición y Fabricación a Medida',
          descripcion: 'Garantizamos un ajuste perfecto para cada ventana o puerta.'
        }
      ],
      imagen: 'https://via.placeholder.com/600x400'
    },
    {
      id: 'mantenimiento',
      titulo: 'Mantenimiento y Reparación',
      descripcion: 'Mantenemos tus persianas en perfecto estado con nuestros servicios de:',
      listItems: [
        {
          titulo: 'Limpieza Profesional',
          descripcion: 'Eliminamos polvo, suciedad y manchas para que tus persianas luzcan como nuevas.'
        },
        {
          titulo: 'Reparaciones Rápidas',
          descripcion: 'Solucionamos problemas como cortes, roturas o fallos en los mecanismos.'
        }
      ],
      imagen: 'https://via.placeholder.com/600x400'
    },
    {
      id: 'comercial',
      titulo: 'Proyectos Comerciales',
      descripcion: '¿Eres un negocio o empresa? Ofrecemos soluciones especializadas para:',
      listItems: [
        {
          titulo: 'Oficinas y Edificios Corporativos',
          descripcion: 'Persianas que combinan funcionalidad y diseño profesional.'
        },
        {
          titulo: 'Hoteles y Restaurantes',
          descripcion: 'Creación de ambientes únicos con persianas que se adaptan a la decoración y necesidades del sector.'
        }
      ],
      imagen: 'https://via.placeholder.com/600x400'
    },
    {
      id: 'instalacion',
      titulo: 'Servicio de Instalación en Huejutla de Reyes, Hidalgo',
      descripcion: 'Cubrimos toda el área de Huejutla de Reyes, Hidalgo, garantizando una instalación rápida, eficiente y profesional. Nuestro equipo de instaladores está altamente capacitado para ofrecer un servicio impecable.',
      listItems: [],
      imagen: 'https://via.placeholder.com/600x400'
    }
  ];

  // Datos para beneficios
  const benefitsData = [
    { 
      id: 'calidad',
      title: "Calidad Garantizada", 
      content: "Utilizamos materiales de primera calidad y tecnología avanzada en todos nuestros productos y servicios.",
    },
    { 
      id: 'atencion',
      title: "Atención Personalizada", 
      content: "Nos adaptamos a tus necesidades y preferencias, ofreciendo soluciones diseñadas específicamente para ti.",
    },
    { 
      id: 'ambiente',
      title: "Compromiso con el Medio Ambiente", 
      content: "Ofrecemos opciones ecológicas y sostenibles que minimizan el impacto ambiental sin sacrificar calidad.",
    },
    { 
      id: 'precios',
      title: "Precios Competitivos", 
      content: "Soluciones de alta calidad a precios accesibles para adaptarnos a diferentes presupuestos.",
    },
  ];

  // Función para renderizar cards de beneficios con animación optimizada
  const renderBenefitCards = useCallback(() => {
    return benefitsData.map((item, index) => (
      <Col md={3} key={index} className="mb-4 mb-md-0">
        <div 
          style={{ 
            ...styles.slideUp(0.5 + (index * 0.1)),
            height: '100%',
          }}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <Card 
            style={{
              ...styles.benefitCard,
              transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
              boxShadow: hoveredCard === index ? '0 10px 25px rgba(0, 0, 0, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column">
              <div style={{ 
                fontSize: '32px', 
                marginBottom: '15px',
                transition: 'transform 0.3s ease',
                transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
              }}>
                {ServiceIcons[item.id]}
              </div>
              <Card.Title style={{ 
                fontFamily: textStyles.title.fontFamily, 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                borderBottom: `2px solid ${colors.white}`,
                paddingBottom: '10px',
              }}>
                {item.title}
              </Card.Title>
              <Card.Text style={{ fontSize: '16px', lineHeight: '1.6', flex: 1 }}>
                {item.content}
              </Card.Text>
              {hoveredCard === index && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '5px',
                    background: `linear-gradient(to right, ${colors.primaryDark}, ${colors.primaryMedium})`,
                  }}
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </Col>
    ));
  }, [hoveredCard, animate, styles]);

  // Función para renderizar servicios con animación optimizada
  const renderServicios = useCallback(() => {
    return serviciosData.map((servicio, index) => {
      // Alterna el orden de la imagen y el texto basado en el índice par/impar
      const isEven = index % 2 === 0;

      return (
        <Row
          className="align-items-center"
          style={{ 
            ...styles.section,
            paddingTop: index > 0 ? '20px' : '0',
          }}
          key={servicio.id}
        >
          {/* Imagen del servicio */}
          <Col md={6} className={`mb-4 mb-md-0 ${isEven ? 'order-md-1' : 'order-md-2'}`}>
            <div 
              style={{ 
                ...styles.imageContainer,
                ...styles[isEven ? 'slideLeft' : 'slideRight'](0.2 + (index * 0.05)),
              }}
              onMouseEnter={() => setHoveredService(servicio.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <Image
                src={servicio.imagen}
                alt={servicio.titulo}
                fluid
                style={{
                  ...styles.image,
                  transform: hoveredService === servicio.id ? 'scale(1.05)' : 'scale(1)',
                }}
              />
              {hoveredService === servicio.id && (
                <div 
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '30px 20px 15px',
                    transform: 'translateY(0)',
                    transition: 'transform 0.5s ease',
                  }}
                >
                  <h4 style={{ color: colors.white, marginBottom: '5px' }}>
                    <span style={{ marginRight: '10px' }}>{ServiceIcons[servicio.id]}</span>
                    {servicio.titulo}
                  </h4>
                  <p style={{ color: colors.white, marginBottom: 0, fontSize: '14px' }}>
                    Conoce más sobre este servicio
                  </p>
                </div>
              )}
            </div>
          </Col>

          {/* Descripción del servicio */}
          <Col md={6} className={isEven ? 'order-md-2' : 'order-md-1'}>
            <div style={styles[isEven ? 'slideRight' : 'slideLeft'](0.3 + (index * 0.05))}>
              
              <h2 style={{
                ...styles.subtitle,
                color: hoveredService === servicio.id ? colors.primaryMedium : styles.subtitle.color,
              }}>
                {servicio.titulo}
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '60px',
                  height: '4px',
                  backgroundColor: colors.primaryLight,
                  transition: 'width 0.3s ease',
                  width: hoveredService === servicio.id ? '100px' : '60px',
                }}></span>
              </h2>
              <p style={styles.paragraph}>
                {servicio.descripcion}
              </p>
              {servicio.listItems.length > 0 && (
                <ul style={{ paddingLeft: '20px' }}>
                  {servicio.listItems.map((item, idx) => (
                    <li key={idx} style={styles.listItem}>
                      <div style={{
                        transition: 'transform 0.3s ease',
                        transform: hoveredService === servicio.id ? 'translateX(5px)' : 'translateX(0)',
                      }}>
                        <strong>{item.titulo}:</strong> {item.descripcion}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <button 
                style={{
                  ...buttons.primary,
                  marginTop: '20px',
                  padding: '10px 20px',
                  fontSize: '15px',
                  backgroundColor: colors.primaryMedium,
                  transition: 'all 0.3s ease',
                  opacity: animate ? 1 : 0,
                  transform: animate ? 'translateY(0)' : 'translateY(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primaryDark;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.primaryMedium;
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>Solicitar información</span>
                <span 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                    transition: 'left 0.5s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.left = '100%';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.left = '-100%';
                  }}
                ></span>
              </button>
            </div>
          </Col>
        </Row>
      );
    });
  }, [hoveredService, animate, styles]);

  return (
    <div style={{ backgroundColor: colors.white, color: colors.primaryDark }}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <div style={styles.heroPattern}></div>
        <Container>
          <Row className="text-center">
            <Col>
              <h1 style={styles.title}>Nuestros Servicios</h1>
              <p style={styles.heroSubtitle}>
                En JADA Company, nos especializamos en ofrecer soluciones integrales para el control de luz, 
                privacidad y diseño en hogares, oficinas y espacios comerciales.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container style={layout.sectionPadding}>
        {/* Secciones de servicios */}
        {renderServicios()}

        {/* ¿Por Qué Elegirnos? */}
        <div style={{...styles.section, marginTop: '50px'}}>
          <Row className="text-center mb-5">
            <Col>
              <h2 style={{
                ...styles.subtitle,
                display: 'inline-block',
                ...styles.fadeIn(0.5),
              }}>
                ¿Por Qué Elegirnos?
                <span style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  backgroundColor: colors.primaryLight
                }}></span>
              </h2>
            </Col>
          </Row>
          <Row className="g-4">
            {renderBenefitCards()}
          </Row>
        </div>
        
        {/* Llamado a la acción */}
        <div 
          style={{
            ...styles.fadeIn(0.8),
            marginTop: '50px',
            padding: '40px',
            borderRadius: '10px',
            background: `linear-gradient(135deg, ${colors.primaryMedium} 0%, ${colors.primaryDark} 100%)`,
            color: colors.white,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
          }}></div>
          
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            position: 'relative',
          }}>¿Necesitas alguno de nuestros servicios?</h3>
          
          <p style={{
            fontSize: '18px',
            maxWidth: '800px',
            margin: '0 auto 25px',
            position: 'relative',
          }}>
            En JADA Company estamos listos para ayudarte a encontrar la solución perfecta para tu hogar o negocio.
            Contáctanos hoy mismo para recibir asesoramiento profesional.
          </p>
          
          <button style={{
            backgroundColor: 'transparent',
            border: `2px solid ${colors.white}`,
            color: colors.white,
            padding: '12px 30px',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: textStyles.fontPrimary,
            position: 'relative',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.white;
            e.currentTarget.style.color = colors.primaryDark;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = colors.white;
          }}
          >
            Solicitar presupuesto gratuito
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Servicios;