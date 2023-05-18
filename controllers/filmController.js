const connection = require("../config/db");

class FilmController {



//Muestra el formulario para crear nueva pelicula
viewNewMovie = (req, res) => {
    let sql = `SELECT * FROM movie_going WHERE deleted = 0`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        res.render("nuevapelicula", {result});
    })
  };


  //Inserta en la base de datos una nueva pelicula
  createMovie = (req, res) => {
    let{title,director,description_m,movie_going_id} = req.body;
    let sql = `INSERT INTO movie (title,director,description_m,movie_going_id) VALUES ("${title}","${director}","${description_m}",${movie_going_id})`;

    if(req.file != undefined){
        let img = req.file.filename;
        sql = `INSERT INTO movie (title,director,img, description_m,movie_going_id) VALUES ("${title}","${director}","${img}","${description_m}",${movie_going_id})`;
    };

connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/vistaprincipal/uncinefilo/${movie_going_id}`)
});
};


//Muestra el formulario de editar pelicula
viewEditFilm = (req, res) => {
    let movie_id = req.params.movie_id;
    let sql = `SELECT * FROM movie WHERE movie_id = ${movie_id} AND movie.deleted = 0`;
    connection.query(sql, (error, result) => {
      if(error) throw error;
      res.render("editarpelicula", {result, mensaje: "" });
    });
  };



  //editamos una pelicula
edit = (req, res) => {
  let movie_id = req.params.movie_id;
  let movie_going_id = req.params.movie_going_id;
  let{title, director,description_m} = req.body;
  
    let sqlUpdate = `UPDATE movie SET title = "${title}", director = "${director}", description_m = "${description_m}" WHERE movie_id = ${movie_id}`;
    
    connection.query(sqlUpdate, (error, result) => {
      if(error) throw error;
      res.redirect(`/vistaprincipal/uncinefilo/${movie_going_id}`);
    });
    };

    //Elimina una pelicula de la base de datos
deleteMovie = (req, res) => {
  let movie_id = req.params.movie_id;
  let movie_going_id = req.params.movie_going_id;
  let sql = `DELETE FROM movie WHERE movie_id = ${movie_id}`;
  connection.query(sql, (error, result) => {
      if(error) throw error;
      res.redirect(`/vistaprincipal/uncinefilo/${movie_going_id}`);
  }); 
};


    //Elimina de forma logica una pelicula de la base de datos
deleteLogicMovie = (req, res) => {
  let movie_id = req.params.movie_id;
  let movie_going_id = req.params.movie_going_id;
  let sql = `UPDATE movie SET deleted = 1 WHERE movie_id = ${movie_id}`;
  connection.query(sql, (error, result) => {
      if(error) throw error;
      res.redirect(`/vistaprincipal/uncinefilo/${movie_going_id}`);
  }); 
};
  

};


module.exports = new FilmController();