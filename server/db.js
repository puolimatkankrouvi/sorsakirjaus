const mongoose = require('mongoose')



database_name = 'tietokanta';
mongo_url = 'mongodb://localhost:27017/' + database_name;
mongoose.connect(mongo_url);




var SightingSchema = mongoose.Schema({
	id: String,
	species: String,
	description: String,
	dateTime: Date,
	count: Number
});

//model.bind?
var SightingModel = mongoose.model("Sighting",SightingSchema);


var selectSightings = function(){
	//Lean option of find makes result an javascript object, before executing the query
	// How to remove versionKey field (__v) from result?
	sightings = SightingModel.find().lean().exec( (err,result) => {
		if(err){
			console.log(err);
		}
		else{
			sightings = JSON.stringify(result);
			//console.log(sightings);
			return sightings;
		}
	});

	return sightings;
;}

//Sighting s comes in JSON-format
var insertSighting =  function(s){
	var newSighting = new SightingModel(s);
	newSighting.save((err,res) =>{
		if(err){
			console.log(err.message);
		}
	});
}


//Exporting these functions outside
module.exports = {
	selectSightings,insertSighting
}
