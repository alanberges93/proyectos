
var UsuarioModel = require("../modelos/usuarioModel");

/* Como ejemplo para la página, solo existirá un usuario llamado Admin que controle los proyectos. No se crearán más usuarios */

var controller = {
    // Obtener un usuario de la base de datos, según su nombre y contraseña
    // Desde el frontend se envía una petición con el siguiente formato: nombre-contraseña
    getUsuario: function (req, res){        
        var datosUsuario = req.params.usuario.split('-'); // Creamos un vector con dos posiciones. Una para nombre y otra para contraseña

        UsuarioModel.find({nombre: datosUsuario[0], password: datosUsuario[1]},(err, usuario)=>{            
            if (usuario){                
                res.status(200).send(usuario);
            }
            else{
                res.status(500).send("No hay ningun usuario con ese nombre y contraseña");
            }
        });
    }
}

// Exportamos el controlador
module.exports = controller;