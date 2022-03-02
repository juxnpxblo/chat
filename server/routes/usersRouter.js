const pool = require('../db');

let client, released;

const releaseClient = () => {
  if (!released) {
    client.release();
    released = true;
  }
};

const { Router } = require('express');
const usersRouter = Router();

usersRouter.route('/*').all((req, res, next) => {
  res.statusCode = 200;
  res.set('Content-Type', 'application/json');

  next();
});

usersRouter.route('/').post(async (req, res) => {
  try {
    const { username, password } = req.body;

    client = await pool.connect();
    released = false;

    await client.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, password]
    );

    res.json({ code: 1 });
  } catch (err) {
    res.json({ code: err.code });
  } finally {
    releaseClient();
  }
});

usersRouter.route('/:username/password').get(async (req, res) => {
  try {
    const { username } = req.params;

    client = await pool.connect();
    released = false;

    const q = await client.query(
      'SELECT password FROM users WHERE username = $1',
      [username]
    );

    res.json(q);
  } catch (err) {
    console.error(err.message);
  } finally {
    releaseClient();
  }
});

module.exports = usersRouter;
