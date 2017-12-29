//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer export class TeamForm extends React.Component {
    
    state = {
            response: null,
            fixtures: [],
            count: null,
            status: []
        }


    componentDidMount() {
        this.props.store.formResetFunc()
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}/fixtures`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let status = [];
                    for(let i=0; i<res.body.count; i++){
                        if(res.body.fixtures[i].status === "FINISHED"){
                            status.push(res.body.fixtures[i]);
                        }
                    }
                    this.setState({
                        response: res.body,
                        fixtures: res.body.fixtures,
                        count: res.body.count,
                        status: status
                    })
                }
            });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.thisRoute !== this.props.thisRoute) {
            this.props.store.formResetFunc()
            const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}/fixtures`;
            const token = "3edb1bdd0041436ebc77c561b73e5e07";
    
            request
                .get(url)
                .set('X-Auth-Token', token)
                .set('accept', 'json')
                .end((err, res) => {
                    if (err || !res.ok) {
                        alert('Oh no! error');
                    } else {
                        let status = [];
                        for(let i=0; i<res.body.count; i++){
                            if(res.body.fixtures[i].status === "FINISHED"){
                                status.push(res.body.fixtures[i]);
                            }
                        }
                        this.setState({
                            response: res.body,
                            fixtures: res.body.fixtures,
                            count: res.body.count,
                            status: status
                        })
                    }
                });
        }
      }
    
    formLess() {
        this.props.store.formLessFunc()
    }
    formMore() {
        this.props.store.formMoreFunc()
    }
    
    render() {
        let formElements = []
        let formCount = this.props.store.formCount
        let teamName = this.props.store.name
        this.props.store.formMaxFunc(this.state.status.length)
        for(let i=0; i<this.state.status.length; i++){
            if(this.state.status[i].result.goalsHomeTeam > this.state.status[i].result.goalsAwayTeam && this.state.status[i].homeTeamName === teamName){
                formElements.push(
                        <span key={`form-${i}`} className="form__win">w</span>
                )
            } else if(this.state.status[i].result.goalsHomeTeam < this.state.status[i].result.goalsAwayTeam && this.state.status[i].awayTeamName === teamName){
                     formElements.push(
                            <span key={`form-${i}`} className="form__win">w</span>
                    )
            } else if (this.state.status[i].result.goalsHomeTeam === this.state.status[i].result.goalsAwayTeam){
                 formElements.push(
                        <span key={`form-${i}`} className="form__draw">d</span>
                )
            }
            else{
                 formElements.push(
                        <span key={`form-${i}`} className="form__loose">l</span>
                )
            }
        }
        const response = this.state.response
        if (response != null) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <h3>Form<span className="form__less" onClick={() => this.formLess()}>-</span><span className="form__more" onClick={() => this.formMore()}>+</span></h3>
                        <div className="form__block text-center">
                            {formElements.slice(Math.max(formElements.length - formCount, 1))}
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

export default TeamForm;