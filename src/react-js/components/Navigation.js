//REACT
import React, {Component} from 'react';

//REACT ROUTER
import {Link} from 'react-router';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store')
@observer class Navigation extends Component {

    hideNavigationOverlay() {
        document.getElementById("nav").checked = false;
    }

    render() {
        let navigationElements = []
        for (let i = 0; i < this.props.store.leaguesName.length; i++) {
            navigationElements.push(
                <li key={`nav-${i}`}>
                    <Link
                        onClick={() => this.hideNavigationOverlay()}
                        to={`/leagues/${this.props.store.leaguesId[i]}`}
                        className="nav__link"
                        activeClassName={"active-link"}>{this.props.store.leaguesName[i]}</Link>
                </li>
            )
        }
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
                        {navigationElements}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navigation;
