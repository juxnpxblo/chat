require('dotenv').config();

const PORT = process.env.PORT;
const inHeroku = !!process.env.DYNO;

const api = require('./api/api');

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io');
const socket = io(server, {
  transports: ['websocket', 'polling'],
});

socket.on('connection', (client) => {
  client.on('new message', async ({ message, sender }) => {
    const res = await api.post('/chat', {
      message,
      sender,
    });
    socket.emit('new message', res.data.rows[0]);
  });
});

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

const chatRouter = require('./routes/chatRouter');
app.use('/api/chat', chatRouter);

if (inHeroku) {
  const path = require('path');

  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

server.listen(PORT);
