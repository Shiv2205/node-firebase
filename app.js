const express = require("express");
const helmet = require('helmet');
const db = require('./firebase/databaseOps');

const apiEndpoints = require("./endpoints/api-endpoints");

const app = express();

app.use(helmet());

app.all('/api-endpoints/*', (req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.removeHeader('x-powered-by');
  res.setHeader("Access-Control-Allow-Methods", req.method); //"GET,OPTIONS,POST,DELETE,PATCH,PUT"
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //Content-Type, Authorization
  //res.status(200);
  next();
});

app.use("/api-endpoints", apiEndpoints);

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

const io = require('./socket');
serverSocket = io.init(server);
serverSocket.on('connection', socket => {
  
  serverSocket.emit('connected', {msg: 'dummy'});
  console.log('Client connected');

  socket.on('wish_sent', async data => {
    const wishList = await db.fetchWishes();
    serverSocket.emit('wishUpdate', { wishes: wishList});
    console.log('sent');
  })
});
