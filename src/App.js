import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import League from './components/League';
import Team from './components/Team';
import Player from './components/Player';
import store from './components/Store';


class App extends React.Component {
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
