//const { json } = require("express/lib/response");
const pool = require("../../db/dbMaria");

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

    const sqlFindUser = 'SELECT * FROM USERS WHERE EMAIL="'+email+'" AND PASSWORD="'+password+'"';    

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

         const result = await conn.query(sqlFindUser);        
        
            console.log(result);
            res.json(result);
            //Continuara


        //res.json(respuesta);
        // res.json({
        //     code:201, 
        //     respuesta:respuesta,           
        //     Usuario :` ${email}`
        // })

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

module.exports=userController;