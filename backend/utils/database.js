const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../database/warung.db');
const db = new Database(dbPath);

const initSQL = fs.readFileSync(path.join(__dirname, '../database/init.sql'), 'utf8');
db.exec(initSQL);

module.exports = db;