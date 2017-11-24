import axios from 'axios';
import React, { Component } from 'react';
import logo from './duck.svg';
import './App.css';

import {DateTime} from 'react-datetime-bootstrap';

import {PostDuck} from './PostDuck';
import GetDucks from './GetDucks'

var SimpleReactValidator = require('simple-react-validator');




// mallard, redhead, gadwall, canvasback, lesser scaup
const all_species_url = "http://localhost:8081/species";

const date_format = 'D.MM.YYYY, hh:mm:ss';


/*

Todo:

SightingDate siirtymään stateen tai validoitumaan oikein

Havaintojen järjestäminen laskevaan tai nousevaan järjestykseen ajan mukaan
Datatable?

*/

class App extends Component {

  

  render() {
    return (
      <div className="App">
        <div class="container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Sorsakirjaus</h1>
          </header>
      
          <div class="row">
            <div class="col-md-12">
                          
              <DuckTable/>
 
            </div>
          </div>

        </div>

      </div>
    );
  }
}

class DuckTable extends Component{

  constructor(props){
    super(props);

    this.state = { all_species: [], count: '', species: 'mallard', description: '', sightingDate: Date };

    //Validates the form
    this.validator = new SimpleReactValidator();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.setCount = this.setCount.bind(this);
    this.setSpecies = this.setSpecies.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setSightingDate = this.setSightingDate.bind(this);
  }

  componentDidMount(){

    // all species: mallard, redhead, gadwall, canvasback, lesser scaup
    axios.get( all_species_url)
      .then( response =>{
        const all_species = response.data;
        this.setState({all_species});
      }
    );
  }

  handleSubmit = (e) =>{

    e.preventDefault();

    //Are all the fields of form valid?
    if ( this.validator.allValid()  ){

      //Posting a new duck sighting
      PostDuck( this.state.count, this.state.species, this.state.description, this.state.sightingDate );
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
      <div>
        <form>
          <table class="table sortable">
            <thead>
              <tr>
                <th className="Header-th">Määrä</th>
                <th className="Header-th">Laji</th>
                <th className="Header-th">Teksti</th>
                <th className="Header-th">Aika</th>
              </tr>
            </thead>

            <tbody>
              
              {/*Fetches all current sightings from server here*/}
              <GetDucks all_species={this.state.all_species} dateFormat={date_format} />


              {/*Form fields for a new sighting*/}
              <tr>

                <th>
                  {this.validator.message('count',this.state.count, 'required|integer|min:1') }
                  <input type="text" name='count' className="Count"  onChange={this.setCount} />
                </th>

                <th>
                  <select name="all_species" onChange={this.setSpecies} id="all_species">
                  {
                    //Mallard is selected by default
                    this.state.all_species.map( species =>
                      species === 'mallard' ?
                        <option value={species.name} selected="selected">{species.name}</option> :
                          <option value={species.name} >{species.name}</option>
                      
                    )
                  }
                  </select>
                </th>
                
                <th>
                  { this.validator.message('description',this.state.description, 'required') }
                    <input type="text" name='description' className="Description"  onChange={this.setDescription} />
                </th>

                <th>
                  {/* this.validator.message('date',this.state.SightingDate, 'required') */}
                  <DateTime onChange={this.setSightingDate}  name='date' pickerOptions={{format: date_format, locale: 'fi' }} />
                </th>

                <th>
                  <input className="btn btn-primary" type="submit" value="Add" onClick={this.handleSubmit} />
                </th>
              </tr>

            </tbody>
          </table>
        </form>
 
        
      </div>
    );
    
  }
}



export default App;