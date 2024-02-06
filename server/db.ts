import Database from 'better-sqlite3';
const db = new Database('mydatabase.db', { verbose: console.log });

export default db;
