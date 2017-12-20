//REACT
import React from 'react';

//REACT ROUTER
import {Link} from 'react-router';

//IMAGES
import logo from '../logo.svg';

//FAVICON
import Favicon from 'react-favicon';
import favico from '../favicon.png'

export class Header extends React.Component {
    
    render() {
        return (
            <header>
                <Favicon url={favico} />
                <div className="header__logo">
                    <Link to={"/home"}>
                        <img src={logo} alt="logo"/>
                    </Link>
                </div>
                <nav>
                  <input type="checkbox" id="nav" className="hidden"/>
                  <label htmlFor="nav" className="nav-open"><i></i><i></i><i></i></label>
                  <div className="nav-container">
                    <ul>
                      <li><Link to={`/leagues/445`}  activeClassName={"active-link"}>Premier League</Link></li>
                      <li><Link to={`/leagues/450`}  activeClassName={"active-link"}>Ligue 1</Link></li>
                      <li><Link to={`/leagues/452`}  activeClassName={"active-link"}>Bundesliga</Link></li>
                      <li><Link to={`/leagues/456`}  activeClassName={"active-link"}>Seria A</Link></li>
                      <li><Link to={`/leagues/457`}  activeClassName={"active-link"}>Primeira Liga</Link></li>
                    </ul>
                  </div>
                </nav>
            </header>
        );
    }
}

export default Header;