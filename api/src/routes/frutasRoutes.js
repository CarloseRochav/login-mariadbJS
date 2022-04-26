const express = require("express");
const FrutasRouter = express.Router();
const pool = require("../../db/dbMaria");


FrutasRouter.get("/frutas");
FrutasRouter.post("/frutas", async (req,res)=>{

    const {nombre,apellido}= await req.body;

    const alumno={
        nombre:nombre,
        apellido:apellido
    }
    
    console.log(alumno);
    //Query to do
    const queryCreate = "INSERT INTO alumnos (nombre, apellido) VALUES (?, ?)";
    //Gey connection
    const conn = await pool.getConnection();

    try {
        //await conn.query(queryCreate,alumno,(err,res)=>{
        //Array
        await conn.query(queryCreate,[nombre,apellido],(err,res)=>{

            if(err) throw err;
            console.log('success');
            console.log(res);

        });//Ultimo paso de sabado        

        res.json({
            msg:`Usuario Creado` ,
            Nombre : alumno.nombre,
            Apellido: alumno.apellido 
            
        })

    }catch(err){
        await res.json({
                msg:`Error : ${err}`,
        });    
    }
});


module.exports=FrutasRouter;