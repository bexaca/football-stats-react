//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//MOMENT DATE
import moment from 'moment';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class TeamFixtures extends React.Component {
    state = {
        response: null,
        fixtures: [],
        count: null,
        date: [],
        result: [],
        competitionId: null,
        responseTable: null,
        teamId: null,
        leagueName: null
    }

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}/fixtures`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .then((res) => {
                let date = [];
                let result = [];
                for (let i = 0; i < res.body.count; i++) {
                    date.push(res.body.fixtures[i].date);
                    result.push(res.body.fixtures[i].result);
                }
                this.setState({
                    response: res.body,
                    fixtures: res.body.fixtures,
                    count: res.body.count,
                    date: date,
                    result: result,
                    competitionId: res.body.fixtures[0]._links.competition.href.split('competitions/')[1],
                    teamId: res.body._links.team.href.split('teams/')[1]
                })
                this.props.store.competitionIdFunc(this.state.competitionId)
            })
            .then((res) => {
                const leagueTableUrl = `http://api.football-data.org/v1/competitions/${this.state.competitionId}/leagueTable`;
                request
                    .get(leagueTableUrl)
                    .set('X-Auth-Token', token)
                    .set('accept', 'json')
                    .end((err, res) => {
                        if (err || !res.ok) {
                            alert('Oh no! error');
                        } else {
                            for (let i = 0; i < res.body.standing.length; i++) {
                                if (res.body.standing[i]._links.team.href.split('teams/')[1] === this.state.teamId) {
                                    this.props.store.teamPositionFunc(res.body.standing[i].position)
                                }
                            }
                            this.setState({
                                responseTable: res.body, 
                                leagueName: res.body.leagueCaption
                            })
                            this.props.store.leagueNameFunc(this.state.leagueName)
                        }
                    });
            })
    }

    render() {
        let nextFixtureElements = []
        let pastFixtureElements = []
        let dates = new Set()
        let datesArr = []
        for (let i = 0; i < this.state.count; i++) {
            dates.add(this.state.date[i].slice(0, 10))
        }
        for (const date of dates) {
            datesArr.push(date)
        }
        for (let j = 0; j < datesArr.length; j++) {
            let d = datesArr[j];
            let date = moment(d).format('dddd, MMMM Do YYYY');
            for (let i = 0; i < this.state.count; i++) {
                if (datesArr[j] === this.state.date[i].slice(0, 10)) {
                    if (this.state.fixtures[i].status === "FINISHED") {
                        pastFixtureElements.push(
                            <div key={`past-games-${i}`}>
                                <div className="col-md-12">
                                    <span>{date}</span>
                                </div>
                                <div className="single__match__block row">
                                    <div className="col-xs-5">{this.state.fixtures[i].homeTeamName}</div>
                                    <div className="col-xs-2">
                                        <span>{this.state.result[i].goalsHomeTeam} - {this.state.result[i].goalsAwayTeam}</span>
                                    </div>
                                    <div className="col-xs-5">{this.state.fixtures[i].awayTeamName}</div>
                                </div>
                            </div>
                        );
                    } else if (this.state.fixtures[i].status === "SCHEDULED" || this.state.fixtures[i].status === "TIMED") {
                        nextFixtureElements.push(
                            <div key={`next-games-${i}`}>
                                <div className="col-md-12">
                                    <span>{date}</span>
                                </div>
                                <div className="single__match__block row">
                                    <div className="col-xs-5">{this.state.fixtures[i].homeTeamName}</div>
                                    <div className="col-xs-2">
                                        <span>{this.state.result[i].goalsHomeTeam} - {this.state.result[i].goalsAwayTeam}</span>
                                    </div>
                                    <div className="col-xs-5">{this.state.fixtures[i].awayTeamName}</div>
                                </div>
                            </div>
                        );
                    }
                }
            }
        }

        let pastThreeGames = []
        pastThreeGames.push(
            pastFixtureElements[pastFixtureElements.length-3],
            pastFixtureElements[pastFixtureElements.length-2],
            pastFixtureElements[pastFixtureElements.length-1]
        )

        let nextTwoGames = []
        nextTwoGames.push(
            nextFixtureElements[0],
            nextFixtureElements[1]
        )

        const response = this.state.response
        if (response != null) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Fixtures</h3>
                        <div className="fixtures__block">
                            {pastThreeGames}
                            {nextTwoGames}
                        </div>
                    </div>
                </div>
            );
        }
        return (<Preloader/>);
    }
}

export default TeamFixtures;