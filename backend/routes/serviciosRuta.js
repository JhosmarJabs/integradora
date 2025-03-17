const express = require('express');
const router = express.Router();
const Servicio = require('../models/servicios');

// Ruta para obtener todos los servicios
router.get('/', async (req, res) => {
    try {
        const servicios = await Servicio.find();
        res.status(200).json(servicios);
    } catch (error) {
        console.error('Error al obtener los servicios:', error);
        res.status(500).json({
            message: 'Error al obtener los servicios',
            error: error.message
        });
    }
});

module.exports = router;
