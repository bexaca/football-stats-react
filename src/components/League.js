import React from 'react';

//COMPONENTS
import LeagueTable from './LeagueTable.js';
import Fixtures from './Fixtures.js';



export class Leagues extends React.Component {
    render() {
        return (
            <div className="container">
                <LeagueTable />
                <Fixtures />
            </div>
        );
    }
}

export default Leagues;
