const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://nutriauser:nutriapass@localhost:5432/nutriadb");
const app = express();
const corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}

app.use(bodyParser.json());
app.use(cors(corsOptions));



start();

function start() {
  app.listen(8000, () => {

    app.route('/api/usuarios').get(async (req, res) => {
      let data = await obtenerUsuarios();
      res.send( {data});
    });

    app.route('/api/usuario/:id').get( async (req, res) => {
      const id = req.params['id'];
      let usuario = await obtenerUsuario(id);
      res.send({usuario});
    });

    app.route('/api/usuario/nombre/:nombre').get( async (req, res) => {
      const nombre = req.params.nombre;
      console.log(nombre); 
      let usuario = await obtenerUsuarioNombre(nombre);
      res.send({usuario});
      
    });
    app.route('/api/cats').post((req, res) => {
      res.send(201, req.body);
    });

    app.route('/api/cats/:name').put((req, res) => {
      res.send(200, req.body);
    });


    app.route('/api/cats/:name').delete((req, res) => {
      res.sendStatus(204);
    });


  });
}

async function obtenerUsuarios() {
  let data = null;
  await db.one("SELECT * FROM public.usuarios")
    .then(function (usuarios) {
      data = usuarios;

    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
  return data;
}

async function obtenerUsuario(id) {
  let data = null;
  await db.one("SELECT * FROM public.usuarios WHERE id = $1",id)
    .then(function (usuario) {
      data = usuario;

    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
  return data;
}

async function obtenerUsuarioNombre(nombre) {
  let data = null;
  await db.one("SELECT * FROM public.usuarios WHERE nombre like '%$1#%' ",nombre)
    .then(function (usuario) {
      data = usuario;
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
  return data;
}


