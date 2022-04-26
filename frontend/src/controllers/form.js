
const form={};
const api = "http://localhost:8080"

form.sendUserCreated=async (data)=>{

    const pathCreateUser = api+"/users";
    //const data = new FormData(document.getElementById('registerUser'));
    
    // fetch(pathCreateUser, {
    //     method: 'POST',
    //     body: data
    //  })
    //  .then(function(response) {
    //     if(response.ok) {
    //         return response.text()
    //     } else {
    //         throw "Error en la llamada Ajax";
    //     }
     
    //  })
    //  .then(function(texto) {
    //     console.log(texto);
    //  })
    //  .catch(function(err) {
    //     console.log(err);

    const formSignup = await document.getElementById("registerUser");
    

    formSignup.addEventListener('submit',(e)=>{

            e.preventDefault();
            const formData = new FormData(formSignup);
            const formDataSerialized = Object.fromEntries(formData);
            const jsonObject={
                ...formDataSerialized,
                sendToSelf:formDataSerialized.sendToSelf ? true :false,

            };

            try{

                const response = await fetch(pathCreateUser,{
    
                    method:'POST',
                    body:JSON.stringify(jsonObject),
                    headers:{
                        'Content-Type' : 'application/json'
                    }    
                });
    
                const json = await response.json();
                if(json.code==201) console.log("Usuario Creado") ;
                console.log(json);
                alert("there as an error");
    
            }catch(e){
                console.log(`Hay error : ${e}`);
            }
        })
    
    }

//module.exports=form;