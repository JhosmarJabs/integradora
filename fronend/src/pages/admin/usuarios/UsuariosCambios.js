import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Badge, Alert, Tabs, Tab, InputGroup } from 'react-bootstrap';
import { FaUserEdit, FaSearch, FaIdCard, FaEnvelope, FaPhone, FaKey, FaEye, FaEyeSlash, FaLock, FaUserTag, FaUserCog, FaHistory, FaSave } from 'react-icons/fa';
import { colors, textStyles } from '../../../styles/styles';

const UsuariosCambios = () => {
  // Estado para los usuarios
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [rolFiltro, setRolFiltro] = useState('');
  
  // Estado para edición
  const [showModal, setShowModal] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [tabActiva, setTabActiva] = useState('informacion');
  
  // Estado para histórico de cambios
  const [historialCambios, setHistorialCambios] = useState([]);
  
  // Estado para alertas
  const [alerta, setAlerta] = useState({ show: false, variant: '', mensaje: '' });
  
  // Cargar usuarios simulados al iniciar
  useEffect(() => {
    // Datos de ejemplo (en un caso real, se obtendrían de la API)
    const datosUsuarios = [
      { 
        id: 'USR-001', 
        nombre: 'Juan', 
        apellido: 'Pérez',
        email: 'juan.perez@ejemplo.com', 
        telefono: '555-1234', 
        rol: 'admin',
        activo: true,
        fechaRegistro: '2023-01-15',
        ultimoAcceso: '2023-06-20',
        departamento: 'Tecnología',
        direccion: 'Calle Principal 123',
        ciudad: 'Ciudad de México',
        permisos: {
          dashboard: true,
          usuarios: true,
          productos: true,
          ventas: true,
          reportes: true,
          configuracion: true
        }
      },
      { 
        id: 'USR-002', 
        nombre: 'María', 
        apellido: 'Rodríguez',
        email: 'maria.rodriguez@ejemplo.com', 
        telefono: '555-5678', 
        rol: 'supervisor',
        activo: true,
        fechaRegistro: '2023-02-22',
        ultimoAcceso: '2023-06-18',
        departamento: 'Ventas',
        direccion: 'Av. Reforma 456',
        ciudad: 'Guadalajara',
        permisos: {
          dashboard: true,
          usuarios: false,
          productos: true,
          ventas: true,
          reportes: true,
          configuracion: false
        }
      },
      { 
        id: 'USR-003', 
        nombre: 'Carlos', 
        apellido: 'González',
        email: 'carlos.gonzalez@ejemplo.com', 
        telefono: '555-9012', 
        rol: 'tecnico',
        activo: true,
        fechaRegistro: '2023-03-10',
        ultimoAcceso: '2023-06-15',
        departamento: 'Soporte',
        direccion: 'Calle Secundaria 789',
        ciudad: 'Monterrey',
        permisos: {
          dashboard: true,
          usuarios: false,
          productos: true,
          ventas: false,
          reportes: true,
          configuracion: false
        }
      },
      { 
        id: 'USR-004', 
        nombre: 'Ana', 
        apellido: 'Martínez',
        email: 'ana.martinez@ejemplo.com', 
        telefono: '555-3456', 
        rol: 'cliente',
        activo: false,
        fechaRegistro: '2023-04-05',
        ultimoAcceso: '2023-05-30',
        departamento: 'Marketing',
        direccion: 'Av. Insurgentes 321',
        ciudad: 'Puebla',
        permisos: {
          dashboard: true,
          usuarios: false,
          productos: false,
          ventas: false,
          reportes: false,
          configuracion: false
        }
      },
      { 
        id: 'USR-005', 
        nombre: 'Roberto', 
        apellido: 'Sánchez',
        email: 'roberto.sanchez@ejemplo.com', 
        telefono: '555-7890', 
        rol: 'admin',
        activo: true,
        fechaRegistro: '2023-05-18',
        ultimoAcceso: '2023-06-22',
        departamento: 'Administración',
        direccion: 'Blvd. Principal 654',
        ciudad: 'Tijuana',
        permisos: {
          dashboard: true,
          usuarios: true,
          productos: true,
          ventas: true,
          reportes: true,
          configuracion: true
        }
      }
    ];
    
    setUsuarios(datosUsuarios);
    
    // Historial de cambios simulado
    const historialSimulado = [
      {
        id: 'CAM-001',
        usuario: 'USR-002',
        nombreUsuario: 'María Rodríguez',
        campoCambiado: 'email',
        valorAnterior: 'maria.r@ejemplo.com',
        valorNuevo: 'maria.rodriguez@ejemplo.com',
        fechaCambio: '2023-06-10',
        realizadoPor: 'Admin del Sistema'
      },
      {
        id: 'CAM-002',
        usuario: 'USR-003',
        nombreUsuario: 'Carlos González',
        campoCambiado: 'rol',
        valorAnterior: 'cliente',
        valorNuevo: 'tecnico',
        fechaCambio: '2023-06-12',
        realizadoPor: 'Juan Pérez'
      },
      {
        id: 'CAM-003',
        usuario: 'USR-004',
        nombreUsuario: 'Ana Martínez',
        campoCambiado: 'activo',
        valorAnterior: 'true',
        valorNuevo: 'false',
        fechaCambio: '2023-06-14',
        realizadoPor: 'Roberto Sánchez'
      }
    ];
    
    setHistorialCambios(historialSimulado);
  }, []);
  
  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const nombreCompleto = `${usuario.nombre} ${usuario.apellido}`.toLowerCase();
    const coincideTexto = nombreCompleto.includes(filtro.toLowerCase()) || 
                         usuario.email.toLowerCase().includes(filtro.toLowerCase()) ||
                         usuario.id.toLowerCase().includes(filtro.toLowerCase());
    const coincideRol = rolFiltro === '' || usuario.rol === rolFiltro;
    return coincideTexto && coincideRol;
  });
  
  // Obtener roles únicos para el filtro
  const roles = [...new Set(usuarios.map(u => u.rol))];
  
  // Función para obtener nombre del rol
  const getNombreRol = (rol) => {
    const roles = {
      'admin': 'Administrador',
      'supervisor': 'Supervisor',
      'tecnico': 'Técnico',
      'cliente': 'Cliente'
    };
    return roles[rol] || rol;
  };
  
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
  
  // Manejadores
  const handleOpenModal = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setDatosEditados({
      ...usuario,
      password: '',
      confirmPassword: ''
    });
    setShowModal(true);
    setTabActiva('informacion');
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    setUsuarioSeleccionado(null);
    setDatosEditados({});
    setShowPassword(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDatosEditados({
      ...datosEditados,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handlePermisosChange = (permiso) => {
    setDatosEditados({
      ...datosEditados,
      permisos: {
        ...datosEditados.permisos,
        [permiso]: !datosEditados.permisos[permiso]
      }
    });
  };
  
  const handleGuardarCambios = () => {
    // Validar email único
    const emailExistente = usuarios.some(u => 
      u.email === datosEditados.email && u.id !== datosEditados.id
    );
    
    if (emailExistente) {
      setAlerta({
        show: true,
        variant: 'danger',
        mensaje: 'El email ya está siendo utilizado por otro usuario.'
      });
      return;
    }
    
    // Validar contraseñas si se están cambiando
    if (datosEditados.password) {
      if (datosEditados.password.length < 8) {
        setAlerta({
          show: true,
          variant: 'danger',
          mensaje: 'La contraseña debe tener al menos 8 caracteres.'
        });
        return;
      }
      
      if (datosEditados.password !== datosEditados.confirmPassword) {
        setAlerta({
          show: true,
          variant: 'danger',
          mensaje: 'Las contraseñas no coinciden.'
        });
        return;
      }
    }
    
    // En un caso real, aquí se enviarían los cambios a una API
    
    // Actualizar el usuario en el estado local
    const usuariosActualizados = usuarios.map(u => {
      if (u.id === datosEditados.id) {
        // Crear un objeto limpio sin los campos de contraseña
        const { password, confirmPassword, ...datosLimpios } = datosEditados;
        return datosLimpios;
      }
      return u;
    });
    
    setUsuarios(usuariosActualizados);
    
    // Registrar en el historial
    const nuevoCambio = {
      id: `CAM-${historialCambios.length + 1}`,
      usuario: datosEditados.id,
      nombreUsuario: `${datosEditados.nombre} ${datosEditados.apellido}`,
      campoCambiado: 'múltiples campos',
      valorAnterior: '-',
      valorNuevo: '-',
      fechaCambio: new Date().toISOString().split('T')[0],
      realizadoPor: 'Usuario Actual' // En un caso real, sería el usuario logueado
    };
    
    setHistorialCambios([nuevoCambio, ...historialCambios]);
    
    // Mostrar mensaje de éxito
    setAlerta({
      show: true,
      variant: 'success',
      mensaje: `Los datos del usuario ${datosEditados.nombre} ${datosEditados.apellido} han sido actualizados correctamente.`
    });
    
    // Cerrar modal
    handleCloseModal();
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
    badge: (activo) => {
      return { backgroundColor: activo ? '#28a745' : '#dc3545' };
    },
    rolBadge: (rol) => {
      const colores = {
        'admin': '#dc3545',
        'supervisor': '#fd7e14',
        'tecnico': '#0dcaf0',
        'cliente': '#6c757d'
      };
      return { backgroundColor: colores[rol] || colors.primaryLight };
    },
    formGroup: {
      marginBottom: '20px'
    },
    permisosTable: {
      fontSize: '14px'
    },
    cambiosTable: {
      fontSize: '14px'
    }
  };
  
  return (
    <Container fluid style={{ padding: '30px 20px' }}>
      <Row className="mb-4">
        <Col>
          <h2 style={pageStyles.title}>Modificación de Usuarios</h2>
          <p style={textStyles.paragraph}>
            Gestione los cambios en los datos y permisos de los usuarios registrados en el sistema.
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
      
      {/* Filtros */}
      <Row className="mb-4">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Buscar por nombre, email o ID..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select 
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
          >
            <option value="">Todos los roles</option>
            {roles.map((rol, idx) => (
              <option key={idx} value={rol}>{getNombreRol(rol)}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>
      
      {/* Tabla de Usuarios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={pageStyles.subtitle}>Listado de Usuarios</Card.Title>
          
          {usuariosFiltrados.length === 0 ? (
            <Alert variant="info">
              No se encontraron usuarios que coincidan con los criterios de búsqueda.
            </Alert>
          ) : (
            <Table responsive hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Departamento</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Último Acceso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{`${usuario.nombre} ${usuario.apellido}`}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.departamento}</td>
                    <td>
                      <Badge style={pageStyles.rolBadge(usuario.rol)}>
                        {getNombreRol(usuario.rol)}
                      </Badge>
                    </td>
                    <td>
                      <Badge style={pageStyles.badge(usuario.activo)}>
                        {usuario.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td>{usuario.ultimoAcceso}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => handleOpenModal(usuario)}
                        title="Editar usuario"
                      >
                        <FaUserEdit size={14} /> Editar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Historial de Cambios */}
      <Card style={pageStyles.card}>
        <Card.Body>
          <Card.Title style={{ ...pageStyles.subtitle, display: 'flex', alignItems: 'center' }}>
            <FaHistory style={{ marginRight: '10px' }} /> Historial de Cambios Recientes
          </Card.Title>
          
          {historialCambios.length === 0 ? (
            <Alert variant="info">
              No hay registros recientes de cambios en usuarios.
            </Alert>
          ) : (
            <Table responsive hover style={pageStyles.cambiosTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Campo Modificado</th>
                  <th>Valor Anterior</th>
                  <th>Valor Nuevo</th>
                  <th>Fecha</th>
                  <th>Realizado Por</th>
                </tr>
              </thead>
              <tbody>
                {historialCambios.map((cambio) => (
                  <tr key={cambio.id}>
                    <td>{cambio.id}</td>
                    <td>{cambio.nombreUsuario}</td>
                    <td>{cambio.campoCambiado}</td>
                    <td>{cambio.valorAnterior}</td>
                    <td>{cambio.valorNuevo}</td>
                    <td>{cambio.fechaCambio}</td>
                    <td>{cambio.realizadoPor}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      {/* Modal de Edición */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton style={{ backgroundColor: colors.primaryLight, color: colors.white }}>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioSeleccionado && (
            <Tabs
              activeKey={tabActiva}
              onSelect={(k) => setTabActiva(k)}
              className="mb-4"
            >
              <Tab eventKey="informacion" title={<span><FaIdCard className="me-2" />Información Personal</span>}>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                          type="text"
                          name="nombre"
                          value={datosEditados.nombre || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                          type="text"
                          name="apellido"
                          value={datosEditados.apellido || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={datosEditados.email || ''}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                          type="tel"
                          name="telefono"
                          value={datosEditados.telefono || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formDepartamento">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Select
                          name="departamento"
                          value={datosEditados.departamento || ''}
                          onChange={handleInputChange}
                        >
                          <option value="">Seleccionar departamento</option>
                          {departamentos.map((depto, index) => (
                            <option key={index} value={depto}>{depto}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formActivo">
                        <Form.Label>Estado</Form.Label>
                        <div>
                          <Form.Check 
                            type="checkbox"
                            label="Usuario activo"
                            name="activo"
                            checked={datosEditados.activo || false}
                            onChange={handleInputChange}
                          />
                        </div>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formDireccion">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                          type="text"
                          name="direccion"
                          value={datosEditados.direccion || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formCiudad">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control
                          type="text"
                          name="ciudad"
                          value={datosEditados.ciudad || ''}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Tab>
              
              <Tab eventKey="seguridad" title={<span><FaKey className="me-2" />Seguridad y Acceso</span>}>
                <Form>
                  <Alert variant="info">
                    Complete los campos solo si desea cambiar la contraseña del usuario. Deje en blanco para mantener la actual.
                  </Alert>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Nueva Contraseña</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingrese la nueva contraseña"
                            name="password"
                            value={datosEditados.password || ''}
                            onChange={handleInputChange}
                            minLength={8}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup>
                        <Form.Text className="text-muted">
                          La contraseña debe tener al menos 8 caracteres.
                        </Form.Text>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formConfirmPassword">
                        <Form.Label>Confirmar Nueva Contraseña</Form.Label>
                        <InputGroup>
                          <Form.Control
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirme la nueva contraseña"
                            name="confirmPassword"
                            value={datosEditados.confirmPassword || ''}
                            onChange={handleInputChange}
                            minLength={8}
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row className="mt-3">
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formForzarCambio">
                        <Form.Check 
                          type="checkbox"
                          label="Forzar cambio de contraseña en el próximo inicio de sesión"
                          name="forzarCambioPassword"
                          checked={datosEditados.forzarCambioPassword || false}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="formBloqueo">
                        <Form.Check 
                          type="checkbox"
                          label="Bloquear temporalmente acceso (15 minutos)"
                          name="bloqueoTemporal"
                          checked={datosEditados.bloqueoTemporal || false}
                          onChange={handleInputChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="mt-3 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                    <h6 className="mb-3"><FaLock className="me-2" /> Opciones de Seguridad Adicionales</h6>
                    <Form.Group className="mb-2">
                      <Form.Check 
                        type="checkbox"
                        label="Habilitar autenticación de dos factores"
                        name="dosFactores"
                        checked={datosEditados.dosFactores || false}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Check 
                        type="checkbox"
                        label="Permitir acceso desde múltiples dispositivos"
                        name="multiDispositivo"
                        checked={datosEditados.multiDispositivo || false}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                  </div>
                </Form>
              </Tab>
              
              <Tab eventKey="roles" title={<span><FaUserTag className="me-2" />Rol y Permisos</span>}>
                <Form>
                  <Form.Group className="mb-4" controlId="formRol">
                    <Form.Label>Rol del Usuario</Form.Label>
                    <Form.Select
                      name="rol"
                      value={datosEditados.rol || ''}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="admin">Administrador</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="tecnico">Técnico</option>
                      <option value="cliente">Cliente</option>
                    </Form.Select>
                    <Form.Text className="text-muted">
                      El rol determina el nivel de acceso predeterminado del usuario.
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="mb-3">
                    <h6 className="mb-3"><FaUserCog className="me-2" /> Permisos Específicos</h6>
                    <Table bordered size="sm" style={pageStyles.permisosTable}>
                      <thead>
                        <tr>
                          <th style={{ width: '60%' }}>Módulo</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>Acceso</th>
                          <th style={{ width: '20%', textAlign: 'center' }}>Descripción</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dashboard</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.dashboard || false}
                              onChange={() => handlePermisosChange('dashboard')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Gestión de Usuarios</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.usuarios || false}
                              onChange={() => handlePermisosChange('usuarios')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Gestión de Productos</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.productos || false}
                              onChange={() => handlePermisosChange('productos')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Gestión de Ventas</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.ventas || false}
                              onChange={() => handlePermisosChange('ventas')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Reportes</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.reportes || false}
                              onChange={() => handlePermisosChange('reportes')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td>Configuración del Sistema</td>
                          <td className="text-center">
                            <Form.Check 
                              type="switch"
                              checked={datosEditados.permisos?.configuracion || false}
                              onChange={() => handlePermisosChange('configuracion')}
                            />
                          </td>
                          <td className="text-center">
                            <Button variant="link" size="sm" className="p-0">
                              <FaSearch size={12} />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Form>
              </Tab>
            </Tabs>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGuardarCambios}
            style={{ 
              backgroundColor: colors.primaryDark,
              borderColor: colors.primaryDark
            }}
          >
            <FaSave style={{ marginRight: '5px' }} /> Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UsuariosCambios;