
/* Rutas para acceder al usuario de la base de datos */

var express = require("express");
var router = express.Router();
var usuarioController = require("../controladores/usuarioController");

router.get("/get/:usuario", usuarioController.getUsuario);

module.exports = router; 