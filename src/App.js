//REACT
import React from 'react';
import ReactDOM from 'react-dom';

//CSS
import './App.css';

//ROUTER
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

//COMPONENTS
import Root from './components/Root';
import Home from './components/Home';
import League from './components/League';
import Team from './components/Team';
import Player from './components/Player';

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
