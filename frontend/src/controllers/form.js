
//Dependency needed for request fetch
const fetch = require("node-fetch");
//We will Use Http Native Node
//const http = require('http');
const form={};
const api = "http://localhost:8080"


//Controller Create User
form.sendUserCreated=async (req,res,next)=>{

    const pathCreateUser = api+"/users";
    //const formSignup = document.getElementById("form");//Form Element
    const {name,lastname,email,pass} = await req.body; //Extrayendo del body del form

    console.log({
        msg:"Si llego",
        nombre: name,
        apellido: lastname,
        correo: email,
        contrasenia : pass
    });
            
        //const [name,lastname,email,password] = data;
            //Fucntion that Fetch 
            // const handleSubmit = async (e) => {    
            //         e.preventDefault();                    

                    // let name=formSignup.elements["name"].value;
                    // let lastname=formSignup.elements["lastname"].value;
                    // let email=formSignup.elements["email"].value;
                    // let password=formSignup.elements["pass"].value;                    
                    
                    const user = await {
                        nombre:name,
                        apellido:lastname,
                        email:email,
                        password:pass
                    };

                    console.log(user + "Finally")

                    //const formData = new FormData(formSignup);
                    //const formDataSerialized = Object.fromEntries(user);
                    const jsonObject = {
                        ...user,
                        sendToSelf: user.sendToSelf ? true : false,
                    };                   

                    const userClear = JSON.stringify(jsonObject);     
                    
                    console.log(userClear + " Stringify")
                    
                        try {
                            const response = await fetch(pathCreateUser, {

                                method: 'POST',
                                body: userClear,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                            });

                            const json = await response.json();
                            //if(json.code==201)res.redirect("/home");
                            //console.log(`Valores ${userClear}`)
                            //res.json(userClear);
                            console.log(json);
                            //console.log(`JSON CODE : ${json.code}`);
                            next();


                        } catch (e) {
                        console.log(`Hay error response : ${e}`);
                        res.json({
                            Msg : `Error : ${e}`
                        })
                        console.log(JSON.stringify(jsonObject));
                        //Objeto de datos aislados
                        console.log(`Valores ${user} User`)
                        //alert(`Error ${e}`);
                        }                    
   
    
    }


    //Controller Log
form.logUser=async(req,res,next)=>{

    const logUserPath = api+"/login";

    const{email,password}=await req.body;

    const user = await {
        email:email,
        password:password
    }

    const jsonObject = {
        ...user,
        sendToSelf: user.sendToSelf ? true : false,
    };                   

    const userClear = JSON.stringify(jsonObject);     
    
    console.log(userClear + " Stringify")
    
        try {
            const response = await fetch(logUserPath, {

                method: 'POST',
                body: userClear,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            const json = await response.json();
            //if(json.code==201)res.redirect("/home");
            //console.log(`Valores ${userClear}`)
            //res.json(userClear);
            console.log(json);
            //console.log(`JSON CODE : ${json.code}`);
            //next();

        }catch(e){

            console.log(`Hay error response : ${e}`);
            res.json({
                Msg : `Error : ${e}`
            })
            console.log(JSON.stringify(jsonObject));           
            
        }

}

module.exports=form;