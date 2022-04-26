const mariadb = require('mariadb');
const pool = mariadb.createPool({
     host: "127.0.0.1", 
     port: 3308,
     user: "carloserochav", 
     password: "lost1989",
     database:"numerosdb",
     connectionLimit: 5
});//Ya no le muevas bro, asi se debe configurar las credenciales

module.exports = pool;