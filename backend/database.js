const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'hypercalc.db');

const DOMAINS = [
  'mechanical',
  'electrical',
  'civil',
  'chemical',
  'mathematics',
  'physics',
  'cs',
  'economics',
];

const TABLE_SCHEMA = (tableName) => `
  CREATE TABLE IF NOT EXISTS ${tableName} (
    id                  TEXT PRIMARY KEY,
    domain              TEXT NOT NULL,
    category            TEXT NOT NULL,
    difficulty          TEXT NOT NULL CHECK (difficulty IN ('basic', 'intermediate', 'advanced')),
    name                TEXT NOT NULL,
    symbol              TEXT,
    formula             TEXT NOT NULL,
    variables           TEXT NOT NULL,   -- JSON string
    applications        TEXT NOT NULL,   -- JSON string
    calculator_route    TEXT,
    calculator_eligible INTEGER NOT NULL DEFAULT 1
  );
  CREATE INDEX IF NOT EXISTS idx_${tableName}_category   ON ${tableName}(category);
  CREATE INDEX IF NOT EXISTS idx_${tableName}_difficulty ON ${tableName}(difficulty);
`;

function getDb() {
  const db = new Database(DB_PATH);
  db.pragma('journal_mode = WAL');
  return db;
}

function initDb() {
  const db = getDb();

  for (const domain of DOMAINS) {
    db.exec(TABLE_SCHEMA(domain));
  }

  db.close();
  console.log('✅ Domain tables initialized:', DOMAINS.join(', '));
}

module.exports = { getDb, initDb, DOMAINS };
