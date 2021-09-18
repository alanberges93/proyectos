
/* Administrar cuenta de google -> Seguridad -> Iniciar sesión con google -> Verificación en dos pasos (seguir los pasos y activar)
   Ir atrás -> Acceso a google -> Contraseña de aplicaciones -> Seleccionar aplicación -> Otro -> [Escribir un nombre] -> Generar
   Copiar contraseña y pegarla en la variable passwordAPI 
*/ 

var nodemailer = require('nodemailer');
const usuarioAPI = "alanber.web@gmail.com";
const passwordAPI = "wzkbdmnwjymciinf";
       
// crear transporte SMTP 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para 465, false para otros puertos
    auth: {
        user: usuarioAPI, 
        pass: passwordAPI, 
    },
});

transporter.verify().then(()=>{
console.log("Listo para enviar emails");
});

module.exports = transporter;