import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
//import {Button, Collapse, Well} from 'react-bootstrap';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Settings from './components/Settings'
import Layout from './components/Layout'
import Archives from './components/Archives'
import Featured from './components/Featured'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={Featured}></IndexRoute>
            <Route path="archives" component={Archives}></Route>
            <Route path="settings" component={Settings}></Route>
        </Route>
    </Router>,
    document.getElementById('test')
);

export default App;
