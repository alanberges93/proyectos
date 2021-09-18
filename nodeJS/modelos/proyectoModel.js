
/* Modelo de la colección "proyectos" de MongoDB */

// Creamos la variable de mongoose para comunicarme con mongoDB
var mongoose = require("mongoose"); 

// Creamos un esquema con la misma colección que hay en MongoDB
var esquemaProyecto = mongoose.Schema({ 
    nombre: String,
    descripcion: String,
    categoria: String,
    year: Number,    
    imagen: String
});

// Exportamos el esquema mongoose.model(nombre_entidad_en_MongoDB, variable_esquema); 
module.exports = mongoose.model("Proyecto", esquemaProyecto); 