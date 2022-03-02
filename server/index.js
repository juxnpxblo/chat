const PORT = process.env.PORT || 5000;
const inHeroku = !!process.env.DYNO;

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const usersRouter = require('./routes/usersRouter');
app.use('/api/users', usersRouter);

const chatRouter = require('./routes/chatRouter');
app.use('/api/chat', chatRouter);

if (inHeroku) {
  app.use(express.static(path.resolve(__dirname, '../client/build')));

  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`running at http://localhost:${PORT}`));
