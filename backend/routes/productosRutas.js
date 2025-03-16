const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para agregar un nuevo producto (opcional, para inicializar la base de datos)
router.post('/', async (req, res) => {
    const producto = new Producto(req.body);
    try {
        const nuevoProducto = await producto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;