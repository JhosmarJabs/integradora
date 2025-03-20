// routes/adminRuta.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Aquí puedes importar controladores específicos para la administración
// const adminController = require('../controllers/adminController');

// Ruta de ejemplo para el dashboard de administración
// Esta ruta está protegida y solo los admin pueden acceder
// GET /api/admin/dashboard
router.get('/dashboard', auth, admin, (req, res) => {
    res.json({
        success: true,
        message: 'Acceso al panel de administración permitido',
        user: req.usuario
    });
});

// Otras rutas administrativas
// router.get('/users', auth, admin, adminController.getAllUsers);
// router.put('/users/:id', auth, admin, adminController.updateUser);
// router.delete('/users/:id', auth, admin, adminController.deleteUser);

module.exports = router;