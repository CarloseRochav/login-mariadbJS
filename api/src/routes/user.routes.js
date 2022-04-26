const express = require("express");
const Router = express.Router();
const userController = require("../controllers/login");


Router.get("/users",userController.getUsers);

Router.post("/users",userController.createUser);


module.exports=Router;//Importante exportar
