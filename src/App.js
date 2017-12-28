//REACT
import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import './App.css';

//ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//COMPONENTS
import Root from './react-js/Root';
import Home from './react-js/pages/Home';
import League from './react-js/pages/League';
import Team from './react-js/pages/Team';
import Player from './react-js/pages/Player';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer class App extends React.Component {

  render() {
    return (
        <Router history={browserHistory}>
            <Route path={"/"} component={Root}>
                <IndexRoute component={Home}></IndexRoute>
                <Route path={"home"} component={Home} />
                <Route path={"leagues/:id"} component={League} />
                <Route path={"team/:id"} component={Team} />
                <Route path={"team/:id/player/:id"} component={Player} />
            </Route>
            <Route path={"home"} component={Home} />
        </Router>
    );
  }
  
}

export default App;
