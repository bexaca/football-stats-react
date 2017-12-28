//REACT
import React from 'react';

//REACT ROUTER
import {Link} from 'react-router';

//IMAGES
import logo from '../../logo.svg';

//FAVICON
import Favicon from 'react-favicon';
import favico from '../../favicon.png';

//COMPONENTS
import Navigation from '../components/Navigation.js'

//MOBX
import store from '../base/Store'

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
                <Navigation store={store} />
            </header>
        );
    }
}

export default Header;