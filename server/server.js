import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import db from "./db.js"; // Assurez-vous d'avoir correctement configuré votre connexion SQLite
// import './initDb.js'; // Exécute les scripts d'initialisation de la DB au démarrage

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

// Route pour se connecter
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = db.prepare("SELECT * FROM users WHERE email = ?");
  const user = query.get(email);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Authentification réussie
    res.json({ message: "Connexion réussie" });
    print("Connexion réussie");
  } else {
    // Échec de l'authentification
    res.status(401).json({ error: "Email ou mot de passe incorrect" });
  }
});

// Route pour récupérer tous les artistes
app.get("/artists", (req, res) => {
  const stmt = db.prepare("SELECT * FROM artists");
  const artists = stmt.all();
  res.json(artists);
});

// Route pour récupérer toutes les musiques
app.get("/musics", (req, res) => {
  // Joindre les musiques avec leurs albums et les artistes correspondants pour récupérer les informations complètes
  const stmt = db.prepare(`
        SELECT musics.id, musics.title, albums.name AS album_name, artists.name AS artist_name 
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
app.get("/playlists/:id", (req, res) => {
  const { id } = req.params;
  const playlistStmt = db.prepare("SELECT * FROM playlists WHERE id = ?");
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
app.get("/artists/:id/musics", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
        SELECT musics.* FROM musics
        JOIN albums ON musics.album_id = albums.id
        WHERE albums.artist_id = ?`);
  const musics = stmt.all(id);
  res.json(musics);
});

app.get("/albums", (req, res) => {
  const page = parseInt(req.query.page) || 1; // Récupère le numéro de page à partir des paramètres de requête
  const limit = parseInt(req.query.limit) || 9; // Récupère la limite d'éléments par page à partir des paramètres de requête
  const offset = (page - 1) * limit; // Calcule l'offset en fonction du numéro de page et de la limite

  const stmt = db.prepare(`
        SELECT albums.id, albums.name, albums.release_date, albums.url_image, albums.artist_id, artists.name AS artist_name
        FROM albums
        JOIN artists ON albums.artist_id = artists.id
        LIMIT ? OFFSET ?
    `);
  const albums = stmt.all(limit, offset);
  res.json(albums);
});

app.get("/albums/:id/musics", (req, res) => {
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

app.get("/albums/:id", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare(`
        SELECT albums.id as albums_id, albums.name, albums.url_image, artists.name AS artist_name,
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
app.get("/artists/:id/albums", (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare("SELECT * FROM albums WHERE artist_id = ?");
  const albums = stmt.all(id);
  res.json(albums);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
