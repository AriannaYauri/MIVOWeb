import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
const port = 5173;

const db = new sqlite3.Database('./database.db');

// Habilita CORS
app.use(cors());

app.get('/fire', (req, res) => {
  db.all('SELECT * FROM fire', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
