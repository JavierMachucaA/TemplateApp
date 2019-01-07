var express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://nutriauser:nutriapass@localhost:5432/nutriadb");

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }
  
  

const app = express();

app.use(bodyParser.json());
app.use(cors(corsOptions))

start();




async function start(){
	app.listen(8000, () => {
	
    app.route('/api/usuarios').get( async (req, res) => {
		let data = null;
			await db.one("SELECT * FROM public.usuarios")
			.then(function (usuarios) {
				console.log(usuarios);
				data = usuarios;
			})
			.catch(function (error) {
				console.log("ERROR:", error);
			});
			res.send({data});
    });

    app.route('/api/cats/:name').get((req, res) => {
        const requestedCatName = req.params['name'];
        res.send({ name: requestedCatName });
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
  
  

  