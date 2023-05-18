var express = require("express");
const principalController = require("../controllers/principalController");
const multer = require("../middleware/multer");
var router = express.Router();

//Ruta base del archivo: localhost:3000/vistaprincipal
router.get("/", principalController.viewPrincipal);

// localhost:3000/vistaprincipal/registro
router.get("/registro", principalController.viewRegistro);

// localhost:3000/vistaprincipal/registro
router.post("/registro", multer("cinefilo"), principalController.createCinefilo);

//localhost:3000/vistaprincipal/uncinefilo/:movie_going_id
router.get("/uncinefilo/:movie_going_id", principalController.viewUnCinefilo);

//localhost:3000/vistaprincipal/login
router.get("/login", principalController.viewLoginForm);

//localhost:3000/vistaprincipal/login
router.post("/login", principalController.login);

//localhost:3000/vistaprincipal/buscarcinefilo
router.post("/buscarcinefilo", principalController.busqueda);












module.exports = router;