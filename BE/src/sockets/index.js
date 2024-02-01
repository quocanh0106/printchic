/**
 * @namespace sockets
 */
const { receiveSocket } = require('./utils');

const initSocketIo = (io) => {
    io.on('connection', (socket) => {
        console.log('connected a new client');
        socket.on('clientEvent', (data) => {
            console.log('Received data from client:', data);
        
            // Example: Emit an event back to the client
            io.emit('serverEvent', { message: 'Hello from the server!' });
          });
        receiveSocket(io, socket)
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = initSocketIo;
