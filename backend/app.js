require("dotenv").config(); // Cargar variables de entorno
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware para JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Conectar a MongoDB Atlas
console.log("🔍 URI de conexión:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(error => console.error("❌ Error conectando a MongoDB:", error));

// Ruta básica para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Rutas
const registerRoutes = require("./routes/usuarioRuta");
app.use("/usuario", registerRoutes);

const loginRoutes = require("./routes/loginRuta");
app.use("/login", loginRoutes);

const productosRoutes = require("./routes/productosRutas");
app.use("/productos", productosRoutes);

const contactoRoutes = require("./routes/contactoRuta");
app.use("/contacto", contactoRoutes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 La app está corriendo en http://localhost:${port}`);
});