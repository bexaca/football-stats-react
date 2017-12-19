//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//IMAGES
import placeholder from '../images/placeholder.png';

import {observer, inject} from 'mobx-react'
@inject('Store')
@observer
export class LeagueList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null,
            count: null,
            position: []
        }
    }


    componentWillMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}/players`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let position = [];
                    for(let i=0; i<res.body.count; i++){
                        position.push(res.body.players[i].position);
                    }
                    
                    this.setState({
                        response: res.body,
                        count: res.body.count,
                        position: position
                    })
                }
            });
    }


    render() {
        let keeperElements = []
        let defenceElements = []
        let midfieldElements = []
        let forwardElements = []
        console.log(this.props.thisRoute)
        for(let i=0; i<this.state.count; i++){
            if(this.state.position[i] === "Keeper"){
                keeperElements.push(
                        <div key={`gk-${i}`} className="col-md-3 col-sm-3">
                            <h4><Link to={`/team/${this.props.thisRoute}/player/${i}`}  activeClassName={"active-link"}>{this.state.response.players[i].name}</Link></h4>
                        </div>
                )
            } else if(this.state.position[i] === "Left-Back" || this.state.position[i] === "Centre-Back" || this.state.position[i] === "Right-Back"){
                defenceElements.push(
                        <div key={`lb-${i}`} className="col-md-3 col-sm-3">
                            <h4><Link to={`/team/${this.props.thisRoute}/player/${i}`}  activeClassName={"active-link"}>{this.state.response.players[i].name}</Link></h4>
                        </div>
                )
            }  else if(this.state.position[i] === "Defensive Midfield" || this.state.position[i] === "Central Midfield" || this.state.position[i] === "Left Midfield" || this.state.position[i] === "Right Midfield" || this.state.position[i] === "Attacking Midfield"){
                midfieldElements.push(
                        <div key={`dm-${i}`} className="col-md-3 col-sm-3">
                            <h4><Link to={`/team/${this.props.thisRoute}/player/${i}`}  activeClassName={"active-link"}>{this.state.response.players[i].name}</Link></h4>
                        </div>
                )
            } else if(this.state.position[i] === "Centre-Forward"  || this.state.position[i] === "Right Wing" || this.state.position[i] === "Left Wing"){
              forwardElements.push(
                        <div key={`cf-${i}`} className="col-md-3 col-sm-3">
                            <h4><Link to={`/team/${this.props.thisRoute}/player/${i}`} activeClassName={"active-link"}>{this.state.response.players[i].name}</Link></h4>
                        </div>
                )
            } 
        }
        const response = this.state.response
        if (response != null) {
            return (
                    <div>
                        <div className="row text-center">
                            <h4>Goalkeeper</h4>
                            {keeperElements}
                        </div>
                        <div className="row text-center">
                            <h4>Defence</h4>
                            {defenceElements}
                        </div>
                        <div className="row text-center">
                            <h4>Midfield</h4>
                            {midfieldElements}
                        </div>
                        <div className="row text-center">
                            <h4>Forward</h4>
                            {forwardElements}
                        </div>
                    </div>
            );
        }
        return (
            <div className="holder">
                <div className="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default LeagueList;