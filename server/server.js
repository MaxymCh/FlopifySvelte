import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import db from './db.js'; // Assurez-vous d'avoir correctement configuré votre connexion SQLite
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Active CORS pour toutes les requêtes
app.use(cors());

const PORT = 3000;

// Route pour créer un compte utilisateur
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hasher le mot de passe

  try {
    const insert = db.prepare(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
    );
    insert.run(username, email, hashedPassword);
    res.status(201).json({ message: "Utilisateur créé" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l’utilisateur" });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = db.prepare('SELECT * FROM users WHERE email = ?');
  const user = query.get(email);
  const username = user.username;

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { userId: user.id },
      'secretKey',
      { expiresIn: '1h' }
    );
    res.json({ token, username, message: 'Connexion réussie' });
  } else {
    res.status(401).json({ error: 'Email ou mot de passe incorrect' });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'secretKey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.get('/protected-route', authenticateToken, (req, res) => {
  // Route protégée
  res.json({ message: "Contenu protégé" });
});


app.get('/artists', authenticateToken, (req, res) => {
  const stmt = db.prepare('SELECT * FROM artists');
  const artists = stmt.all();
  res.json(artists);
});

// Route pour récupérer toutes les musiques
app.get('/musics', authenticateToken, (req, res) => {
  // Joindre les musiques avec leurs albums et les artistes correspondants pour récupérer les informations complètes
  const stmt = db.prepare(`
        SELECT musics.id as music_id, musics.title, albums.name AS album_name, artists.name AS artist_name 
        FROM musics 
        JOIN albums ON musics.album_id = albums.id 
        JOIN artists ON albums.artist_id = artists.id`);
  const musics = stmt.all();
  res.json(musics);
});

// Route pour récupérer toutes les playlists
app.get("/playlists", (req, res) => {
  const stmt = db.prepare("SELECT * FROM playlists");
  const playlists = stmt.all();
  res.json(playlists);
});


// Route pour récupérer les détails d'une playlist spécifique par ID
app.get('/playlists/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const playlistStmt = db.prepare('SELECT * FROM playlists WHERE id = ?');
  const playlist = playlistStmt.get(id);
  if (playlist) {
    const musicsStmt = db.prepare(`
            SELECT musics.* FROM playlist_musics
            JOIN musics ON playlist_musics.music_id = musics.id
            WHERE playlist_musics.playlist_id = ?`);
    const musics = musicsStmt.all(id);
    res.json({ ...playlist, musics });
  } else {
    res.status(404).json({ message: "Playlist not found" });
  }
});

// Route pour récupérer les musiques d'un artiste spécifique par ID de l'artiste
// Cette route doit être mise à jour ou supprimée si les musiques sont désormais liées uniquement à des albums,
// et non directement à des artistes

app.get('/artists/:id/musics', authenticateToken, (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
        SELECT musics.* FROM musics
        JOIN albums ON musics.album_id = albums.id
        WHERE albums.artist_id = ?`);
  const musics = stmt.all(id);
  res.json(musics);
});


// Route pour récupérer les détails d'un artiste spécifique par ID
app.get("/albums", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  const stmt = db.prepare(`
        SELECT albums.id, albums.name, albums.release_date, albums.url_image, albums.artist_id, artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        LIMIT ? OFFSET ?
    `);
  const albums = stmt.all(limit, offset);
  res.json(albums);
});


app.get('/albums', authenticateToken, (req, res) => {
  const stmt = db.prepare(`
    SELECT albums.id, albums.name, albums.release_date, albums.url_image, albums.artist_id, artists.name AS artist_name
    FROM albums
    JOIN artists ON albums.artist_id = artists.id
    `);
  const albums = stmt.all();
  res.json(albums);
});


app.get('/albums/:id/musics', authenticateToken, (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
        SELECT musics.id AS music_id, musics.title, albums.name AS album_name, albums.url_image as url_image,
        artists.name AS artist_name, albums.release_date as albums_release_date
        FROM musics 
        JOIN albums ON musics.album_id = albums.id
        JOIN artists ON albums.artist_id = artists.id
        WHERE musics.album_id = ?
    `);
  const musics = stmt.all(id);
  if (musics) {
    res.json(musics);
  } else {
    res.status(404).send("No musics found for this album");
  }
});

// Route pour récupérer les détails d'un album spécifique par ID
app.get('/albums/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
        SELECT albums.id as albums_id, albums.artist_id as artist_id, albums.name, albums.url_image, artists.name AS artist_name,
        albums.release_date
        FROM albums 
        JOIN artists ON albums.artist_id = artists.id
        WHERE albums.id = ?
    `);
  const album = stmt.get(id);
  if (album) {
    res.json(album);
  } else {
    res.status(404).send("No musics found for this album");
  }
});

// Route pour récupérer les albums d'un artiste spécifique par ID de l'artiste
app.get('/artists/:id/albums', authenticateToken, (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
    SELECT albums.id, albums.name, albums.url_image, albums.artist_id as artist_id, artists.name AS artist_name,
        albums.release_date 
    FROM albums
    JOIN artists ON albums.artist_id = artists.id 
    WHERE artist_id = ?
    `);
  const albums = stmt.all(id);
  res.json(albums);
});

app.get('/search/albums', authenticateToken, (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const offset = (page - 1) * limit;

  const searchQuery = req.query.q;
  const stmt = db.prepare(`
        SELECT albums.id, albums.name, albums.release_date, albums.url_image, albums.artist_id, artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        WHERE albums.name LIKE ?
        LIMIT ? OFFSET ?
    `);
  console.log(stmt);
  const albums = stmt.all(`%${searchQuery}%`, limit, offset);
  res.json(albums);
});


app.get('/search/musics', authenticateToken, (req, res) => {
  const searchQuery = req.query.q;
  const stmt = db.prepare(`
        SELECT musics.id as music_id, musics.title, albums.release_date as albums_release_date, albums.url_image, albums.name AS album_name, artists.name AS artist_name 
        FROM musics 
        JOIN albums ON musics.album_id = albums.id 
        JOIN artists ON albums.artist_id = artists.id
        WHERE musics.title LIKE ?
    `);
  const musics = stmt.all(`%${searchQuery}%`);
  console.log(musics);
  res.json(musics);
});


app.get('/search/artists', authenticateToken, (req, res) => {
  const searchQuery = req.query.q;
  const stmt = db.prepare(`
        SELECT * FROM artists
        WHERE name LIKE ?
    `);
  const artists = stmt.all(`%${searchQuery}%`);
  res.json(artists);
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
