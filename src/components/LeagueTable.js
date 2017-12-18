import React from 'react';

import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

import {observer, inject} from 'mobx-react'
@inject('Store')
@observer
export class LeagueTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            leagueName: null,
            leagueStanding: []
        }
    }


    componentWillMount() {
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
                    let names = [];
                    let identifications = [];
                    for(let i=0; i<res.body.length; i++){
                        names.push(res.body[i].caption);
                        identifications.push(res.body[i].id);
                    }
                    this.setState({
                        response: res.body,
                        leagueName: res.body.leagueCaption,
                        leagueStanding: res.body.standing
                    })
                }
            });
    }

    render() {
        console.log(this.props.store.todo[1])
        let tableElements = []
        for(let i = 0; i < this.state.leagueStanding.length; i++) {
            tableElements.push(
                <tr key={`table-${i}`} id="row">
                    <td className="pos">{this.state.leagueStanding[i].position}</td>
                    <td className="team">{this.state.leagueStanding[i].teamName}</td>
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
                        <h3 id="matchday" className="md"></h3>
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
            <div className="container">
                <h1 className="text-center">Fetching</h1>
            </div>
        );
    }
}

export default LeagueTable;