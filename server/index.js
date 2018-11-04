const path = require('path');
const crypto = require('crypto');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const { port } = require('./credentials');
const generateS3Credentials = require('./src/generate-s3-credentials');

// Get index.html file
const PUBLIC_DIR = path.join(__dirname, 'public');
const INDEX_HTML = path.join(PUBLIC_DIR, 'index.html');

// Start web sockets server
const sockets = require('./src/sockets');
sockets(server);

// Create root endpoint to show server is up
app.get('/', (req, res) => {
  res.sendFile(INDEX_HTML);
});

app.get('/uptime', (req, res) => {
  res.status(200).send(`Server is up right now at ${new Date().toJSON()} :D`);
});

app.get('/auth-upload', (req, res) => {
  const filename = req.query.filename;
  if (filename) {
    const hashedFilename =
      crypto.randomBytes(16).toString('hex') + path.extname(filename);
    res.json(
      generateS3Credentials.run({
        hashedFilename,
        contentType: req.query.content_type,
      })
    );
  } else {
    res
      .status(400)
      .send('please include a filename in your upload request');
  }
});

// Listen for connections
server.listen(port, () => console.log(`Server listening on port ${port}!`));
