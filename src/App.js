import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import {Button, Collapse, Well} from 'react-bootstrap';

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


class Example extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.setState({ open: !this.state.open })}>
          click
        </Button>
        <Collapse in={this.state.open}>
          <div>
            <Well>
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
              Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </Well>
          </div>
        </Collapse>
      </div>
    );
  }
}

ReactDOM.render(
    <Example />,
    document.getElementById('test')
);

export default App;
