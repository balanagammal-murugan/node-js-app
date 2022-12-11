const mysql = require('mysql');

require('dotenv').config();

const database = mysql.createConnection({
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
});

module.exports = database;