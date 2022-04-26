const express = require("express");
const app = express();
const cors =require("cors");



//Uso de bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// habilitar cors
app.use(cors());

// puerto de la apps


// //Arrancamos APP
// app.listen(port, "0.0.0.0", () => {
//     console.log(`El servidor esta funcionando en el puerto ${port}`);


module.exports = app;