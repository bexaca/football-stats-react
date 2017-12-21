//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class LeagueTable extends React.Component {
    
    state = {
        response: null,
        leagueName: null,
        leagueStanding: [],
        teamUrl: [],
        matchDay: null
    }
    
    componentDidMount() {
        const url = `http://api.football-data.org/v1/competitions/${this.props.thisRoute}/leagueTable`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let teamId = [];
                    for(let i=0; i<res.body.standing.length; i++){
                        teamId.push(res.body.standing[i]._links.team.href);
                    }
                    this.setState({
                        response: res.body,
                        leagueName: res.body.leagueCaption,
                        leagueStanding: res.body.standing,
                        teamUrl: teamId,
                        matchDay: res.body.matchday
                    })
                    console.log(this.props.store.match)
                    let match = res.body.matchday;
                    this.props.store.matchDay(match);
                }
            });
    }

    render() {
        
        let tableElements = []
        for(let i = 0; i < this.state.leagueStanding.length; i++) {
            let teamLink = this.state.teamUrl[i];
            let teamId = teamLink.split('teams/')[1];
            tableElements.push(
                <tr key={`table-${i}`} id="row">
                    <td className="pos">{this.state.leagueStanding[i].position}</td>
                    <td className="team">
                        <Link to={`/team/${teamId}`} activeClassName={"active-link"}>{this.state.leagueStanding[i].teamName}
                        </Link>
                    </td>
                    <td className="pts">{this.state.leagueStanding[i].points}</td>
                    <td className="p">{this.state.leagueStanding[i].playedGames}</td>
                    <td className="gs">{this.state.leagueStanding[i].goals}</td>
                    <td className="ga">{this.state.leagueStanding[i].goalsAgainst}</td>
                    <td className="gd">{this.state.leagueStanding[i].goalDifference}</td>
                </tr>


            );
        }
        const response = this.state.response
        if (response != null) {
            return (
                    <div className="row">
                        <h2 id="Heading" className="league">{this.state.leagueName}</h2>
                        <table className="table table-striped table-responsive timg" id="league-table">
                            <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Team</th>
                                <th>Pts</th>
                                <th>P</th>
                                <th>GS</th>
                                <th>GA</th>
                                <th>+/-</th>
                            </tr>
                            </thead>
                            <tbody id="container">
                            {tableElements}
                            </tbody>
                        </table>
                    </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default LeagueTable;