

const fetch = require("node-fetch");
const form={};

const api = "http://localhost:8080"

form.sendUserCreated=async (req,res)=>{

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
                            const response = await fetch("http://localhost:8080/users", {

                                method: 'POST',
                                body: userClear,
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                            });

                            const json = await response.json();

                            if(json.code==201)console.log("Usuario Registrado ");


                            await console.log(`Valores ${userClear}`)
                            res.json(userClear);
                            console.log(json);
                            console.log(`JSON CODE : ${json.code}`);

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
//                };                     

                
                //Evento ; Elemento FORM
        //formSignup.addEventListener('submit', handleSubmit);
    
   
    
    }

module.exports=form;