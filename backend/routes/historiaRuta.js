const express = require('express');
const app = express();
const Historia = require('../models/historia');

//GET para obtener todas las historias
app.get('/historias', (req, res) => {
    Historia.find()
    .then(historias => res.json(historias))
    .catch(err => res.status(400).json('Error: ' + err));
    });

    