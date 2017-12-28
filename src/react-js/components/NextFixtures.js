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

@inject('Store') @observer export class NextFixtures extends React.Component {
    
    state = {
        response: null,
        fixtures: [],
        count: null,
        date: [],
        result: [],
        competitionId: null,
        responseTable: null,
        teamId: null,
        leagueName: null,
        nextFixtureElements: []
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
            let thisDate = new Date();
            let thisDateFormat = moment(thisDate).format('dddd, MMMM Do YYYY')
            let nextFixtureElements = []
            for(let i = 0; i < 10; i++){
                let gameDateFormat = moment(res.body.fixtures[i].date).format('dddd, MMMM Do YYYY')
                if(thisDateFormat === gameDateFormat && res.body.fixtures[i].status === "TIMED"){
                    nextFixtureElements.push(
                        <div key={`nextGames-${i}`} className="single__match__block col-md-12">
                            <div className="col-md-5">{res.body.fixtures[i].homeTeamName}</div>
                            <div className="col-md-2">
                                <span>{res.body.fixtures[i].result.goalsHomeTeam} - {res.body.fixtures[i].result.goalsAwayTeam}</span>
                            </div>
                            <div className="col-md-5">{res.body.fixtures[i].awayTeamName}</div>
                        </div>
                    );
                }
            }

            this.setState({
                response: res.body,
                fixtures: res.body.fixtures,
                count: res.body.count,
                date: date,
                result: result,
                nextFixtureElements: nextFixtureElements
            })
            this.props.store.competitionIdFunc(this.state.competitionId)
        })
    }

    render() {
        const response = this.state.response
        if (response != null) {
            if(this.state.nextFixtureElements.length === 0){
                return (
                    <div className="row text-center">
                        <div className="col-md-12">
                            <h3>There are no fixtures today</h3>
                            
                        </div>
                    </div>
                );
            }
            return (
                <div className="row text-center">
                    <div className="col-md-12">
                        <h3>Today Fixtures</h3>
                        <div className="fixtures__block">
                            {this.state.nextFixtureElements}
                        </div>
                    </div>
                </div>
            );
        }
        return (<Preloader/>);
    }
}

export default NextFixtures;