// Dependencias necesarias: express, sequelize, pg, dotenv
// Ejecuta: npm install express sequelize pg pg-hstore dotenv

const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const cors = require('cors')

// Configuración de Sequelize con PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Modelos
const Animal = sequelize.define('Animal', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cultivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'animales',  // Aquí especificas el nombre de la tabla en minúsculas
  timestamps: false
});

const Incendio = sequelize.define('Incendio', {
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cultivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'incendios',  // Aquí especificas el nombre de la tabla en minúsculas
  timestamps: false
});


// Sincronización de modelos con la base de datos
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito.');
    await sequelize.sync({ alter: true }); // Actualiza las tablas si es necesario
    console.log('Modelos sincronizados.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

// Crear el servidor Express
const app = express();
app.use(express.json());
app.use(cors())

// Rutas para el modelo Animal
app.post('/animales', async (req, res) => {
  try {
    const nuevoAnimal = await Animal.create(req.body);
    res.status(201).json(nuevoAnimal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/animales', async (req, res) => {
  try {
    const animales = await Animal.findAll();
    res.status(200).json(animales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/animales/:id', async (req, res) => {
  try {
    const eliminado = await Animal.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Animal no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rutas para el modelo Incendio
app.post('/incendios', async (req, res) => {
  try {
    const nuevoIncendio = await Incendio.create(req.body);
    res.status(201).json(nuevoIncendio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/incendios', async (req, res) => {
  try {
    const incendios = await Incendio.findAll();
    res.status(200).json(incendios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.delete('/incendios/:id', async (req, res) => {
  try {
    const eliminado = await Incendio.destroy({ where: { id: req.params.id } });
    if (!eliminado) return res.status(404).json({ error: 'Incendio no encontrado' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar el servidor y sincronizar la base de datos
const PORT = process.env.PORT || 3000;
syncDatabase().then(() => {
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Servidor ejecutándose en http://0.0.0.0:${PORT}`);
  });
});
