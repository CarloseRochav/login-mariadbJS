//const { json } = require("express/lib/response");
const pool = require("../../db/dbMaria");
const mysql= require("mysql2");

let userController={};

userController.createUser=async(req,res)=>{

    const {nombre,apellido,email,password}= await req.body;
    //Query Statement
    const createUserSQL = "INSERT INTO USERS (nombre, apellido,email,password) VALUES (?,?,?,?)";

    conn = await pool.getConnection();   

    try{
        
        await pool.query(createUserSQL,[nombre,apellido,email,password],(req,res)=>{

            if(err) throw err;
            console.log('success');
            console.log(res); 
        
        })

        res.json({
            code:201,
            Usuario :` ${nombre} ${apellido}`,
            Email : ` ${email}`
        
        })

    }catch(err){

        console.log(`Error from api :${err}`);
        res.json({
            code:501,
            msg:` Error from api : ${err}`
        })
    }finally {
        if (conn) return conn.end();
        }

}

userController.getUsers=async (req,res)=>{

    //Query Statement
    const getUsersSQL = "SELECT * FROM USERS";
    conn = await pool.getConnection();   

    try{

        const users2 = await conn.query(getUsersSQL,(req,res)=>{

            return users;
        })

        res.json({users2});

    }catch(err){

        console.log(`Error from api : ${err}`);
        res.json({
            Error: `Error from api : ${err}`
        })

    }finally {
      if (conn) return conn.end();
      }

}

userController.logUser=async(req,res)=>{

    const {email,password}=await req.body;

    const sqlFindUser =  "Select * from users where email = ? and password=?";    

    console.log("Usuario solicidado : ")
    console.log({email,password,sqlFindUser});

    const conn = await pool.getConnection();

    try{

        //  conn.query(sqlFindUser, function (err, rows) {

        //     if (err) {
        //         console.log("Error");
        //         throw err;
        //     } else {

        //     }

        //     //return res.json({'resul ':rows});
        //     return console.log(rows);

        // });

        const userSql = mysql.format(sqlFindUser,[email,password]);

        await conn.query(userSql, async(error,result)=>{

            conn.release();


            if (error) throw (error)
            if (result.length == 0) {
                console.log("--------> User does not exist")
                res.sendStatus(404)
               } 
               else {
                console.log("--------> Usuario Encontrado")
                res.sendStatus(201)

               }
        })        
        //const result = await conn.query(sqlFindUser);        
        


            // if(result[0].id){
            //      console.log(result[0]); //Objeto del Usuario
            //      return res.json(result[0]);//No olvidar el return
            // }
            // if(result[0].id==null) {

            //     console.log("Este usuario no existe"); //Objeto del Usuario
            //     throw res.json({msg:"Usuario no existe"});//No olvidar el return
            // }            
            //Continuara


        //res.json(respuesta);
        //  res.json({
        //      code:201, 
        //      respuesta:result2,           
        //      Usuario :` ${email}`
        //  })

    }catch(err){

        console.log(`Error from api : ${err}`);
        res.json({
            Error: `Error from api : ${err}`
        })

    }finally{
        if (conn) return conn.end();
    }


}

// const createUser = async (req,res)=>{

//     const {nombre,apellido,email,password}= req.body;

// }


//Trabaar con el modulo de Mysql solo te permite usar promesas

module.exports=userController;