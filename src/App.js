import axios from 'axios';
import React, { Component } from 'react';
import logo from './duck.svg';
import './App.css';
import 'bootstrap';


const backend_url = "http://localhost:8081/sightings"


/*

Todo:
Post luokka
form

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
              <form method="post">
                <GetDucks/>
              </form>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

class GetDucks extends Component{

  constructor(props){
    super(props);

    this.state = { ducks: [] };
  }

  componentDidMount(){
    axios.get( backend_url )
      .then( response => {
        const ducks = response.data;
        this.setState({ducks});
      }
    );
  }

  render(){
    return(
      <div>
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
                    {duck.dateTime}
                  </th>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
    
  }
}

export default App;