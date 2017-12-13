import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from '../logo.svg';
import {Link} from 'react-router';
import Favicon from 'react-favicon';

class Layout extends Component {
  render() {
    return (
      <div className="container">
      <Favicon url="https://raw.githubusercontent.com/bexaca/football-stats-template-git/master/apple-icon-60x60.png" />
        <div className="row">
            <div className="col-md-12">
                {this.props.children}
                <Link to="archives">Archives</Link>
                <Link to="settings">Settings</Link>
                <Link to="/">Featured</Link>
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
