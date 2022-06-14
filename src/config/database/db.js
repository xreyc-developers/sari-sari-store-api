const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const connectionString = process.env.DATABASE_URL;
console.log(connectionString);

const pool = new Pool({
    connectionString,
});

// const pool = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

pool.on('connect', () => {
    console.log('Connection Initialize');
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}