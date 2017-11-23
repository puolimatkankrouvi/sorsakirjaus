import axios from 'axios';
import React, { Component } from 'react';
import logo from './duck.svg';
import './App.css';

import {DateTime} from 'react-datetime-bootstrap';

import PostDuck from './PostDuck';

var SimpleReactValidator = require('simple-react-validator');

var moment = require('moment');
require('moment/locale/fi');

const backend_url = "http://localhost:8081/sightings";
const all_species_url = "http://localhost:8081/species";

const date_format = 'DoMM.YYYY, hh:mm:ss';


/*

Todo:

SightingDate siirtymään stateen ()

Splittaa DuckTable:n get omaksi luokakseen

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

    this.state = { ducks: [], all_species: [], count: '', species: '', description: '', sightingDate: Date };
    //

    this.validator = new SimpleReactValidator();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    axios.get( backend_url )
      .then( response => {
        const ducks = response.data;
        this.setState({ducks});
      }
    );

    axios.get( all_species_url)
      .then( response =>{
        const all_species = response.data;
        this.setState({all_species});
      }
    );
  }

  handleSubmit = (e) =>{
    e.preventDefault();

    console.log(this.state.sightingDate);

    if ( this.validator.allValid()  ){
      <PostDuck count={this.state.count} species={this.state.species} description={this.state.description} sightingDate={this.state.sightingDate}/> ;
    }
    else{
      this.validator.showMessages();
      
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
          <table class="table">
            <thead>
              <tr>
                <th>Määrä</th>
                <th>Laji</th>
                <th>Teksti</th>
                <th>Aika</th>
              </tr>
            </thead>

            <tbody>
              {
                this.state.ducks.map( duck =>
                  <tr>
                    <th>
                      {duck.count}
                    </th>
                    <th>
                      {duck.species}
                    </th>
                    <th>
                      {duck.description}
                    </th>
                    <th>
                      {moment(duck.dateTime).format(date_format)}
                    </th>
                  </tr>
                )
              }
                <tr>
                  <th>
                    {this.validator.message('count',this.state.count, 'required|integer|min:1') }
                    <input type="text" name='count' className="Count"  onChange={this.setCount} />
                  </th>
                  <th>
                    <select name="all_species" onChange={this.setSpecies} >
                    {
                      this.state.all_species.map( species =>
                        <option>{species.name}</option>
                      )
                    }
                    </select>
                  
                  </th>
                    <th>
                      { this.validator.message('description',this.state.description, 'required') }
                      <input type="text" name='description' className="Description"  onChange={this.setDescription} />
                    </th>
                  <th>
                    { this.validator.message('time',this.state.SightingDate, 'required') }
                    <DateTime onChange={this.setSightingDate}  name='time' />
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