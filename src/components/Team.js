//REACT
import React from 'react';

//COMPONENTS
import PlayerPosition from './PlayerPosition.js';
import TeamInfo from './TeamInfo.js';
import TeamFixtures from './TeamFixtures.js';
import TeamForm from './TeamForm.js';

//MOBX
import store from './Store'

export class Team extends React.Component {

    state = {
        thisRoute: this.props.router.params.id
    }

    render() {
        return (
            <div className="container">
                <TeamInfo thisRoute={this.state.thisRoute} store={store}/>
                <PlayerPosition thisRoute={this.state.thisRoute} store={store}/>
                <TeamFixtures thisRoute={this.state.thisRoute} store={store}/>
                <TeamForm thisRoute={this.state.thisRoute} store={store}/>
            </div>
        );
    }

}

export default Team;
