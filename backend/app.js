import express from 'express';
import cors from 'cors';

const app = express();

// Middleware para permitir solicitudes desde el frontend
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes

// Ruta de ejemplo
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hola desde el backend!' });
});

// Iniciar el servidor
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});