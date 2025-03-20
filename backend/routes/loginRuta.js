const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Usuario = require('../models/usuarios'); // Ajusta si la ruta del modelo es diferente
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

// Ruta para iniciar sesión
router.post('/', async (req, res) => {  // ✅ Cambiado a '/login' para que coincida con app.js
    console.log("Body recibido en /login:", req.body); // 🔍 Ver qué datos llegan
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {
        const user = await Usuario.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ 
            message: 'Inicio de sesión exitoso', 
            role: user.role,
            token
        });
    } catch (error) {
        console.error("Error en el servidor:", error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


module.exports = router;