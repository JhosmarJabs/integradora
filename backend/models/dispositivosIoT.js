const mongoose = require('mongoose');

const dispositivoIoTSchema = new mongoose.Schema({
    idDispositivo: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate device IDs
},
    nombre: {
    type: String,
    required: true,
},
    tipo: {
    type: String,
    required: true,
    enum: ['sensor', 'actuador', 'camara', 'gateway', 'otro'], // Matches your frontend options
    default: 'sensor',
},
    ubicacion: {
    type: String,
    required: true,
},
    conexion: {
    type: String,
    required: true,
    enum: ['wifi', 'bluetooth', 'zigbee', 'ethernet', 'otro'], // Matches your frontend options
    default: 'wifi',
},
    propietario: {
    type: String,
    required: true,
},
descripcion: {
    type: String,
    required: false,
},
    configuracion: {
    type: mongoose.Schema.Types.Mixed, // Allows flexibility for different device types
    default: {},
},
    fechaRegistro: {
    type: Date,
    default: Date.now,
    },
});

module.exports = mongoose.model('dispositivosIoT', dispositivoIoTSchema);