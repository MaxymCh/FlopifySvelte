import express from 'express';
import db from './db';

const app = express();
app.use(express.json()); // Pour le parsing de JSON

const PORT = 3000;

// Exemple de route pour récupérer des données
app.get('/data', (req, res) => {
    const rows = db.prepare('SELECT * FROM myTable').all();
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


const stmt = db.prepare('CREATE TABLE IF NOT EXISTS myTable (id INTEGER PRIMARY KEY, name TEXT)');
stmt.run();