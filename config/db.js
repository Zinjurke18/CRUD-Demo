const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// configure database connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

// test database connection
connection.connect((error) => {
  if (error) throw error;
  console.log("SQL connection successfull");
});

// create and use database
query = "CREATE DATABASE IF NOT EXISTS " + process.env.DATABASE + ";";
connection.query(query, function (err, result) {
  if (err) throw err;
  if (result.affectedRows > 0) {
    console.log("Database created");
  }
});
query = "USE " + process.env.DATABASE + ";";
connection.query(query, function (err, result) {
  if (err) throw err;
  if (result.affectedRows > 0) {
    console.log("Database selected");
  }
});

// create table if not exists
query = "CREATE TABLE IF NOT EXISTS " + process.env.TABLEDEF + ";";
connection.query(query, function (err, result) {
  if (err) throw err;
  if (result.affectedRows > 0) {
    console.log("Table created");
  }
});

module.exports = connection;
