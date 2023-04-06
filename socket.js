const { Server } = require('socket.io');
let io;

module.exports = {
    init: httpServer => {
        io = new Server(httpServer, {
            cors: {
                origin: 'https://wedding-app-ebon.vercel.app',
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