
    //importamos el archivo app.js
    var app = require("./app");

    // puerto del servidor
    var puerto=3700; // localhost:3700 (podria haber usado cualquier puerto)

    // Creo mi variable para usar mongoose
    var mongoose = require("mongoose");
    mongoose.set('useFindAndModify', false); // esto es para evitar problemas entre Mongoose y NodeJS
    mongoose.Promise=global.Promise;
    // Me conecto a la base de datos. El segundo parámetro es para evitar problemas entre Mongoose y NodeJS
    mongoose.connect('mongodb://localhost:27017/AlanDB',{ useNewUrlParser:true, useUnifiedTopology: true }) //27017 es el puerto por defecto de mongoDB
            .then (()=>{ // si la conexión es exitosa entonces... 
                console.log("Conexion establecida")                
                app.listen(puerto, ()=>{ // escucho el puerto del servidor y si hay respuesta ejecuto una función anónima
                    console.log(`Escuchando el puerto ${puerto}`);                                          
                }) 
            }) 
            .catch (err => console.log (err)); // si la conexíon falla, mostrar error
