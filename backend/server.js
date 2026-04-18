const express = require('express');
const cors = require('cors');
const { getDb, initDb, DOMAINS } = require('./database');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

initDb();

// ─── Helper ──────────────────────────────────────────────
function parseRow(row) {
  if (!row) return null;
  return {
    ...row,
    variables:           JSON.parse(row.variables),
    applications:        JSON.parse(row.applications),
    calculator_eligible: Boolean(row.calculator_eligible),
  };
}

function isValidDomain(domain) {
  return DOMAINS.includes(domain);
}

// ─── Domain table routes ──────────────────────────────────

// GET /api/domains  →  all domain tables with formula count
app.get('/api/domains', (req, res) => {
  const db = getDb();
  const results = DOMAINS.map(domain => {
    const row = db.prepare(`SELECT COUNT(*) as count FROM ${domain}`).get();
    return { domain, count: row.count };
  });
  db.close();
  res.json(results);
});

// GET /api/:domain  →  all formulas in a domain table
// optional query: ?category=&difficulty=&q=
app.get('/api/:domain', (req, res) => {
  const { domain } = req.params;
  if (!isValidDomain(domain)) return res.status(404).json({ error: `Unknown domain: ${domain}` });

  const { category, difficulty, q } = req.query;
  const db = getDb();

  let sql = `SELECT * FROM ${domain} WHERE 1=1`;
  const params = {};

  if (category)   { sql += ' AND category = @category';     params.category = category; }
  if (difficulty) { sql += ' AND difficulty = @difficulty'; params.difficulty = difficulty; }
  if (q)          { sql += ' AND (name LIKE @q OR category LIKE @q OR applications LIKE @q)'; params.q = `%${q}%`; }

  sql += ' ORDER BY category, difficulty';

  const rows = db.prepare(sql).all(params).map(parseRow);
  db.close();
  res.json({ domain, count: rows.length, formulas: rows });
});

// GET /api/:domain/categories  →  category breakdown within a domain
app.get('/api/:domain/categories', (req, res) => {
  const { domain } = req.params;
  if (!isValidDomain(domain)) return res.status(404).json({ error: `Unknown domain: ${domain}` });

  const db = getDb();
  const rows = db.prepare(`
    SELECT category, COUNT(*) as count, difficulty
    FROM ${domain}
    GROUP BY category
    ORDER BY category
  `).all();
  db.close();
  res.json(rows);
});

// GET /api/:domain/:id  →  single formula by id inside a domain
app.get('/api/:domain/:id', (req, res) => {
  const { domain, id } = req.params;
  if (!isValidDomain(domain)) return res.status(404).json({ error: `Unknown domain: ${domain}` });

  const db = getDb();
  const row = db.prepare(`SELECT * FROM ${domain} WHERE id = ?`).get(id);
  db.close();

  if (!row) return res.status(404).json({ error: 'Formula not found' });
  res.json(parseRow(row));
});

// GET /api/search?q=  →  search across ALL domain tables
app.get('/api/search', (req, res) => {
  const { q = '' } = req.query;
  if (!q.trim()) return res.json({ count: 0, formulas: [] });

  const db = getDb();
  let allResults = [];

  for (const domain of DOMAINS) {
    const rows = db.prepare(`
      SELECT * FROM ${domain}
      WHERE name LIKE @q OR category LIKE @q OR applications LIKE @q OR symbol LIKE @q
    `).all({ q: `%${q}%` }).map(parseRow);
    allResults = allResults.concat(rows);
  }

  db.close();
  res.json({ count: allResults.length, formulas: allResults });
});

// GET /api/formulas  →  compatibility: all formulas across all domains
app.get('/api/formulas', (req, res) => {
  const { domain } = req.query;
  if (domain) {
    // redirect internally to domain-specific handler
    return res.redirect(`/api/${domain}`);
  }

  const db = getDb();
  let allRows = [];
  for (const d of DOMAINS) {
    const rows = db.prepare(`SELECT * FROM ${d}`).all().map(parseRow);
    allRows = allRows.concat(rows);
  }
  db.close();
  res.json({ count: allRows.length, formulas: allRows });
});

// GET /api/health
app.get('/api/health', (_, res) => {
  res.json({ status: 'ok', domains: DOMAINS, timestamp: new Date().toISOString() });
});

// ─── Start ───────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 HyperCalc Backend  →  http://localhost:${PORT}`);
  console.log('');
  console.log('  Domain Table Endpoints:');
  DOMAINS.forEach(d => console.log(`  GET /api/${d}`));
  console.log('');
  console.log('  Utility Endpoints:');
  console.log('  GET /api/domains');
  console.log('  GET /api/search?q=');
  console.log('  GET /api/health\n');
});
