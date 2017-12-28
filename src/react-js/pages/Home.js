//REACT
import React from 'react';

//COMPONENTS
import LeagueList from '../components/LeagueList.js';
import FavoriteTeam from '../components/FavoriteTeam.js';
import NextFixtures from '../components/NextFixtures.js';

//MOBX
import store from '../base/Store'

export class Home extends React.Component {

    state = {
            thisRoute: this.props.router.params.id
    }

    render() {
        return (
            <div className="container">
                <FavoriteTeam thisRoute={this.state.thisRoute} store={store}/>
                <LeagueList thisRoute={this.state.thisRoute} store={store}/>
                <NextFixtures thisRoute={this.state.thisRoute} store={store}/>
            </div>
            
        );
    }
}

export default Home;
