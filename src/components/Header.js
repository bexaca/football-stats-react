import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router';
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
                    <Link to={"/home"} activeClassName={"active-link"}>Home</Link>
                    <Link to={"/leagues/" + 5}  activeClassName={"active-link"}>Premier League</Link>
                    <Link to={"/leagues/" + 7}  activeClassName={"active-link"}>Primera</Link>
                    <Link to={"/team/" + 6}  activeClassName={"active-link"}>Team</Link>
                    <Link to={"/player/" + 6}  activeClassName={"active-link"}>Players</Link>
                </nav>
            </header>
        );
    }
}

export default Header;