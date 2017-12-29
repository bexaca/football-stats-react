//REACT
import React from 'react';

//COMPONENTS
import LeagueTable from '../components/LeagueTable.js';
import Fixtures from '../components/Fixtures.js';

//MOBX
import store from '../base/Store'

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
        return (
            <div className="container">
                <LeagueTable thisRoute={this.state.thisRoute} store={store} from={"league"}/>
                <Fixtures thisRoute={this.state.thisRoute} store={store}/>
            </div>
        );
    }

}

export default Leagues;
