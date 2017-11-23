import axios from 'axios';

import React,{Component} from 'react';

const post_address = 'http://localhost:8081/sightings';


/*
This React class could be just a function
function PostDuck( param = {'count': 4, 'species': 'mallard', 'description': 'asjdlajskdlj', 'sightingDate': currentDate} ){
  axios.post(
      post_address,
      //JSON
      { 
        'count': param['count'],
        'species': param['species'],
        'description': param['description'],
        'dateTime': param['sightingDate']
      }
    );
}*/

class PostDuck extends Component{

  constructor(props){
    super(props);
    this.state = { count: 4, species: 'mallard', description: 'asjdlajskdlj', sightingDate: Date() , 'data': {} };
  }

  componentDidMount(){
    axios.post(
      post_address,
      //JSON
      { 
      	'count': this.state.count,
      	'species': this.state.species,
      	'description': this.state.description,
      	'dateTime': this.state.sightingDate
      }
    )
    .then( (response) => {
    	const response_header = response.data.head;
    	this.setState('data': response_header);
    });
  }

  render(){
  	return null;
  }
}

export default PostDuck;

