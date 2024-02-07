import express from 'express';
import db from './db.js'; // Assurez-vous d'avoir correctement configuré votre connexion SQLite
// import './initDb.js'; // Exécute les scripts d'initialisation de la DB au démarrage

const app = express();
app.use(express.json());

const PORT = 3000;

// Route pour récupérer tous les artistes
app.get('/artists', (req, res) => {
    const stmt = db.prepare('SELECT * FROM artists');
    const artists = stmt.all();
    res.json(artists);
});

// Route pour récupérer toutes les musiques
app.get('/musics', (req, res) => {
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
app.get('/playlists', (req, res) => {
    const stmt = db.prepare('SELECT * FROM playlists');
    const playlists = stmt.all();
    res.json(playlists);
});

// Route pour récupérer les détails d'une playlist spécifique par ID
app.get('/playlists/:id', (req, res) => {
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
        res.status(404).json({ message: 'Playlist not found' });
    }
});

// Route pour récupérer les musiques d'un artiste spécifique par ID de l'artiste
// Cette route doit être mise à jour ou supprimée si les musiques sont désormais liées uniquement à des albums,
// et non directement à des artistes
app.get('/artists/:id/musics', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare(`
        SELECT musics.* FROM musics
        JOIN albums ON musics.album_id = albums.id
        WHERE albums.artist_id = ?`);
    const musics = stmt.all(id);
    res.json(musics);
});

// Route pour récupérer tous les albums
app.get('/albums', (req, res) => {
    const stmt = db.prepare('SELECT * FROM albums');
    const albums = stmt.all();
    res.json(albums);
});

// Route pour récupérer les albums d'un artiste spécifique par ID de l'artiste
app.get('/artists/:id/albums', (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare('SELECT * FROM albums WHERE artist_id = ?');
    const albums = stmt.all(id);
    res.json(albums);
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});