/*
* Incluimos las dependencias que se usaran (imports).
* 	- Express para crear el servidor y realizar llamadas a HTTP.
* 	- Body-parser para parsear archivos JSON.
* 	- Method-override para implementar y personalizar metodos HTTP.
* 	- Mongoose   
*/
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost:27017/gasolineras', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});


// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./modelo/Gasolinera')(app, mongoose);
var gasCtrl = require('./controllers/Gas');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("API REST");
});
app.use(router);

// API routes
var gas = express.Router();

gas.route('/gasolineras')
  .get(gasCtrl.findAllGas)
  .post(gasCtrl.addGas);

gas.route('/gasolineras/:id')
  .get(gasCtrl.findById)
  .put(gasCtrl.updateGas)
  .delete(gasCtrl.deleteGas);

app.use('/api', gas);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
