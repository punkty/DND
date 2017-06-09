const express = require('express'),
    app = express(),
    path = require('path'),
    socket = require('socket.io'),
    socketModule = require('./server/socketModule.js'),
    port = 8000

app.use(express.static(path.join(__dirname, '/client')))

const server = app.listen(port, () => console.log(`Listening on ${port}`)),
    io = socket(server)

socketModule(io)