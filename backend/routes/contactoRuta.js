const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Contacto = require('../models/contactos');

// Middleware para verificar token JWT
const verificarToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ mensaje: 'Acceso denegado.' });

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET || 'clave_secreta');
        req.usuario = verificado;
        next();
    } catch (error) {
        res.status(401).json({ mensaje: 'Token inválido.' });
    }
};

// Middleware para verificar si es administrador
const esAdmin = (req, res, next) => {
    if (req.usuario.role !== 'admin') {
        return res.status(403).json({ mensaje: 'Acceso denegado. Se requiere rol de administrador.' });
    }
    next();
};

// Obtener todos los contactos (solo admins)
router.get('/', verificarToken, esAdmin, async (req, res) => {
    try {
        const contactos = await Contacto.find();
        res.status(200).json(contactos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener contactos', error: error.message });
    }
});

// Obtener información de contacto pública
router.get('/info', async (req, res) => {
    try {
        const contactosInfo = await Contacto.find();
        res.status(200).json(contactosInfo);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener información de contacto', error: error.message });
    }
});

// Obtener un contacto por ID (solo admins)
router.get('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const contacto = await Contacto.findById(req.params.id);
        if (!contacto) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado.' });
        }
        res.status(200).json(contacto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener contacto', error: error.message });
    }
});

// Crear un nuevo contacto (formulario de contacto público)
router.post('/', async (req, res) => {
    try {
        // Aquí puedes implementar validación de datos o captcha si es necesario
        
        const nuevoContacto = new Contacto(req.body);
        await nuevoContacto.save();
        
        res.status(201).json({
            mensaje: 'Mensaje de contacto enviado exitosamente',
            contacto: nuevoContacto
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al enviar mensaje de contacto', error: error.message });
    }
});

// Actualizar un contacto (solo admins)
router.put('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const contactoActualizado = await Contacto.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        
        if (!contactoActualizado) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado.' });
        }
        
        res.status(200).json({
            mensaje: 'Información de contacto actualizada exitosamente',
            contacto: contactoActualizado
        });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar contacto', error: error.message });
    }
});

// Eliminar un contacto (solo admins)
router.delete('/:id', verificarToken, esAdmin, async (req, res) => {
    try {
        const contactoEliminado = await Contacto.findByIdAndDelete(req.params.id);
        
        if (!contactoEliminado) {
            return res.status(404).json({ mensaje: 'Contacto no encontrado.' });
        }
        
        res.status(200).json({ mensaje: 'Contacto eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar contacto', error: error.message });
    }
});

module.exports = router;