/*

  Script for initializing MongoDB database.
  First removes all sightings from database
  and then adds initial sightings.

*/



const mongoose = require('mongoose')
//Auto-increment plugin for incrementing id
const autoIncrement = require('mongoose-auto-increment')

database_name = 'tietokanta';
mongo_url = 'mongodb://localhost:27017/' + database_name;
var connection = mongoose.connect(mongo_url);

var SightingSchema = mongoose.Schema({
	id: Number,
	species: String,
	description: String,
	dateTime: Date,
	count: Number
});

autoIncrementOptions = {
  model:'Sighting',
  field:'id'
};
autoIncrement.initialize(connection);
SightingSchema.plugin(autoIncrement.plugin, autoIncrementOptions);


var SightingModel = mongoose.model("Sighting",SightingSchema);


//Initial sightings
const sightings = [
  {
    id: 1,
    species: 'gadwall',
    description: 'All your ducks are belong to us',
    dateTime: '2016-10-01T01:01:00Z',
    count: 1
  },
  {
    id: 2,
    species: 'lesser scaup',
    description: 'This is awesome',
    dateTime: '2016-12-13T12:05:00Z',
    count: 5
  },
  {
    id: 3,
    species: 'canvasback',
    description: '...',
    dateTime: '2016-11-30T23:59:00Z',
    count: 2
  },
  {
    id: 4,
    species: 'mallard',
    description: 'Getting tired',
    dateTime: '2016-11-29T00:00:00Z',
    count: 18
  },
  {
    id: 5,
    species: 'redhead',
    description: 'I think this one is called Alfred J.',
    dateTime: '2016-11-29T10:00:01Z',
    count: 1
  },
  {
    id: 6,
    species: 'redhead',
    description: 'If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck.',
    dateTime: '2016-12-01T13:59:00Z',
    count: 1
  },
  {
    id: 7,
    species: 'mallard',
    description: 'Too many ducks to be counted',
    dateTime: '2016-12-12T12:12:12Z',
    count: 100
  },
  {
    id: 8,
    species: 'canvasback',
    description: 'KWAAK!!!1',
    dateTime: '2016-12-11T01:01:00Z',
    count: 5
  }
];


function removeAllSightings(){
  SightingModel.remove( (err) => {
    if(err){
      console.log(err);
    }
    else{
      console.log('Sightings removed');
      setInitialSightings()
    }
  });
}

function insertSighting(sighting){
	var newSighting = new SightingModel(sighting);
	newSighting.save((err,res) =>{
		if(err){
			console.log(err.message);
		}
		else{
			console.log('Sighting created');
		}
	});
}


function setInitialSightings(){
	for (i in sightings){
		insertSighting(sightings[i]);
	}

}

removeAllSightings();

