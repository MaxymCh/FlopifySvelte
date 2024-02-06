import Database from 'better-sqlite3';
import importArtistsAndAlbums from './spotifyIntegration.js';
const db = new Database('flopifydb.db', { verbose: console.log });

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);


db.exec(`CREATE TABLE IF NOT EXISTS artists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  genre TEXT
)`);

db.exec(`CREATE TABLE IF NOT EXISTS musics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  album_id INTEGER,
  FOREIGN KEY(album_id) REFERENCES albums(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS playlists (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

db.exec(`CREATE TABLE IF NOT EXISTS playlist_musics (
  playlist_id INTEGER NOT NULL,
  music_id INTEGER NOT NULL,
  PRIMARY KEY (playlist_id, music_id),
  FOREIGN KEY(playlist_id) REFERENCES playlists(id),
  FOREIGN KEY(music_id) REFERENCES musics(id)
)`);

db.exec(`
CREATE TABLE IF NOT EXISTS albums (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  release_date TEXT,
  artist_id INTEGER,
  FOREIGN KEY(artist_id) REFERENCES artists(id)
)`);

console.log('Database initialized with required tables.');
db.close();

importArtistsAndAlbums().catch(console.error);
