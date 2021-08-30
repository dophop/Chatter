// benötigte Pakete einbinden
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

// zu verwendeden Port definieren
const PORT = process.env.PORT || 3000;

// Server einrichten
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Server starten
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
});

// statische Website bereitstellen
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection' , socket => {    
    socket.on('message' , msg => {
        console.log(msg);

        socket.emit('message', 'Hallo Client!');
        socket.broadcast.emit('message', 'Hallo alle anderen Clients!');
        socket.emit('message', 'Hallo Welt!');
    });
});