const express = require('express');
const router = express.Router();
const Register = require('../models/register');

router.get('/', async (req, res) => {
    try {
        const registers = await Register.find();
        res.json(registers);
    } catch (error) {
        res.json({ message: error });
    }
});

// Nueva ruta POST para crear un registro
router.post('/', async (req, res) => {
    const register = new Register({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status
    });

    try {
        const savedRegister = await register.save();
        res.json(savedRegister);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;