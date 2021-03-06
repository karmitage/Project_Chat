var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected on socket: ' + socket.id);
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    socket.on('disconnect', function () {
        console.log('user disconnected from socket ' + socket.id);

    });
});

// io.on('connection', function (socket) {
//     console.log('a user connected on socket id' + socket.id);
//     socket.on('chat message', function (msg) {
//         io.emit('chat message', msg);
//     });
//     socket.on('disconnect', function () {
//         console.log('user disconnected');
//     });
// });

http.listen(port, function () {
    console.log('listening on *:' + port);
});



