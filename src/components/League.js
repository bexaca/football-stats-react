import React from 'react';

//SUPER AGENT
import request from 'superagent';


import LeagueTable from './LeagueTable.js';



export class Leagues extends React.Component {
    render() {
        const title = "NRAAAAO";
        return (
            <div>
                <LeagueTable title={title}/>
            </div>
        );
    }
}

export default Leagues;
