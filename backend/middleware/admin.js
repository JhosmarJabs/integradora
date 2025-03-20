// middleware/admin.js
module.exports = function(req, res, next) {
    // req.usuario viene del middleware de autenticación 'auth'
    
    // Verificar el rol del usuario
    if (req.usuario.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: 'Acceso denegado. Se requiere rol de administrador.' 
        });
    }
    
    next();
};