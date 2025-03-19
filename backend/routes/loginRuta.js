const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Usamos el modelo de usuario

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar el usuario por email
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        if (user.password !== password) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Si las credenciales son correctas, devolver una respuesta exitosa
        res.json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;