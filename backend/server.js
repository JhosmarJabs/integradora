const express = require("express");
const mqtt = require("mqtt");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

// Crear servidor HTTP
const server = http.createServer(app);

// Configurar Socket.io con CORS habilitado
const io = socketIo(server, {
  cors: {
    origin: "*", // En producción, limita esto a tu dominio frontend
    methods: ["GET", "POST"],
  },
});

const MQTT_BROKER = "mqtt://127.0.0.1:1883"; // Mosquitto en localhost
const MQTT_TOPIC = "sensores/led";

const mqttClient = mqtt.connect(MQTT_BROKER);

let estadoLed = "OFF"; // Variable temporal para almacenar el estado

mqttClient.on("connect", () => {
  console.log("Conectado a MQTT");
  mqttClient.subscribe(MQTT_TOPIC);
});

mqttClient.on("message", (topic, message) => {
  if (topic === MQTT_TOPIC) {
    const estado = message.toString();
    estadoLed = estado === "1" ? "1" : "0";
    console.log(`Cambio de estado LED: ${estadoLed}`);

    // Emitir el cambio a todos los clientes conectados vía Socket.io
    io.emit("estado_actualizado", { topic, estado: estadoLed });
  }
});

// Configurar Socket.io
io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado", socket.id);

  // Enviar estado actual al conectarse
  socket.emit("estado_inicial", { estado: estadoLed });

  // Manejar envío de comando desde el cliente
  socket.on("enviar_comando", (data) => {
    console.log("Comando recibido:", data);
    if (data.comando === "encender") {
      mqttClient.publish(MQTT_TOPIC, "1");
    } else if (data.comando === "apagar") {
      mqttClient.publish(MQTT_TOPIC, "0");
    }
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
});

// Endpoint para obtener el estado del LED
app.get("/estado", (req, res) => {
  res.json({ state: estadoLed });
});

// Endpoint para controlar el LED
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

// Usar server en lugar de app para escuchar
server.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
