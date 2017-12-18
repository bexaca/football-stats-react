import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
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
                <Route path={"player/:id"} something="foo" component={Player} />
            </Route>
            <Route path={"home"} component={Home} />
        </Router>
    );
  }
}

//ReactDOM.render(
//    <App store={Store}/>,
//    document.getElementById('app')
//);

export default App;
