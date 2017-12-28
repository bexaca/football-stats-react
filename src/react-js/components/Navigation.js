//REACT
import React, {Component} from 'react';

//REACT ROUTER
import {Link} from 'react-router';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer class Navigation extends Component {

    hideNavigationOverlay() {
        document.getElementById("nav").checked = false;
    }

    render() {

        return (
            <nav>
                <input type="checkbox" id="nav" className="hidden"/>
                <label htmlFor="nav" className="nav-open">
                    <i></i>
                    <i></i>
                    <i></i>
                </label>
                <div className="nav-container">
                    <ul>
                        {
                            this.props.store.leaguesName.map((item, index) => (
                                <li key={`nav-${index}`}>
                                    <Link
                                        onClick={() => this.hideNavigationOverlay()}
                                        to={`/leagues/${this.props.store.leaguesId[index]}`}
                                        className="nav__link"
                                        activeClassName={"active-link"}>{this.props.store.leaguesName[index]}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </nav>
        );
        
    }
}

export default Navigation;
