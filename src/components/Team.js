//REACT
import React from 'react';

//COMPONENTS
import PlayerPosition from './PlayerPosition.js';
import TeamInfo from './TeamInfo.js';
import TeamFixtures from './TeamFixtures.js';
import TeamForm from './TeamForm.js';
import LeagueTable from './LeagueTable.js';

//MOBX
import store from './Store'

export class Team extends React.Component {

    state = {
        thisRoute: this.props.router.params.id
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            thisRoute: this.props.router.params.id
        })
        return true;
    }

    render() {
        return (
            <div className="container" key={this.props.router.location.key}>
                <TeamInfo thisRoute={this.state.thisRoute} store={store}/>
                <PlayerPosition thisRoute={this.state.thisRoute} store={store}/>
                <TeamFixtures thisRoute={this.state.thisRoute} store={store}/>
                <TeamForm thisRoute={this.state.thisRoute} store={store}/>
                <LeagueTable thisRoute={this.state.thisRoute} store={store} from={"team"}/>
            </div>
        );
    }
}

export default Team;
