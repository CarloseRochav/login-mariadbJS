const app = require("./app");
//const{sequelize}=require("../db/models/index");
const pool = require("../db/dbMaria");
const frutasRoutes = require("./routes/frutasRoutes");
const userRoutes = require("./routes/user.routes");

const port = process.env.PORT || 8080;

app.use(userRoutes);
app.use(frutasRoutes);


app.listen(port, "0.0.0.0", () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)

    //TESTING CONNECTION NO sequelize
    
    // pool.getConnection()
    // .then(conn => {
    
    //   conn.query("SELECT 1 as val")
    //     .then((rows) => {
    //       console.log(rows); //[ {val: 1}, meta: ... ]
    //       //Table must have been created before 
    //       // " CREATE TABLE myTable (id int, val varchar(255)) "
    //       //return conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //        return console.log("Conexion Exitosa");
    //     })
    //     .then((res) => {
    //         // conn.query("SELECT * FROM ALUMNOS");
    //         // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //         // conn.end();
    //         conn.query("SELECT * FROM ALUMNOS").then((rows)=>{
    //             console.log(rows);
    //             conn.end();
    //         })   
    //     })
    //     .catch(err => {
    //       //handle error
    //       console.log(`Error al realizar la Query : ${err}`); 
    //       conn.end();
    //     })
        
    // }).catch(err => {
    //     console.log(`No se pudo CONECTAR Se presento el siguiente Error : ${err}`);
    //   //not connected
    // });
    

    //Conexion usando Async/Await
    async function database() {
      let conn;
      try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT 1 as val");
      console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("SELECT * FROM ALUMNOS");
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    
      } catch (err) {
      throw err;
      } finally {
      if (conn) return conn.end();
      }
    }

    database();
    //TESTING CONNECTION with sequelize
    // sequelize.authenticate()
    //     .then(() => {
    //     console.log("Connected to the database.");
    //     })
    //     .catch((err) => {
    //     console.error("Unable to connect to database:", err);
    //     });


});




