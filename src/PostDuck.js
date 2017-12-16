import axios from 'axios';
import React,{Component} from 'react';

import './App.js';

import {DateTime} from 'react-datetime-bootstrap';

var moment = require('moment');
require('moment/locale/fi');


var SimpleReactValidator = require('simple-react-validator');

const backend_url = 'http://localhost:8081/sightings';

function SendDuck( count = 4, species = 'mallard', description = 'asjdlajskdlj', sightingDate= Date ){
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


class PostDuck extends Component{

  constructor(props){

    super();

    this.state = {count: '', species: 'mallard', description: '', sightingDate: Date()}

    //Validates the form
    this.validator = new SimpleReactValidator();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCount = this.setCount.bind(this);
    this.setSpecies = this.setSpecies.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setSightingDate = this.setSightingDate.bind(this);
  }

  handleSubmit = (e) =>{

    e.preventDefault();

    //Are all the fields of form valid?
    if ( this.validator.allValid()  ){

      //Posting a new duck sighting
      SendDuck( this.state.count, this.state.species, this.state.description, this.state.sightingDate );
      window.location.reload();
      /* Component version
      <PostDuck count={this.state.count} species={this.state.species} description={this.state.description} sightingDate={this.state.sightingDate}/> ;
      */
    }
    else{
      //Messages for fields that are no valid 
      this.validator.showMessages();
      //Reloading page to show the messages
      this.forceUpdate();

    }
  }


  setCount = (e) =>{
    e.preventDefault();
    this.setState({count: e.target.value});
  }

  setSpecies = (e) =>{
    e.preventDefault();
    this.setState({species: e.target.value});
  }

  setDescription = (e) =>{
    e.preventDefault();
    this.setState({description: e.target.value});
  }

  setSightingDate = (date) =>{
    this.setState({sightingDate: date});
  }

  render(){
    return(
      
      <form>
        <table className="table">
          <tbody>

            <tr>
              {/*Form fields for a new sighting*/}
              <th>
                {this.validator.message('count',this.state.count, 'required|integer|min:1') }
                <input type="text" name='count' className="Count"  onChange={this.setCount} />
              </th>

              <th>
                <select name="all_species" onChange={this.setSpecies} id="all_species">
                {
                  //Mallard is selected by default
                  this.props.all_species.map( species =>
                    species === 'mallard' ?
                    <option value={species.name} selected="selected">{species.name}</option> :
                    <option value={species.name} >{species.name}</option>
                              
                            )
                }
                </select>
              
              </th>
                        
              <th className="Text-th">
                { this.validator.message('description',this.state.description, 'required') }
                <input type="text" name='description' className="Description"  onChange={this.setDescription} />
              </th>

              <th>
                {/* this.validator.message('date',this.state.SightingDate, 'required') */}
                <DateTime onChange={this.setSightingDate}  placeholder={moment(this.state.sightingDate).format( this.props.date_format )} name='date' pickerOptions={{format: this.props.date_format, locale: 'fi' }} />
              </th>
                
            </tr>

          </tbody>
      </table>

      <input className="btn btn-primary" type="submit" value="Add" onClick={this.handleSubmit} />
    </form>
    );
  }
}


export default PostDuck;

