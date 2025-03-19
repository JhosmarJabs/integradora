const express = require('express');
const router = express.Router();
const Contacto = require('../models/contacto');

// Ruta para agregar un nuevo mensaje de contacto
router.post('/', async (req, res) => {
    const contacto = new Contacto(req.body);
    try {
        const nuevoContacto = await contacto.save();
        res.status(201).json(nuevoContacto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;