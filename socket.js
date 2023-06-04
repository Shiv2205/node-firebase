const { Server } = require('socket.io');
let io;
const dev_client = 'http://localhost:3000';
const prod_client = 'https://wedding-app-ebon.vercel.app';
const front_end = prod_client;

module.exports = {
    init: httpServer => {
        io = new Server(httpServer, {
            cors: {
                origin: front_end,
                methods: ['GET', 'POST']
              }
        });
        return io;
    },
    getIO: () => {
        if(!io) {
            throw new Error('Websocket not initialized.');
        }
        return io;
    }
};