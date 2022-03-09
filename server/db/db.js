const dbURL = process.env.DATABASE_URL;

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: dbURL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
