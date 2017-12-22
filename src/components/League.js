//REACT
import React from 'react';

//COMPONENTS
import LeagueTable from './LeagueTable.js';
import Fixtures from './Fixtures.js';

//MOBX
import store from './Store'

export class Leagues extends React.Component {

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
        console.log(this.props.router.location.key)
        return (
            <div key={this.props.router.location.key} className="container">
                <LeagueTable thisRoute={this.state.thisRoute} store={store}/>
                <Fixtures thisRoute={this.state.thisRoute} store={store}/>
            </div>
        );
    }

}

export default Leagues;
