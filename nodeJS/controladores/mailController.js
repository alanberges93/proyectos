
var transporter = require("../configuraciones/mailer");

var controller = {

    enviarMail: async function(req, res){  
        try{
            // Enviar mail con un objeto de transporte definido        
           await transporter.sendMail({
                from: req.body.email, // Remitente
                to: "alanber.web@gmail.com", // Destinatario
                subject: req.body.asunto, // Asunto
                text: `${req.body.nombre} (${req.body.email}) te envió el siguiente mensaje desde tu página web: \n \n ${req.body.descripcion}`, // Mensaje
            });
            return res.status(200).send({message: "Mail enviado exitosamente"}); 
        }  
        catch(error){
            return res.status(500).send({message:"Ocurrió un error al enviar el mail: " + error});
        }   
    }
}

// Exportamos el controlador
module.exports = controller;