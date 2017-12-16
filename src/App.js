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

SightingDate siirtymään stateen tai validoitumaan oikein

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
    this.state = { all_species: [] };


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
        <form>
          <table className="table">
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

          		{/*Last rows post a duck*/}
              <PostDuck all_species={this.state.all_species} dateFormat={date_format} />


            </tbody>
          </table>
        </form>
 
        
      </div>
    );
    
  }
}



export default App;