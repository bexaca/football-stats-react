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
@inject('Store')
@observer

export class PlayerPicture extends React.Component {
    state = {
            response: null,
            playerName: null,
            playerDesc: null,
            playerImg: null,
            playerBirth: null,
            playerContSt: null,
            playerHeight: null,
            playerWeight: null,
            playerNation: null,
            playerName: null,
            playerPosit: null,
            playerPrice: null,
            playerTeam: null,
            playerWage: null
        }

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute[0]}/players`;

        request
                .get(url)
                .set('accept', 'json')
                .then((res) => {
                    let playerId = this.props.thisRoute[1]
                    this.setState({
                        playerName: res.body.players[playerId].name.replace(' ', '%20')
                    })
                })
                .then((res) =>{
                    const url = `http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${this.state.playerName}`;
                    request
                        .get(url)
                        .set('accept', 'json')
                        .then((res) => {
                                this.setState({
                                    response: res.body,
                                    playerDesc: res.body.player[0].strDescriptionEN,
                                    playerImg: res.body.player[0].strCutout,
                                    playerBirth: res.body.player[0].dateBorn,
                                    playerContSt: res.body.player[0].dateSigned,
                                    playerHeight: res.body.player[0].strHeight,
                                    playerWeight: res.body.player[0].strWeight,
                                    playerNation: res.body.player[0].strNationality,
                                    playerName: res.body.player[0].strPlayer,
                                    playerPosit: res.body.player[0].strPosition,
                                    playerPrice: res.body.player[0].strSigning,
                                    playerTeam: res.body.player[0].strTeam,
                                    playerWage: res.body.player[0].strWage
                                })
                        });
                })
    }


    render() {
        console.log(this.state.response)
        const response = this.state.response
        let divStyle = {
            backgroundImage: `url(${this.state.playerImg})`
        };
        if (response != null) {
            return (
                <div>
                    <div className="col-md-12 text-center">
                    <div className="image__block" style={divStyle}></div>
                        <h4>Player name</h4>
                        <p>
                            <a target="_blank" href={`https://en.wikipedia.org/wiki/${this.state.playerName.replace(" ", "_")}`}>
                                {this.state.playerName}
                            </a>
                        </p>
                        <h4>Bio</h4>
                        <p>{this.state.playerDescg}</p>
                        <h4>Date of birth</h4>
                        <p>{moment(this.state.playerBirth).format('MMMM Do YYYY')}</p>
                        <h4>Nationality</h4>
                        <p>{this.state.playerNation}</p>
                        <h4>Position</h4>
                        <p>{this.state.playerPosit}</p>
                        <h4>Height</h4>
                        <p>{this.state.playerHeight}</p>
                        <h4>Weight</h4>
                        <p>{this.state.playerWeight}</p>
                        <h4>Contract signed</h4>
                        <p>{moment(this.state.playerContSt).format('MMMM Do YYYY')}</p>
                        <h4>Transfer fee</h4>
                        <p>{this.state.playerPrice}</p>
                    </div>
                </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default PlayerPicture;