//REACT
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//REACT ROUTER
import {Link} from 'react-router';

//FAVICON
import Favicon from 'react-favicon';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: null
        }
    }
    
  render() {
    return (
        <nav>
            <Favicon url="https://raw.githubusercontent.com/bexaca/football-stats-template-git/master/apple-icon-60x60.png" />
            <Link to="archives">Archives</Link>
            <Link to="settings">Settings</Link>
            <Link to="/">Featured</Link>
            {this.props.children}
        </nav>
    );
  }
}

export default Navigation;
