//REACT
import React from 'react';

//COMPONENTS
import PlayerPosition from '../components/PlayerPosition.js';
import TeamInfo from '../components/TeamInfo.js';
import TeamFixtures from '../components/TeamFixtures.js';
import TeamForm from '../components/TeamForm.js';
import LeagueTable from '../components/LeagueTable.js';

//MOBX
import store from '../base/Store'

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
            <div className="container">
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
