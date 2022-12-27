require("dotenv").config();
const express = require("express"),
  app = express(),
  socket = require('socket.io'),
  { SERVER_PORT } = process.env;

const server = app.listen(SERVER_PORT, () => {
  console.log(`Magic is happening on ${SERVER_PORT}`);
});

app.use(express.static(`${__dirname}/../dist`));

// Socket Connection and Server
const io = socket(server);
io.on('connection', (socket) => {
        console.log('made socket connection', socket.id);
        // Handle chat event
        socket.on('chat', function(data){
                // console.log(data);
                io.emit('chat', data);
        });

        // Handle typing event
        socket.on('typing', function(data){
                socket.broadcast.emit('typing', data);
        });
            
        
})