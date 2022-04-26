// load the things we need
const express = require('express');
const app = express();
//const logIn = require("./pages/logIn");
const path = require("path");
//Use Session
const session = require('express-session');//Es necesario instalar

//Controllers
const formController = require("./src/controllers/form");


//Para guardar sesion - LOGIN
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//PAra usar el form
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuramos la carpeta public static para usar estilos CSS
app.use(express.static('public'));


//Set views directory
app.set('views',path.join(__dirname,'views'));
// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.send("Hola Mundo");//Responder con mensaje a pantalla
    //res.render('pages/index');
});

app.get("/despedida",(req,res)=>{
    res.send("ADIOS AMIGO");
})



//render page signUp
app.get('/signup', function(req, res) {
    res.render('signup');
});

//render page logIn
app.get('/login', function(req, res) {
    res.render('login');
});


app.get('/secret',(req,res)=>{
    res.render('images')
})

//SignUp
app.post("/add-user",formController.sendUserCreated,async(req,res)=> res.redirect("/home"));//Terminada : Creo
//Login User
app.post("/log-user",formController.logUser,async(req,res)=> res.redirect("/home"));

app.get("/home",async (req,res)=>{
    await res.render("images");
});


app.listen(8181);
console.log('8181 is the magic port');