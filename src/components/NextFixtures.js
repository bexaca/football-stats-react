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

export class NextFixtures extends React.Component {
    
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
        const url = `http://api.football-data.org/v1/fixtures/`;
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
            })
            this.props.store.competitionIdFunc(this.state.competitionId)
        })
    }

    render() {
        console.log(this.state.response)
        let fixtureElements = []
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
            fixtureElements.push(
                <div key={`days-${j}`} className="col-md-12">
                    <span>{date}</span>
                </div>
            )
            for (let i = 0; i < 10; i++) {
                if (datesArr[j] === this.state.date[i].slice(0, 10)) 
                    fixtureElements.push(
                        <div key={`games-${i}`} className="single__match__block row">
                            <div className="col-xs-5">{this.state.fixtures[i].homeTeamName}</div>
                            <div className="col-xs-2">
                                <span>{this.state.result[i].goalsHomeTeam} - {this.state.result[i].goalsAwayTeam}</span>
                            </div>
                            <div className="col-xs-5">{this.state.fixtures[i].awayTeamName}</div>
                        </div>

                    );
                }
            }
        const response = this.state.response
        if (response != null) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Fixtures</h3>
                        <div className="fixtures__block">
                            {fixtureElements}
                        </div>
                    </div>
                </div>
            );
        }
        return (<Preloader/>);
    }
        
}

export default NextFixtures;