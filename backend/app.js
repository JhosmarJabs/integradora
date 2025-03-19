// Combinando ambas versiones del código
require("dotenv").config(); // Cargar variables de entorno
const mongoose = require("mongoose");
const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');
const bodyParser = require("body-parser");
const path = require('path');

const app = express();
const puerto = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Servidor de archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configuración de MQTT
const MQTT_BROKER = "mqtt://127.0.0.1:1883";
const MQTT_TOPIC = "sensores/led";

const mqttClient = mqtt.connect(MQTT_BROKER);

let estadoLed = "0"; // Inicializado como apagado

mqttClient.on("connect", () => {
  console.log("Conectado a MQTT");
  mqttClient.subscribe(MQTT_TOPIC);
});

mqttClient.on("message", (topic, message) => {
  if (topic === MQTT_TOPIC) {
    estadoLed = message.toString();
    console.log(`Estado LED actualizado: ${estadoLed}`);
  }
});

// Conectar a MongoDB Atlas
console.log("🔍 URI de conexión:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ Conectado a MongoDB Atlas"))
    .catch(error => console.error("❌ Error conectando a MongoDB:", error));

// Ruta básica para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API');
});

// Rutas de API
const registerRoutes = require("./routes/usuarioRuta");
app.use("/usuario", registerRoutes);

const loginRoutes = require("./routes/loginRuta");
app.use("/login", loginRoutes);

const productosRoutes = require("./routes/productosRutas");
app.use("/productos", productosRoutes);

const contactoRoutes = require("./routes/contactoRuta");
app.use("/contacto", contactoRoutes);

const serviciosRoutes = require("./routes/serviciosRuta");
app.use("/servicios", serviciosRoutes);

// Rutas para el control del LED
app.get("/estado", (req, res) => {
  res.json({ state: estadoLed });
});

app.post("/control", (req, res) => {
  const { action } = req.body;
  if (action === "encender") {
    mqttClient.publish(MQTT_TOPIC, "1");
    estadoLed = "1";
  } else if (action === "apagar") {
    mqttClient.publish(MQTT_TOPIC, "0");
    estadoLed = "0";
  } else {
    return res.status(400).json({ error: "Acción inválida" });
  }
  res.json({ message: `LED ${estadoLed === "1" ? "ENCENDIDO" : "APAGADO"}` });
});

// Iniciar servidor
app.listen(puerto, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${puerto}`);
});