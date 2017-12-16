import axios from 'axios';
import React, {Component} from 'react';
var moment = require('moment');
require('moment/locale/fi');



const backend_url = "http://localhost:8081/sightings";

const date_format = 'D.MM.YYYY, hh:mm:ss';



class GetDucks extends Component{

  constructor(props){
    super(props);
    this.state = {sightings: [], all_species: [] };
  }

  componentDidMount(){
    
    //Fetches all current sightings from server
    axios.get( backend_url )
      .then( response => {
        const sightings = response.data;
        this.setState({sightings});
      }
    );

  }

  render (){
    return(
      [
        //Mapping duck-sightings to rows of table
        // and each parameter of a sighting to a column
        this.state.sightings.map( sighting =>
          (
            <tr>
              <th>
                {sighting.count}
              </th>
              <th>
                {sighting.species}
              </th>
              <th className="Text-th">
                {sighting.description}
              </th>
              <th>
                {moment(sighting.dateTime).format( date_format )}
              </th>
            </tr>
          )
        )
      ]
    )
  }

}

export default GetDucks;