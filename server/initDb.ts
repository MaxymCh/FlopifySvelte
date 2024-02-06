import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

(async () => {
  // Ouvrir la base de données avec une interface promisifiée
  const db = await open({
    filename: './flopify.db',
    driver: sqlite3.Database
  });

  // Exemples de commandes pour créer des tables
  await db.exec(`CREATE TABLE IF NOT EXISTS artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS musics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist_id INTEGER NOT NULL,
    FOREIGN KEY(artist_id) REFERENCES artists(id)
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS playlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  await db.exec(`CREATE TABLE IF NOT EXISTS playlist_musics (
    playlist_id INTEGER NOT NULL,
    music_id INTEGER NOT NULL,
    PRIMARY KEY (playlist_id, music_id),
    FOREIGN KEY(playlist_id) REFERENCES playlists(id),
    FOREIGN KEY(music_id) REFERENCES musics(id)
  )`);

  console.log('Database initialized');
  await db.close();
})();
