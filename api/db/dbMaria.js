const mariadb = require('mariadb');
const mysql= require("mysql2");

// const pool = mariadb.createPool({
//      host: "127.0.0.1", 
//      port: 3308,
//      user: "carloserochav", 
//      password: "lost1989",
//      database:"numerosdb",
//      connectionLimit: 5
// });//Ya no le muevas bro, asi se debe configurar las credenciales

const pool = mysql.createPool({
     connectionLimit: 100,
     host: "127.0.0.1",       //This is your localhost IP
     user: "carloserochav",         // "newuser" created in Step 1(e)
     password: "lost1989",  // password for the new user
     database: "numerosdb",      // Database name
     port: "3308"             // port name, "3306" by default
  })

module.exports = pool;