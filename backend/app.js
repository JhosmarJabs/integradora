const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: "http://localhost:3000", // Permitir solicitudes desde el frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], // ✅ Permitir 'Authorization'
    credentials: true // Permitir envío de cookies y tokens en la petición
}));

app.use(express.json()); // ✅ Necesario para procesar JSON en `req.body`
app.use(express.urlencoded({ extended: true })); // Para datos de formularios

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Importar rutas
const loginRuta = require('./routes/loginRuta');
const usuarioRuta = require('./routes/usuarioRuta');
const productosRutas = require('./routes/productosRutas');
const serviciosRuta = require('./routes/serviciosRuta');
const contactoRuta = require('./routes/contactoRuta');

// Usar rutas
app.use('/login', loginRuta);
app.use('/usuarios', usuarioRuta);
app.use('/productos', productosRutas);
app.use('/servicios', serviciosRuta);
app.use('/contacto', contactoRuta);

app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

module.exports = app;
