var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.emit('message', `A new user, ${Date.now()}, has connected.`)

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.join('chatroom');
  io.to('chatroom').emit('Welcome to the chatroom, where it is always 1994');

  socket.on('disconnect', msg => {
    io.emit('msg', 'Someone has disconnected');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});