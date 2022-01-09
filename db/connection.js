const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Allah_111',
      database: 'election'
    },
    console.log('Connected to the employees database.')
  );


  module.exports = db;