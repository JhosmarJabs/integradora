const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuarios');


// Obtiene todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener usuarios' });
            }
            });

// Ruta POST para crear un nuevo usuario
router.post('/', async (req, res) => {
    const { email, password, name, surname, phone, role, status } = req.body;

    // Validación básica de campos requeridos
    if (!email || !password || !name || !surname || !phone || !role || !status) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Crear y guardar el nuevo usuario
        const nuevoUsuario = new Usuario({
            email,
            password,
            name,
            surname,
            phone,
            role,
            status
        });

        const savedUsuario = await nuevoUsuario.save();
        res.status(201).json(savedUsuario);
    } catch (error) {
        // Manejo de errores específicos
        if (error.code === 11000) { // Código de error de duplicado en MongoDB
            res.status(400).json({ message: "El correo electrónico ya está registrado" });
        } else {
            res.status(500).json({ message: "Error al registrar el usuario", error: error.message });
        }
    }
});

// Ruta PUT para actualizar el status de un usuario
router.put('/:id', async (req, res) => {
    const { status, motivoBaja } = req.body;

    // Validación básica
    if (!status) {
        return res.status(400).json({ message: "El campo status es obligatorio" });
    }

    if (!['active', 'inactive'].includes(status)) {
        return res.status(400).json({ message: "El status debe ser 'active' o 'inactive'" });
    }

    try {
        const usuario = await Usuario.findById(req.params.id);
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar campos
        usuario.status = status;
        if (motivoBaja) {
            usuario.motivoBaja = motivoBaja; // Asumiendo que agregarás este campo al schema
        }

        const updatedUsuario = await usuario.save();
        res.json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el usuario", error: error.message });
    }
});

// Ruta DELETE para eliminar un usuario
router.delete('/:id', async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        
        if (!usuario) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await usuario.deleteOne();
        res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error: error.message });
    }
});

module.exports = router;