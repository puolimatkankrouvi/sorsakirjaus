import axios from 'axios';
//import {Component} from 'react';




const backend_url = 'http://localhost:8081/sightings';

export function PostDuck( count = 4, species = 'mallard', description = 'asjdlajskdlj', sightingDate= Date ){
  //Sending a new sighting through POST
  axios.post(
      backend_url,
      //JSON
      { 
        'count': count,
        'species': species,
        'description': description,
        'dateTime': sightingDate
      }
    );
}
