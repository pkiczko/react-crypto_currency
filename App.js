import React, { Component } from 'react';
import Data from './Data';
import './App.css';

class App extends Component {
state = {
  dataArray: []
}

  render() {


    return (
      <div className="App">
      <Data />

      </div>
    );
  }
}

export default App;
