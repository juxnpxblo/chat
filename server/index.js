const PORT = process.env.PORT || 5000;
const inHeroku = !!process.env.DYNO;

const express = require('express');
const app = express();

const axios = require('axios');

const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
  transports: ['websocket', 'polling'],
});

const users = {};

io.on('connection', (client) => {
  client.on('username', (username) => {
    const user = {
      username,
      id: client.id,
    };
    users[client.id] = user;

    io.emit('connected');
  });

  client.on('new message', async ({ message, sender }) => {
    const res = await axios.post(
      `${
        inHeroku
          ? 'https://chat-juxnpxblo.herokuapp.com/api/chat'
          : 'http://localhost:5000/api/chat'
      }`,
      {
        message,
        sender,
      }
    );
    io.emit('new message', res.data.rows[0]);
  });

  client.on('disconnect', () => {
    delete users[client.id];
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

server.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
