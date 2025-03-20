const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || 'clave_secreta';

router.get('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.json({ loggedIn: false });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await Usuario.findById(decoded.id);
        if (!user) {
            return res.json({ loggedIn: false });
        }
        res.json({ loggedIn: true, role: user.role });
    } catch (error) {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
