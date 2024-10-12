import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 10000;

app.use(cors());
app.use(express.json());

// Ensure the data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  console.log('Creating data directory:', dataDir);
  fs.mkdirSync(dataDir, { recursive: true });
}

// SQLite database setup
const dbPath = path.join(dataDir, 'warranty_claims.db');
console.log('Database path:', dbPath);
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS claims (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, name TEXT, phoneNumber TEXT, orderNumber TEXT, returnAddress TEXT, brand TEXT, problem TEXT)");
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.post('/api/claims', (req, res) => {
  // ... (keep your existing claim submission logic)
});

app.get('/api/claims', (req, res) => {
  // ... (keep your existing claim fetching logic)
});

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Data directory:', dataDir);
  console.log('Database file:', dbPath);
});