import express from 'express';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const DATA_DIR = process.env.DATA_DIR ?? join(__dirname, '..', 'data');
mkdirSync(DATA_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, 'scores.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS scores (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    score     INTEGER NOT NULL CHECK(score >= 0),
    total     INTEGER NOT NULL DEFAULT 20,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
  )
`);

const getRecent = db.prepare(
  'SELECT id, score, total, created_at FROM scores ORDER BY created_at DESC LIMIT 10'
);
const getHighScore = db.prepare('SELECT COALESCE(MAX(score), 0) AS hs FROM scores');
const insertScore  = db.prepare('INSERT INTO scores (score, total) VALUES (?, ?)');
const getById      = db.prepare('SELECT id, score, total, created_at FROM scores WHERE id = ?');

const app = express();
app.use(express.json());

// ── API ──────────────────────────────────────────────────────────────────────

app.get('/api/scores', (_req, res) => {
  const scores    = getRecent.all();
  const { hs }    = getHighScore.get();
  res.json({ scores, highScore: hs });
});

app.post('/api/scores', (req, res) => {
  const { score, total = 20 } = req.body ?? {};
  if (typeof score !== 'number' || score < 0 || score > total) {
    return res.status(400).json({ error: 'score must be a number between 0 and total' });
  }
  const { lastInsertRowid } = insertScore.run(score, total);
  const record    = getById.get(lastInsertRowid);
  const scores    = getRecent.all();
  const { hs }    = getHighScore.get();
  res.status(201).json({ record, scores, highScore: hs });
});

// ── Static + SPA fallback ────────────────────────────────────────────────────

const distDir = join(__dirname, '..', 'dist');
app.use(express.static(distDir));
app.get('*', (_req, res) => res.sendFile(join(distDir, 'index.html')));

// ── Start ────────────────────────────────────────────────────────────────────

const port = Number(process.env.PORT ?? 8080);
app.listen(port, '0.0.0.0', () => {
  console.log(`Road Signs server listening on port ${port}`);
  console.log(`Database: ${join(DATA_DIR, 'scores.db')}`);
});
