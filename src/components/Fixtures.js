//REACT
import React from 'react';

//SUPERAGENT
import request from 'superagent';

//MOMENT DATE
import moment from 'moment';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class Fixtures extends React.Component {
    state = {
            response: null,
            fixtures: [],
            count: null,
            date: [],
            result: [],
            matchDay: null
        }

    componentDidMount() {
        const urlTable = `http://api.football-data.org/v1/competitions/${this.props.thisRoute}/leagueTable`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        request
        .get(urlTable)
        .set('X-Auth-Token', token)
        .set('accept', 'json')
        .then((res) => {
            this.setState({
                matchDay: res.body.matchday
            })
        })
        .then((res) => {
            const urlFixture = `http://api.football-data.org/v1/competitions/${this.props.thisRoute}/fixtures?matchday=${this.state.matchDay}`;
                request
                    .get(urlFixture)
                    .set('X-Auth-Token', token)
                    .set('accept', 'json')
                    .end((err, res) => {
                        if (err || !res.ok) {
                            alert('Oh no! error');
                        } else {
                            let date = [];
                            let result = [];
                            for(let i=0; i<res.body.count; i++){
                                date.push(res.body.fixtures[i].date);
                                result.push(res.body.fixtures[i].result);
                            }
                            this.setState({
                                response: res.body,
                                fixtures: res.body.fixtures,
                                count: res.body.count,
                                date: date,
                                result: result
                            })
                        }
                    });
            })
          }

    render() {
        console.log(this.props.store.leaguesId)
        let fixtureElements = []
        let dates = new Set()
        let datesArr = []
        for (let i=0; i<this.state.count; i++){
            dates.add(this.state.date[i].slice(0, 10))
        }
        for(const date of dates){
            datesArr.push(date)
        }
        for(let j=0; j<datesArr.length; j++){
            let d = datesArr[j];
            let date = moment(d).format('dddd, MMMM Do YYYY');
            fixtureElements.push(
                <div key={`days-${j}`} className="col-md-12">
                    <h3>{date}</h3>
                </div>
            )
            for(let i=0; i<this.state.count; i++) {
                if(datesArr[j] === this.state.date[i].slice(0, 10))
                fixtureElements.push(
                    <div key={`games-${i}`} className="single__match__block col-md-12">
                        <div className="col-md-5">{this.state.fixtures[i].homeTeamName}</div>
                        <div className="col-md-2"><span>{this.state.result[i].goalsHomeTeam} - {this.state.result[i].goalsAwayTeam}</span></div>
                        <div className="col-md-5">{this.state.fixtures[i].awayTeamName}</div>
                    </div>

                );
            }
        }
        const response = this.state.response
        if (response != null) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <div className="fixtures__block">
                            {fixtureElements}
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default Fixtures;