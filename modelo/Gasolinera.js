/*
* Añadimos mongoose para utlizar MongoDB.
*/
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var gasolineraSchema = new Schema({
	nombre: { type: String },
	direccion: { type: String },
	precioGasolina95: { type: Number },
	precioDiesel: { type: Number}
});

module.exports = mongoose.model('Gasolinera', gasolineraSchema);
