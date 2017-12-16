import axios from 'axios';
import React, {Component} from 'react';
import './App.js';


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


      //Mapping duck-sightings to rows of table
      // and each parameter of a sighting to a column
      

      <table className="table">
        <thead>
          <tr>
            <th>Määrä</th>
            <th>Laji</th>
            <th className="Text-th">Teksti</th>
            <th>Aika</th>
          </tr>
        </thead>

        <tbody>
              
        
        {
          this.state.sightings.map( (sighting,i) =>
          {
            return(
              <tr key={sighting.id} >
                <th key="count" >
                {sighting.count}
                </th>
                <th key="species" >
                  {sighting.species}
                </th>
                <th className="Text-th" key="description">
                  {sighting.description}
                </th>
                <th key="datetime" >
                  {moment(sighting.dateTime).format( date_format )}
                </th>
              </tr>
            );
            
          }
        )
      }

        </tbody>
      </table>
      
    )
  }

}

export default GetDucks;