import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
//import {Button, Collapse, Well} from 'react-bootstrap';
import Settings from './components/Settings'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


const test = (
    <div className="container">
        <h1>Nrao</h1>
    </div>
)

ReactDOM.render(
    test,
    document.getElementById('test')
);

export default App;
