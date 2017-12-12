import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import {Link} from 'react-router';
//import {Button, Collapse, Well} from 'react-bootstrap';

class Layout extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
            <div className="col-md-12">
                {this.props.children}
                <Link to="archives">Archives</Link>
                <Link to="settings">Settings</Link>
                <Link to="/">Featured</Link>
              /*  <p className="App-intro">
                  This is a test, I just want to make sure that everything is working.
                </p> */
            </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
    <Layout />,
    document.getElementById('test')
);

export default Layout;
