const { Pool } = require('pg');


const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@book-verse-plus-books-postgres-srv:5432/${process.env.POSTGRES_DB}`;


const pool = new Pool({
    connectionString: connectionString,
});

module.exports = pool;