
// creamos variables para los objetos que se encuentran en node_modules
var express = require("express"); // comunicacion por http
var body_parser = require("body-parser"); // conversor a json
// importamos las rutas
var proyectoRoute = require("./rutas/proyectoRoute");
var mailRoute = require("./rutas/mailRoute");
var usuarioRoute = require("./rutas/usuarioRoute");

// asignamos en app el contendio de la librería express
var app = express();

//vamos a convertir a json cualquier respuesta que recibamos en app
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

// Configurarmos el CORS para las peticiones Ajax entre el frontend y el backend
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Agregamos las rutas de nuestros proyectos y opcionalmente agregamos por delante la ruta "/proyectos" 
app.use("/proyectos",proyectoRoute); // Ej: localhost:3700/proyectos/guardar
app.use("/mail",mailRoute); // Ej: localhost:3700/mail/enviar
app.use("/usuario",usuarioRoute); // Ej: localhost:3700/usuario/get


// exportamos nuestro archivo app.js
module.exports = app;
