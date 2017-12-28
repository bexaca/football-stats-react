//REACT
import React from 'react';

//COMPONENTS
import LeagueList from '../components/LeagueList.js';
import FavoriteTeam from '../components/FavoriteTeam.js';
import NextFixtures from '../components/NextFixtures.js';

//MOBX
import store from '../base/Store'

export class Home extends React.Component {

    render() {
        return (
            <div className="container">
                <FavoriteTeam thisRoute={this.props.router.params.id} store={store}/>
                <LeagueList thisRoute={this.props.router.params.id} store={store}/>
                <NextFixtures thisRoute={this.props.router.params.id} store={store}/>
            </div>
        );
    }
    
}

export default Home;
