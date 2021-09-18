// Importamos nuestro modelo
var ProyectoModel = require("../modelos/proyectoModel");
// Importamos el filesystem para eliminar archivos
var fs = require("fs");
var path = require("path");

// Creamos las funciones que tendrá nuestro controlador de proyectos
var controller = {    
    // Guardar proyecto en la base de datos
    guardarProyecto: function (req, res){
        proyecto = new ProyectoModel();  
        proyecto.nombre = req.body.nombre;
        proyecto.descripcion = req.body.descripcion;
        proyecto.categoria = req.body.categoria;
        proyecto.year = req.body.year;
        proyecto.imagen = req.body.imagen;

        proyecto.save((err,proyectStored)=>{
            if (err) {
                res.status(500).send("Error al guardar los datos: " + err);
            }
            else if (proyectStored){
                res.status(200).send(proyectStored);  
            }
        })        
    },
    // Obtener un proyecto de la base de datos, según su id
    getProyecto: function(req, res){
        let id = req.params.id;
        ProyectoModel.findById(id,(err, proyecto)=>{
            if (err){
                res.status(500).send("No se encontró el proyecto");
            }
            else if (proyecto){
                res.status(200).send(proyecto);
            }
        });
    },
    // Obtener todos los proyectos en la base de datos
    getProyectos: function(req, res){
        ProyectoModel.find({}).sort({year:1}).exec((err, proyectos)=>{
            if (err){
                res.status(500).send("No hay proyectos en la base de datos");
            }
            else if (proyectos){
                res.status(200).send(proyectos);
            }
        });
    },
    // Actualizar un proyecto de la base de datos, según su id
    actualizarProyecto: function(req, res){
        var id = req.params.id;
        var update = req.body;
        ProyectoModel.findByIdAndUpdate(id, update, {new:true},(err, proyecto)=>{ // {new:true} es para que devuelva el nuevo proyecto y no el viejo
            if (err){
                res.status(500).send("No se actualizó el proyecto");
            }
            else if (proyecto){
                res.status(200).send(proyecto);
            }
        });
    },
    // Borrar un proyecto de la base de datos, según su id
    borrarProyecto: function(req,res){
        var id = req.params.id;
        ProyectoModel.findByIdAndRemove(id, (err, proyecto)=>{ 
            if (err){
                res.status(500).send("No se encontró el proyecto");
            }
            else if (proyecto){
                res.status(200).send(proyecto);
            }
        });
    },
    // Guardar la imagen de un proyecto en la base de datos, según su id
    guardarImagen: function(req,res){
        var id = req.params.id;       
        if (req.files){ // si el archivo existe
            var ruta = req.files.imagen.path;
            var nombreImagen = ruta.split("\\")[1];
            var formato= nombreImagen.split(".")[1];            
            
            if (formato=="jpg" || formato=="jpeg" || formato=="png" || formato=="gif"){ // si es un formato válido
                var update = { imagen: nombreImagen };                  
                ProyectoModel.findByIdAndUpdate(id,update,{new: true},(err, proyecto)=>{
                    if (err){
                        res.status(500).send("No se encontró el proyecto");
                    }
                    else if (proyecto){
                        res.status(200).send(proyecto);
                    }
               })
            } 
            else { // si es un formato inválido
                res.status(500).send("Error: suba un formato válido (jpg, jpeg, png, gif)");                
                fs.unlink(ruta,(err)=>{
                    if (err){
                        console.log("Error al borrar archivo: "+err);
                    }
                });
            }          
        }        
    },
    // Obtener una imagen de la carpeta "imagenes", según su nombre
    getImagen: function(req,res){
        var nombre = req.params.nombre;
        var ruta = "./imagenes/"+nombre;
        console.log(ruta);
        fs.exists(ruta,(exists)=>{
            if(exists){
                return res.sendFile(path.resolve(ruta));
            }
            else{
                res.status(500).send("No se encontró la imagen");
            }
        })
    }
}

// Exportamos el controlador
module.exports = controller;