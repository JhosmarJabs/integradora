// Usar require en lugar de import
const express = require('express');
const cors = require('cors');
const mqtt = require('mqtt');

const app = express();
const puerto = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

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

// Rutas
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
  console.log(`Servidor ejecutándose en http://localhost:${puerto}`);
});