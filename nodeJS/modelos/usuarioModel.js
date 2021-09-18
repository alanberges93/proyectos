
/* Modelo de la colección "usuarios" de MongoDB */

// Creamos la variable de mongoose para comunicarme con mongoDB
var mongoose = require("mongoose");

// Creamos un esquema con la misma colección que hay en MongoDB
var esquemaUsuario = mongoose.Schema({
    nombre:String,  
    apellido:String,
    email:String,
    nacimiento:String,
    password:String
});

// Exportamos el esquema mongoose.model(nombre_entidad_en_MongoDB, variable_esquema); 
module.exports = mongoose.model("Usuario", esquemaUsuario); 