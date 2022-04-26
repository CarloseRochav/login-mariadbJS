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

        const users = await conn.query(getUsersSQL,(req,res)=>{

            return users;
        })

        res.json({users});

    }catch(err){

        console.log(`Error from api : ${err}`);
        res.json({
            Error: `Error from api : ${err}`
        })

    }finally {
      if (conn) return conn.end();
      }
    


}

// const createUser = async (req,res)=>{

//     const {nombre,apellido,email,password}= req.body;

// }

module.exports=userController;