const mongoose = require('mongoose')
//Auto-increment plugin for incrementing id
const autoIncrement = require('mongodb-autoincrement')


database_name = 'tietokanta';
mongo_url = 'mongodb://localhost:27017/' + database_name;
autoIncrementOptions = {'field':'id'};
mongoose.plugin(autoIncrement.mongoosePlugin, autoIncrementOptions);
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


//Selects all sightins from database with empty query in execute-method
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

//Inserts a new signting to database
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
