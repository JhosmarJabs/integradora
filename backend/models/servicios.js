const mongoose = require('mongoose');
const serviciosSchema = new mongoose.Schema({
    id: String,
    titulo: String,
    
    });
    const Servicios = mongoose.model('servicios', serviciosSchema);