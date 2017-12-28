//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//MOMENT DATE
import moment from 'moment';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer export class SinglePlayer extends React.Component {
    
    state = {
            response: null,
            playerId: null,
            players: []
        }

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute[0]}/players`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let players = []
                    for(let i=0; i<res.body.count; i++){
                        players.push(res.body.players[i]);
                    }
                    
                    this.setState({
                        response: res.body,
                        playerId: this.props.thisRoute[1],
                        players: players
                    })
                }
            });
    }


    render() {
        const playerNum = this.props.thisRoute[1]
        const response = this.state.response
        if (response != null) {
            return (
                    <div>
                        <div className="col-md-12 text-center">
                            <h4>Player name</h4>
                            <p>
                                <a target="_blank" href={`https://en.wikipedia.org/wiki/${this.state.players[playerNum].name.replace(" ", "_")}`}>
                                    {this.state.players[playerNum].name}
                                </a>
                            </p>
                            <h4>Date of birth</h4>
                            <p>{moment(this.state.players[playerNum].dateOfBirth).format('MMMM Do YYYY')}</p>
                            <h4>Nationality</h4>
                            <p>{this.state.players[playerNum].nationality}</p>
                            <h4>Position</h4>
                            <p>{this.state.players[playerNum].position}</p>
                            <h4>Number</h4>
                            <p>{this.state.players[playerNum].jerseyNumber}</p>
                            <h4>Contract until</h4>
                            <p>{moment(this.state.players[playerNum].contractUntil).format('MMMM Do YYYY')}</p>
                        </div>
                    </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default SinglePlayer;