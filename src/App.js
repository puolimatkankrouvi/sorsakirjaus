import axios from 'axios';
import React, { Component } from 'react';
import logo from './duck.svg';
import './App.css';

import PostDuck from './PostDuck';
import GetDucks from './GetDucks'






// mallard, redhead, gadwall, canvasback, lesser scaup
const all_species_url = "http://localhost:8081/species";

const date_format = 'D.MM.YYYY, hh:mm:ss';


/*

Todo:

Havaintojen järjestäminen laskevaan tai nousevaan järjestykseen ajan mukaan
Datatable?

*/

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Sorsakirjaus</h1>
          </header>
      
          <div className="row">
            <div className="col-md-12">
                          
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
    /*Initial values are set for species and sightingDate for such case that their form fields are not touched by user*/
    this.state = { all_species: [], count: '', species: 'mallard', description: '', sightingDate: Date(), formPosted: "NOT POSTED" };


  }

  formPosted(){
  	this.setState({formPosted: "YES"});
  }

  componentDidMount(){

    // all species: mallard, redhead, gadwall, canvasback, lesser scaup
    axios.get( all_species_url)
      .then( response =>{
        const all_species = response.data;
        this.setState({all_species});
        console.log(all_species);
      }
    );
  }




  render(){

    return(
      <div>

        {/*Fetches all current sightings from server here*/}
        <GetDucks all_species={this.state.all_species} dateFormat={date_format}  />    

        

        {/*Post a duck form*/}
        <PostDuck 
        		all_species={this.state.all_species}
        		dateFormat={date_format} count={this.state.species}
        		species={this.state.species} description={this.state.description}
        		sightingDate={this.state.sightingDate}
        		/>


            
 
        
      </div>
    );
    
  }
}



export default App;