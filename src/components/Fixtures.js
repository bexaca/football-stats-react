import React from 'react';

import request from 'superagent';

import moment from 'moment';


export class Fixtures extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            fixtures: [],
            count: null,
            date: []
        }
    }


    componentWillMount() {
        const url = `http://api.football-data.org/v1/competitions/${this.props.thisRoute}/fixtures?timeFrame=n7`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let date = [];
                    for(let i=0; i<res.body.count; i++){
                        date.push(res.body.fixtures[i].date);
                    }
                    this.setState({
                        response: res.body,
                        fixtures: res.body.fixtures,
                        count: res.body.count,
                        date: date
                    })
                }
            });
    }

    render() {
        console.log(this.state.response)
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
            let test = moment(d).format('dddd, MMMM Do YYYY');
            fixtureElements.push(
                <div key={`days-${j}`} className="col-md-12">
                    <h3>{test}</h3>
                </div>
            )
            for(let i=0; i<this.state.count; i++) {
                if(datesArr[j] === this.state.date[i].slice(0, 10))
                fixtureElements.push(
                    <div key={`games-${i}`} className="single__match__block col-md-12">
                        <div className="col-md-5">{this.state.fixtures[i].homeTeamName}</div>
                        <div className="col-md-2"><span>-</span></div>
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
            <div className="container">
                <h1 className="text-center">Fetching</h1>
            </div>
        );
    }
}

export default Fixtures;