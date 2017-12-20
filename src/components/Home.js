import React from 'react';

//COMPONENTS
import LeagueList from './LeagueList.js';
import FavoriteTeam from './FavoriteTeam.js';

import store from './Store'


export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            thisRoute: this.props.router.params.id
        }
    }

    render() {
        return (
            <div className="container">
                <FavoriteTeam thisRoute={this.state.thisRoute} store={store}/>
                <LeagueList thisRoute={this.state.thisRoute} store={store}/>
            </div>
        );
    }


}

export default Home;
