import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Root from './components/Root';
import Home from './components/Home';
import League from './components/League';
import Team from './components/Team';
import Player from './components/Player';
import Archives from './components/Archives';


class App extends React.Component {
  render() {
    return (
        <Router history={browserHistory}>
            <Route path={"/"} component={Root}>
                <IndexRoute component={Home}></IndexRoute>
                <Route path={"home"} component={Home} />
                <Route path={"leagues/:id"} component={League} />
                <Route path={"team/:id"} component={Team} />
                <Route path={"player/:id"} component={Player} />
                <Route path={"archives/:id"} component={Archives} />
            </Route>
            <Route path={"home"} component={Home} />
        </Router>
    );
  }
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);

//ReactDOM.render(
//    <Router history={hashHistory}>
//        <Route path="/" component={Layout}>
//            <IndexRoute component={Featured}></IndexRoute>
//            <Route path="archives" component={Archives}></Route>
//            <Route path="settings" component={Settings}></Route>
//        </Route>
//    </Router>,
//    document.getElementById('test')
//);

//export default App;
