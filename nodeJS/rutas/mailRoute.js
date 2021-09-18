
/* Rutas para enviar mails desde Mailer */

var express = require("express");
var router = express.Router();
var mailController = require("../controladores/mailController");

router.post("/enviar", mailController.enviarMail);
module.exports = router; 