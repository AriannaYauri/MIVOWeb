const express = require('express');
const cors = require('cors');
const { obtenerDatosIncendios } = require('./dist/models/FiltroTiempo.js');
const app = express();
const PORT = 3000; // Debe coincidir con el puerto que usa tu frontend para las peticiones

// Middlewares
app.use(cors()); // Habilita CORS para permitir que el frontend se conecte
app.use(express.json()); // Soporte para JSON

// Rutas
app.get('/models/incendio', (req, res) => {
  const data = obtenerDatosIncendios();
  res.json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
