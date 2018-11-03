const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const { port } = require('./credentials');

// Get index.html file
const PUBLIC_DIR = path.join(__dirname, 'public');
const INDEX_HTML = path.join(PUBLIC_DIR, 'index.html');

// Start web sockets server
const sockets = require("./src/sockets");
sockets(server);

// Create root endpoint to show server is up
app.get('/', (req, res) => {
    res.sendFile(INDEX_HTML);
})

app.get('/uptime', (req, res) => {
    res.status(200).send(`Server is up right now at ${new Date().toJSON()} :D`);
});



// Listen for connections
server.listen(port, () => console.log(`Server listening on port ${port}!`));
