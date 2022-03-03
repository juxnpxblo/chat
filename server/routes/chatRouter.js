const pool = require('../db/db');

let client, released;

const releaseClient = () => {
  if (!released) {
    client.release();
    released = true;
  }
};

const { Router } = require('express');
const chatRouter = Router();

chatRouter.route('/*').all((req, res, next) => {
  res.statusCode = 200;
  res.set('Content-Type', 'application/json');

  next();
});

chatRouter
  .route('/')
  .get(async (req, res) => {
    try {
      client = await pool.connect();
      released = false;

      const messages = (
        await client.query('SELECT message, sender, date FROM messages')
      ).rows;

      res.json(messages);
    } catch (err) {
      console.error(err.message);
    } finally {
      releaseClient();
    }
  })
  .post(async (req, res) => {
    try {
      const { message, sender } = req.body;

      client = await pool.connect();
      released = false;

      const response = await client.query(
        'INSERT INTO messages (message, sender, date) VALUES ($1, $2, now()) RETURNING *',
        [message, sender]
      );

      res.json(response);
    } catch (err) {
      console.error(err.message);
    } finally {
      releaseClient();
    }
  });

module.exports = chatRouter;
