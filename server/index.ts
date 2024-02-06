import express from 'express';
import type { Request, Response } from 'express';
import sqlite3 from 'sqlite3';


const db = new sqlite3.Database('./flopify.db', (err: Error | null) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

const app = express();

app.get('/musics', (req: Request, res: Response) => {
    const rows = db.prepare('SELECT * FROM musics').all();
    res.json(rows);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));


