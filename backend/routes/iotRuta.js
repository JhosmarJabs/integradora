const express = require('express');
const router = express.Router();
const DispositivoIoT = require('../models/dispositivosIoT');

// Ruta POST para registrar un nuevo dispositivo IoT
router.post('/', async (req, res) => {
  const { id, nombre, tipo, ubicacion, conexion, propietario, descripcion, configuracion } = req.body;

  // Validación básica
  if (!id || !nombre || !tipo || !ubicacion || !conexion || !propietario) {
    return res.status(400).json({ message: 'Todos los campos obligatorios deben estar presentes' });
  }

  try {
    const nuevoDispositivo = new DispositivoIoT({
      idDispositivo: id, // Renombrado para coincidir con el esquema
      nombre,
      tipo,
      ubicacion,
      conexion,
      propietario,
      descripcion,
      configuracion,
    });

    const savedDispositivo = await nuevoDispositivo.save();
    res.status(201).json(savedDispositivo);
  } catch (error) {
    if (error.code === 11000) { // Error de duplicado
      res.status(400).json({ message: 'El ID del dispositivo ya está registrado' });
    } else {
      res.status(500).json({ message: 'Error al registrar el dispositivo', error: error.message });
    }
  }
});

// Ruta GET para obtener todos los dispositivos (opcional, para futuras vistas)
router.get('/', async (req, res) => {
  try {
    const dispositivos = await DispositivoIoT.find();
    res.json(dispositivos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener dispositivos', error: error.message });
  }
});

module.exports = router;