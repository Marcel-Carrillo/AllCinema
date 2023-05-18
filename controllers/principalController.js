const connection = require("../config/db");
const bcrypt = require("bcrypt");

class PrincipalController {

    //Vista de todos los cinefilos
viewPrincipal = (req, res) => {
    let sql = `SELECT * FROM movie_going WHERE deleted = 0`;
    connection.query(sql, (error, result) => {
        if(error) throw error;
        res.render("vistaprincipal", {result});
    });
};

//Vista del formulario de crear cinefilo
viewRegistro = (req, res) => {
    res.render("registro", {mensaje: ""});
};

//Recoge datos del formulario para crear cinefilo
createCinefilo = (req, res) => {
    let {first_name, last_name, email, password, description, telephone_number} = req.body;

    bcrypt.hash(password, 10, function(err, hash) {
        if(err) throw err;

        let sql = `INSERT INTO movie_going (first_name, last_name, email, password, description, telephone_number) VALUES ("${first_name}","${last_name}","${email}","${hash}","${description}","${telephone_number}")`;
        if(req.file != undefined){
            let img = req.file.filename;
            sql = `INSERT INTO movie_going (first_name, last_name, email, password, img, description, telephone_number) VALUES ("${first_name}","${last_name}","${email}","${hash}","${img}","${description}","${telephone_number}")`;
        };
        connection.query(sql, (error, result) => {
            if(error){
                if(error.code == "ER_DUP_ENTRY"){
                    res.render("registro", {mensaje:"El email ya existe"})
                }else {
                    throw error;
                }
            }else{
                res.redirect(`/vistaprincipal/uncinefilo/${result.insertId}`);
            };
        });
    });
};

//Muestra la vista de un cinefilo con todas sus peliculas
viewUnCinefilo = (req, res) => {
    let movie_going_id = req.params.movie_going_id;
    let sql1 = `SELECT * FROM movie_going WHERE movie_going_id = ${movie_going_id} AND deleted = 0`
    let sql2 = `SELECT * FROM movie WHERE movie_going_id = ${movie_going_id} AND deleted = 0`
    connection.query(sql1, (error1, resultmovie_going) => {
      if (error1) throw error1;
      connection.query(sql2, (error2, resultmovie) => {
        if (error2) throw error2;
        res.render("uncinefilo", {resultmovie_going,resultmovie});
      });
    });
  };

  //Muestra el formulario de login
  viewLoginForm = (req, res) => {
    res.render ("login", {mensaje: ""});
  };

  //Recoge datos de login
  login = (req, res) => {
    let {email, password} = req.body;
    let sql = `SELECT * FROM movie_going WHERE email = "${email}"`;
    connection.query(sql, (error, resultEmail) => {
      if (error) throw error;
      if(resultEmail.length == 1){
        let hash = resultEmail[0].password;
        bcrypt.compare(password, hash, function(err, result) {
        if (err) throw err;
        if(result){
          res.redirect(`/vistaprincipal`);
        }else {
          res.render("login", {mensaje: "Contraseña incorrecta"});
        };
        });
      }else{
        res.render("login", {mensaje: "El email es incorrecto"});
      };
    });
  };


  //Hace la busqueda de cinefilo en el Navbar
  busqueda = (req, res) => {
    let {first_name} = req.body;
    let sql = `SELECT * FROM movie_going WHERE first_name LIKE "%${first_name}%"`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
      if(result.length >= 1){
        res.render("vistaprincipal", {result})
      }else{
        res.render("vistanueva");
      };
    });
  };





};



module.exports = new PrincipalController();