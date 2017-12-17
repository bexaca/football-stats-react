import React from 'react';

//COMPONENTS
import LeagueTable from './LeagueTable.js';
import Fixtures from './Fixtures.js';



export class Leagues extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            thisRoute: this.props.router.params.id
        }
    }





    render() {
        return (
            <div className="container">
                <LeagueTable thisRoute={this.state.thisRoute}/>
                <Fixtures thisRoute={this.state.thisRoute}/>
            </div>
        );
    }


}

export default Leagues;
