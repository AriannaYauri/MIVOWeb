const express = require('express');
const cors = require('cors');
const { obtenerDatosIncendios } = require('./dist/models/FiltroTiempo.js');
const { obtenerDatosIntrusos } =  require('./dist/models/FiltroIntruso.js');
const app = express();
const PORT = 3000; 


app.use(cors()); // Habilita CORS para permitir que el frontend se conecte
app.use(express.json()); // Soporte para JSON


app.get('/models/incendio', (req, res) => {
  const data = obtenerDatosIncendios();
  res.json(data);
});

app.get('/models/intruso', (req, res) => {
  const data = obtenerDatosIntrusos();
  res.json(data);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en https://mivo-web-asa8.vercel.app/`);
});
