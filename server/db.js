import Database from 'better-sqlite3';

// Chemin vers votre fichier de base de données SQLite.
// Si le fichier n'existe pas, better-sqlite3 le créera.
const dbPath = './flopifydb.db';

// Crée une nouvelle instance de base de données.
// Le second argument { verbose: console.log } est optionnel
// et permet d'afficher les requêtes SQL dans la console,
// utile pour le débogage durant le développement.
const db = new Database(dbPath, { verbose: console.log });

export default db;
