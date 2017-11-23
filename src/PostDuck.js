import axios from 'axios';

import React,{Component} from 'react';

const post_address = 'http://localhost:8081/sightings';


class PostDuck extends Component{

  constructor(props){
    super(props);
    this.state = {count: '4', species: 'mallard', description: 'asjdlajskdlj', sightingTime: Date(), 'data': {} };
  }

  componentDidMount(){
    axios.post(
      post_address,
      /*JSON*/
      { 
      	'count': this.state.count,
      	'species': this.state.species,
      	'description': this.state.description,
      	'dateTime': this.state.sightingTime
      }
    )
    .then( (response) => {
    	const response_header = response.data.head;
    	this.setState('data': response_header);
    });
  }

  render(){
  	return (
      <div></div>
  	);
  }
}

export default PostDuck;
