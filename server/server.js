const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const calcRouter = require('./routes/calc.router');

// imports for socket.io
const socketIo = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const io = socketIo(server);


// socket.io
io.on( 'connection', socket => {
    console.log(`new client connected for socket.io`);
    // listen for new data from database
    socket.on( 'incoming data', data => {
        socket.broadcast.emit
    })
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

// express
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// ROUTES
app.use('/calculations', calcRouter);

// Start listening for requests on a specific port
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});
