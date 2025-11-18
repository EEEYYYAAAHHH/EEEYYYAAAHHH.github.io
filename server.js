const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(__dirname)); // serve index.html, script.js, style.css, etc.

const GALLERY_PATH = path.join(__dirname, 'gallery.json');

// Root route — serves your HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Return all characters from gallery.json
app.get('/gallery', (req, res) => {
  fs.readFile(GALLERY_PATH, (err, data) => {
    if (err) {
      console.error('Error reading gallery.json:', err);
      return res.status(500).json({ error: 'Failed to read gallery data' });
    }

    try {
      const json = JSON.parse(data.toString() || '[]');
      res.json(json);
    } catch (parseErr) {
      console.error('Error parsing gallery.json:', parseErr);
      res.status(500).json({ error: 'Invalid JSON format' });
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
