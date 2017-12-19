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
        console.log(this.state.response)
        let keeperElements = []
        let leftBackElements = []
        let centreBackElements = []
        let rightBackElements = []
        let defensiveMidfieldElements = []
        let centralMidfieldElements = []
        let leftMidfieldElements = []
        let rightMidfieldElements = []
        let leftWingElements = []
        let rightWingElements = []
        let atackingMidfieldElements = []
        let centreForwardElements = []
        for(let i=0; i<this.state.count; i++){
            if(this.state.position[i] === "Keeper"){
                keeperElements.push(
                        <div key={`gk-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Left-Back"){
                leftBackElements.push(
                        <div key={`lb-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Centre-Back"){
                centreBackElements.push(
                        <div key={`cb-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Right-Back"){
                rightBackElements.push(
                        <div key={`rb-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Defensive Midfield"){
                defensiveMidfieldElements.push(
                        <div key={`dm-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Central Midfield"){
                centralMidfieldElements.push(
                        <div key={`cm-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Left Midfield"){
               leftMidfieldElements.push(
                        <div key={`lm-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Right Midfield"){
               rightMidfieldElements.push(
                        <div key={`rm-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Left Wing"){
              leftWingElements.push(
                        <div key={`lw-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Right Wing"){
              rightWingElements.push(
                        <div key={`rw-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Attacking Midfield"){
              atackingMidfieldElements.push(
                        <div key={`am-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } else if(this.state.position[i] === "Centre-Forward"){
              centreForwardElements.push(
                        <div key={`cf-${i}`} className="col-md-3">
                            <h4>{this.state.response.players[i].name}</h4>
                            <h5>Date of birth: {this.state.response.players[i].dateOfBirth}</h5>
                            <h5>Nationality: {this.state.response.players[i].nationality}</h5>
                            <h5>Contract until: {this.state.response.players[i].contractUntil}</h5>
                            <h5>Number: {this.state.response.players[i].jerseyNumber}</h5>
                        </div>
                )
            } 
        }
        const response = this.state.response
        if (response != null) {
            return (
                    <div>
                        <div className="col-md-12">
                            <h4>Goalkeepers</h4>
                            {keeperElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Left Back</h4>
                            {leftBackElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Centre Back</h4>
                            {centreBackElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Right Back</h4>
                            {rightBackElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Defensive Midfield</h4>
                            {defensiveMidfieldElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Central Midfield</h4>
                            {centralMidfieldElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Left Midfield</h4>
                            {leftMidfieldElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Right Midfield</h4>
                            {rightMidfieldElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Left Wing</h4>
                            {leftWingElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Right Wing</h4>
                            {rightWingElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Attacking Midfield</h4>
                            {atackingMidfieldElements}
                        </div>
                        <div className="col-md-12">
                            <h4>Centre Forward</h4>
                            {centreForwardElements}
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