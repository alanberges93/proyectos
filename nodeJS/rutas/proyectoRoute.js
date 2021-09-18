
/* Rutas para ABM de proyectos en la base de datos */

var express = require("express");
var router = express.Router();
var proyectoController = require("../controladores/proyectoController");
var conectMultiparty = require("connect-multiparty");
var multipartyMiddleware = conectMultiparty({uploadDir: "./imagenes"});

router.get("/get/:id",proyectoController.getProyecto);
router.get("/get",proyectoController.getProyectos);
router.post("/guardar", proyectoController.guardarProyecto);
router.put("/actualizar/:id", proyectoController.actualizarProyecto);
router.delete("/borrar/:id", proyectoController.borrarProyecto);
router.post("/imagen/:id", multipartyMiddleware, proyectoController.guardarImagen);
router.get("/getImagen/:nombre",proyectoController.getImagen);
module.exports = router; 