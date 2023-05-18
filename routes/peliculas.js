const express = require("express");
const multer = require("../middleware/multer");
const filmController = require("../controllers/filmController");
const router = express.Router();

//Ruta base del archivo: localhost:3000/peliculas

//localhost:3000/peliculas/nuevapelicula
router.get("/nuevapelicula", filmController.viewNewMovie);

//localhost:3000/peliculas/nuevapelicula
router.post("/nuevapelicula", multer("peliculas"), filmController.createMovie);

//localhost:3000/peliculas/editarpelicula/:movie_going_id/:movie_id
router.get("/editarpelicula/:movie_going_id/:movie_id", filmController.viewEditFilm);

//localhost:3000/peliculas/editarpeliculas/movie_going_id/:movie_id
router.post("/editarpelicula/:movie_going_id/:movie_id", filmController.edit);

//localhost:3000/peliculas/deleteMovie/movie_going_id/:movie_id
router.get("/deleteMovie/:movie_going_id/:movie_id", filmController.deleteMovie);

//localhost:3000/peliculas/deleteLogicMovie/movie_going_id/:movie_id
router.get("/deleteLogicMovie/:movie_going_id/:movie_id", filmController.deleteLogicMovie);



module.exports = router;