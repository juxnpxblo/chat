const dbURL =
  process.env.DATABASE_URL ||
  'postgres://dpzjjikonraucu:71e0a8b4199cf82fcb7610ec73c48d4c748669e3cae9ee3efa9e14b3549cbee0@ec2-52-73-149-159.compute-1.amazonaws.com:5432/d89mgohbphomj1';

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: dbURL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
