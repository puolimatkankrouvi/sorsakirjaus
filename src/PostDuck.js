import axios from 'axios';
//import {Component} from 'react';




const backend_url = 'http://localhost:8081/sightings';



/*class PostDuck extends Component{

  constructor(props){
    super(props);
    this.state = { count: 4, species: 'mallard', description: 'asjdlajskdlj', sightingDate: Date()};
  }

  componentDidMount(){
    //Sending a new sighting through POST
    axios.post(
      backend_url,
      //JSON
      { 
      	'count': this.state.count,
      	'species': this.state.species,
      	'description': this.state.description,
      	'dateTime': this.state.sightingDate
      }
    )
    .then( (response) => {
    	
    });
  }

  render(){
  	return null;
  }
}

export default PostDuck;*/


//The above React class could be just a simple javascript function:

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
