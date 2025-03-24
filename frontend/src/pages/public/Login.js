import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { IonIcon } from '@ionic/react';
import { eyeOffOutline, eyeOutline, mailOutline, lockClosedOutline, callOutline } from 'ionicons/icons';
import { Link } from 'react-router-dom'; // Importando Link para navegación

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [animating, setAnimating] = useState(false);

  // Estados para el formulario de registro
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Estados para el formulario de login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Manejo de animación al cambiar entre login y registro
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => {
        setAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  const toggleForm = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setError('');
      setSuccess('');
    }, 150);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: loginEmail,
                password: loginPassword
            })
        });

        const data = await response.json();
        console.log("Respuesta completa:", data);

        if (response.ok) {
            setSuccess('Inicio de sesión exitoso');
            localStorage.setItem("token", data.token);
            
            // Corregir la obtención del rol que está dentro del objeto user
            if (data.user && data.user.role) {
                localStorage.setItem("role", data.user.role);
                
                // Determinar la redirección basada en el rol
                const redirectUrl = data.user.role === 'admin' 
                    ? '/admin/dashboard' 
                    : '/privado/dashboard';
                
                console.log(`Rol: ${data.user.role}, Redirigiendo a: ${redirectUrl}`);
                
                // Redireccionar
                window.location.href = redirectUrl;
            } else {
                console.error("No se recibió el rol del usuario");
                setError("Error: No se pudo determinar el rol del usuario");
            }
        } else {
            setError(data.message || 'Error al iniciar sesión');
        }
    } catch (error) {
        console.error("Error en la conexión con el servidor:", error);
        setError('Error en la conexión con el servidor');
    }
};

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !apellido || !telefono || !email || !password || !confirmPassword) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
    }

    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nombre, 
            surname: apellido,
            phone: telefono,
            email: email,
            password: password,
            role: "user",
            status: "active"
        })
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
        setTimeout(() => setIsLogin(true), 2000);
          } else {
            setError(data.message || 'Error en el registro');
          }
    } catch (error) {
      setError('Error al registrar el usuario. Inténtalo de nuevo.');
      }
    };


  // Verificación de fortaleza de contraseña
  const passwordStrength = (pass) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = passwordStrength(password);
    if (strength === 0) return '#f44336';
    if (strength === 1) return '#ff9800';
    if (strength === 2) return '#ffeb3b';
    if (strength === 3) return '#8bc34a';
    if (strength === 4) return '#4caf50';
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength(password);
    if (strength === 0) return 'Muy débil';
    if (strength === 1) return 'Débil';
    if (strength === 2) return 'Media';
    if (strength === 3) return 'Fuerte';
    if (strength === 4) return 'Muy fuerte';
  };

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: `linear-gradient(135deg, rgba(13, 27, 42, 0.95) 0%, rgba(27, 38, 59, 0.95) 100%)`,
      backgroundImage: `url("http://localhost:5000/uploads/backgrounds.jpg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay',
      padding: '20px',
    },
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
      position: 'relative',
      zIndex: 1,
    },
    leftPanel: {
      flex: '1 1 45%',
      padding: '50px',
      color: 'white',
      display: { xs: 'none', md: 'block' },
    },
    leftContent: {
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: '20px',
    },
    rightPanel: {
      flex: '1 1 55%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    formWrapper: {
      position: 'relative',
      width: '100%',
      maxWidth: '500px',
      background: 'rgba(19, 35, 54, 0.85)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
      padding: '40px',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      transform: animating ? 'scale(0.98)' : 'scale(1)',
      opacity: animating ? 0.8 : 1,
    },
    logo: {
      textAlign: 'center',
      marginBottom: '30px',
    },
    logoText: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#ffe607',
      margin: 0,
    },
    logoSubtext: {
      fontSize: '14px',
      color: 'rgba(255, 255, 255, 0.7)',
      marginTop: '5px',
    },
    title: {
      fontSize: '28px',
      marginBottom: '10px',
      textAlign: 'center',
      color: '#fff',
      fontWeight: '600',
    },
    subtitle: {
      fontSize: '16px',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
      marginBottom: '30px',
    },
    formContainer: {
      opacity: animating ? 0 : 1,
      transition: 'opacity 0.3s ease',
    },
    inputRow: {
      display: 'flex',
      gap: '15px',
      marginBottom: '5px',
    },
    inputBox: {
      position: 'relative',
      width: '100%',
      marginBottom: '25px',
    },
    inputLabel: {
      display: 'block',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      marginBottom: '8px',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    input: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      outline: 'none',
      color: '#fff',
      padding: '15px 20px',
      paddingRight: '40px',
      borderRadius: '10px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      '&:focus': {
        background: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 0 0 2px rgba(255, 230, 7, 0.3)',
      },
      '&::placeholder': {
        color: 'rgba(255, 255, 255, 0.6)',
      },
    },
    icon: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    togglePassword: {
      position: 'absolute',
      right: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      color: 'rgba(255, 255, 255, 0.7)',
      cursor: 'pointer',
      zIndex: 2,
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#ffe607',
      },
    },
    passwordStrength: {
      display: password ? 'block' : 'none',
      width: '100%',
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      marginTop: '8px',
      borderRadius: '2px',
      overflow: 'hidden',
    },
    passwordStrengthBar: {
      height: '100%',
      width: `${(passwordStrength(password) / 4) * 100}%`,
      backgroundColor: getPasswordStrengthColor(),
      transition: 'width 0.3s ease, background-color 0.3s ease',
    },
    passwordStrengthText: {
      fontSize: '12px',
      color: getPasswordStrengthColor(),
      marginTop: '5px',
      textAlign: 'right',
      transition: 'color 0.3s ease',
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      cursor: 'pointer',
    },
    checkbox: {
      marginRight: '8px',
      cursor: 'pointer',
    },
    forgotPassword: {
      color: '#ffe607',
      fontSize: '14px',
      textDecoration: 'none',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#fff',
        textDecoration: 'underline',
      },
    },
    button: {
      width: '100%',
      padding: '15px',
      background: '#ffe607',
      border: 'none',
      outline: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      fontSize: '16px',
      color: '#0D1B2A',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      marginTop: '10px',
      boxShadow: '0 4px 15px rgba(255, 230, 7, 0.3)',
      '&:hover': {
        background: '#ffed47',
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 20px rgba(255, 230, 7, 0.4)',
      },
      '&:active': {
        transform: 'translateY(1px)',
      },
    },
    switchForm: {
      textAlign: 'center',
      marginTop: '25px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
    },
    link: {
      color: '#ffe607',
      textDecoration: 'none',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
      fontWeight: '600',
      '&:hover': {
        color: '#fff',
        textDecoration: 'underline',
      },
    },
    termsText: {
      fontSize: '12px',
      color: 'rgba(255, 255, 255, 0.6)',
      textAlign: 'center',
      marginTop: '25px',
    },
    highlight: {
      color: '#ffe607',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
    brandFeature: {
      marginBottom: '25px',
      display: 'flex',
      alignItems: 'center',
    },
    featureIcon: {
      fontSize: '22px',
      marginRight: '15px',
      color: '#ffe607',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 230, 7, 0.2)',
    },
    featureText: {
      color: 'white',
      fontSize: '16px',
    },
    // Nuevos estilos para el texto con fondo difuminado
    welcomeContainer: {
      marginBottom: '60px',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '25px',
      borderRadius: '15px',
      boxShadow: '0 0 25px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    welcomeTitle: {
      fontSize: '42px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: 'white',
      lineHeight: 1.2,
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    welcomeText: {
      fontSize: '16px',
      color: 'rgba(255, 255, 255, 0.9)',
      marginBottom: '10px',
      lineHeight: 1.6,
    },
    // Nuevo estilo para los contenedores de características
    featureContainer: {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      borderRadius: '12px',
      padding: '15px',
      backdropFilter: 'blur(3px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      marginBottom: '15px',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
      },
    },
    alertContainer: {
      marginBottom: '20px',
    },
    success: {
      backgroundColor: 'rgba(76, 175, 80, 0.2)',
      color: '#4CAF50',
      padding: '12px 15px',
      borderRadius: '10px',
      borderLeft: '4px solid #4CAF50',
    },
    error: {
      backgroundColor: 'rgba(244, 67, 54, 0.2)',
      color: '#F44336',
      padding: '12px 15px',
      borderRadius: '10px',
      borderLeft: '4px solid #F44336',
    }
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        {/* Panel Izquierdo - Solo visible en pantallas medianas y grandes */}
        <div style={styles.leftPanel}>
          <div style={styles.leftContent}>
            <div style={styles.welcomeContainer}>
              <h1 style={styles.welcomeTitle}>Bienvenido a JADA Technology</h1>
              <p style={styles.welcomeText}>
                Inicia sesión para acceder a tu cuenta o crea una nueva para disfrutar de todos nuestros servicios y productos tecnológicos.
              </p>
            </div>
            
            <div style={styles.featureContainer}>
              <div style={styles.brandFeature}>
                <div style={styles.featureIcon}>
                  <span>🔒</span>
                </div>
                <div style={styles.featureText}>Conexión segura y encriptada</div>
              </div>
            </div>
            
            <div style={styles.featureContainer}>
              <div style={styles.brandFeature}>
                <div style={styles.featureIcon}>
                  <span>🚀</span>
                </div>
                <div style={styles.featureText}>Acceso rápido a todos nuestros servicios</div>
              </div>
            </div>
            
            <div style={styles.featureContainer}>
              <div style={styles.brandFeature}>
                <div style={styles.featureIcon}>
                  <span>🔔</span>
                </div>
                <div style={styles.featureText}>Notificaciones personalizadas</div>
              </div>
            </div>
            
            <div style={styles.featureContainer}>
              <div style={styles.brandFeature}>
                <div style={styles.featureIcon}>
                  <span>💼</span>
                </div>
                <div style={styles.featureText}>Administra tus proyectos en un solo lugar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div style={styles.rightPanel}>
          <div style={styles.formWrapper}>
            <div style={styles.logo}>
              <h1 style={styles.logoText}>JADA</h1>
              <p style={styles.logoSubtext}>TECHNOLOGY & SOLUTIONS</p>
            </div>

            <div style={styles.formContainer}>
              {/* FORMULARIO DE LOGIN */}
              {isLogin && (
                <>
                  <h2 style={styles.title}>Iniciar Sesión</h2>
                  <p style={styles.subtitle}>Accede a tu cuenta para continuar</p>
              
                  {error && (
                    <div style={styles.alertContainer}>
                      <div style={styles.error}>{error}</div>
                    </div>
                  )}
                    
                  {success && (
                    <div style={styles.alertContainer}>
                      <div style={styles.success}>{success}</div>
                    </div>
                  )}

                  <Form onSubmit={handleLoginSubmit}>
                    <div style={styles.inputBox}>
                      <label htmlFor="login-email" style={styles.inputLabel}>Correo Electrónico</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={mailOutline} />
                      </span>
                      <input
                        id="login-email"
                        type="email"
                        placeholder="Ingresa tu correo electrónico"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    
                    <div style={styles.inputBox}>
                      <label htmlFor="login-password" style={styles.inputLabel}>Contraseña</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={lockClosedOutline} />
                      </span>
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ingresa tu contraseña"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        style={styles.input}
                      />
                      <span style={{...styles.togglePassword, top: 'calc(50% + 10px)'}} onClick={togglePasswordVisibility}>
                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
                      </span>
                    </div>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}>
                      <label style={styles.checkboxLabel}>
                        <input 
                          id="remember-me"
                          type="checkbox" 
                          style={styles.checkbox}
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        /> 
                        Recordarme
                      </label>
                      <a href="/recuperar-contrasena" style={styles.forgotPassword}>
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>
                    
                    <Button type="submit" style={styles.button}>
                      Iniciar Sesión
                    </Button>
                  </Form>
                  
                  <div style={styles.switchForm}>
                    ¿No tienes una cuenta?{' '}
                    <span style={styles.link} onClick={toggleForm}>
                      Regístrate aquí
                    </span>
                  </div>
                  
                  <div style={styles.termsText}>
                    Al iniciar sesión, aceptas nuestras{' '}
                    <Link to="/politicas#cliente" style={styles.highlight}>Políticas de Cliente</Link>{' '}
                    y{' '}
                    <Link to="/politicas#privacidad" style={styles.highlight}>Políticas de Privacidad</Link>
                  </div>
                </>
              )}

              {/* FORMULARIO DE REGISTRO */}
              {!isLogin && (
                <>
                  <h2 style={styles.title}>Crear Cuenta</h2>
                  <p style={styles.subtitle}>Únete a nuestra comunidad tecnológica</p>
              
                  {error && (
                    <div style={styles.alertContainer}>
                      <div style={styles.error}>{error}</div>
                    </div>
                  )}
                    
                  {success && (
                    <div style={styles.alertContainer}>
                      <div style={styles.success}>{success}</div>
                    </div>
                  )}

                  <Form onSubmit={handleRegisterSubmit}>
                    <div style={styles.inputRow}>
                      <div style={styles.inputBox}>
                        <label htmlFor="reg-nombre" style={styles.inputLabel}>Nombre</label>
                        <input
                          id="reg-nombre"
                          type="text"
                          placeholder="Tu nombre"
                          value={nombre}
                          onChange={(e) => setNombre(e.target.value)}
                          style={styles.input}
                        />
                      </div>
                      <div style={styles.inputBox}>
                        <label htmlFor="reg-apellido" style={styles.inputLabel}>Apellido</label>
                        <input
                          id="reg-apellido"
                          type="text"
                          placeholder="Tu apellido"
                          value={apellido}
                          onChange={(e) => setApellido(e.target.value)}
                          style={styles.input}
                        />
                      </div>
                    </div>
                    
                    <div style={styles.inputBox}>
                      <label htmlFor="reg-telefono" style={styles.inputLabel}>Teléfono</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={callOutline} />
                      </span>
                      <input
                        id="reg-telefono"
                        type="tel"
                        placeholder="Tu número telefónico"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    
                    <div style={styles.inputBox}>
                      <label htmlFor="reg-email" style={styles.inputLabel}>Correo Electrónico</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={mailOutline} />
                      </span>
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="Tu correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    
                    <div style={styles.inputBox}>
                      <label htmlFor="reg-password" style={styles.inputLabel}>Contraseña</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={lockClosedOutline} />
                      </span>
                      <input
                        id="reg-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Crea una contraseña segura"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                      />
                      <span style={{...styles.togglePassword, top: 'calc(50% + 10px)'}} onClick={togglePasswordVisibility}>
                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
                      </span>
                      {password && (
                        <>
                          <div style={styles.passwordStrength}>
                            <div style={styles.passwordStrengthBar}></div>
                          </div>
                          <div style={styles.passwordStrengthText}>
                            {getPasswordStrengthText()}
                          </div>
                        </>
                      )}
                    </div>
                    
                    <div style={styles.inputBox}>
                      <label htmlFor="reg-confirm-password" style={styles.inputLabel}>Confirmar Contraseña</label>
                      <span style={{...styles.icon, top: 'calc(50% + 10px)'}}>
                        <IonIcon icon={lockClosedOutline} />
                      </span>
                      <input
                        id="reg-confirm-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                      />
                      <span style={{...styles.togglePassword, top: 'calc(50% + 10px)'}} onClick={togglePasswordVisibility}>
                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} />
                      </span>
                    </div>
                    
                    <div style={{
                      marginBottom: '20px',
                    }}>
                      <label style={styles.checkboxLabel}>
                        <input 
                          id="accept-terms"
                          type="checkbox" 
                          style={styles.checkbox}
                          checked={acceptTerms}
                          onChange={() => setAcceptTerms(!acceptTerms)}
                        /> 
                        Acepto las <Link to="/politicas#cliente" style={styles.highlight}>Políticas de Cliente</Link> y las <Link to="/politicas#privacidad" style={styles.highlight}>Políticas de Privacidad</Link>
                      </label>
                    </div>
                    
                    <Button type="submit" style={styles.button}>
                      Crear Cuenta
                    </Button>
                  </Form>
                  <div style={styles.switchForm}>
                    ¿Ya tienes una cuenta?{' '}
                    <span style={styles.link} onClick={toggleForm}>
                      Inicia sesión aquí
                    </span>
                  </div>
                  
                  <div style={styles.termsText}>
                    Al registrarte, aceptas recibir correos electrónicos de marketing de JADA Technology.
                    Puedes darte de baja en cualquier momento.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;