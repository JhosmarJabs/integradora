const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');

router.get('/', async (req, res) => {
    try {
        const usuario = await Usuario.find();
        res.json(usuario);
    } catch (error) {
        res.json({ message: error });
    }
});

// Nueva ruta POST para crear un registro
router.post('/', async (req, res) => {
    const usuario = new Usuario({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status
    });

    try {
        const savedUsuario = await usuario.save();
        res.json(savedUsuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;