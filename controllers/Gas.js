var mongoose = require('mongoose');
var Gasolinera  = mongoose.model('Gasolinera');

//GET - Return all gasolineras in the DB
exports.findAllGas = function(req, res) {
	Gasolinera.find(function(err, gasolineras) {
    if(err) res.send(500, err.message);

    console.log('GET /gasolineras')
		res.status(200).jsonp(gasolineras);
	});
};

//GET - Return a Gasolinera with specified ID
exports.findById = function(req, res) {
	Gasolinera.findById(req.params.id, function(err, gasolinera) {
    if(err) return res.send(500, err.message);

    console.log('GET /gasolineras/' + req.params.id);
		res.status(200).jsonp(gasolinera);
	});
};

//POST - Insert a new Gasolinera in the DB
exports.addGas = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var gasolinera = new Gasolinera({
		nombre:    req.body.title,
		direccion: 	  req.body.year,
		precioGasolina95:  req.body.country,
		precioDiesel:   req.body.poster,
	});

	gasolinera.save(function(err, gasolinera) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(gasolinera);
	});
};

//PUT - Update a register already exists
exports.updateGas = function(req, res) {
	Gasolinera.findById(req.params.id, function(err, gasolinera) {
		gasolinera.nombre   = req.body.petId;
		gasolinera.direccion = req.body.direccion;
		gasolinera.precioGasolina95 = req.body.precioGasolina95;
		gasolinera.precioDiesel  = req.body.precioDiesel;

		gasolinera.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(gasolinera);
		});
	});
};

//DELETE - Delete a Gasolinera with specified ID
exports.deleteGas = function(req, res) {
	Gasolinera.findById(req.params.id, function(err, gasolinera) {
		gasolinera.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};