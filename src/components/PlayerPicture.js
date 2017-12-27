//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//MOMENT DATE
import moment from 'moment';

//IMAGES
import placeholderPlayer from '../images/placeholder_player.png';

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
            playerPosit: null,
            playerPrice: null,
            playerTeam: null,
            playerWage: null,
            playerNameS: null,
            response1: null,
            responseName: null,
            playersNumber: null,
            playerThumb: null,
            playerBirthLoc: null
        }

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute[0]}/players`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
                .get(url)
                .set('X-Auth-Token', token)
                .set('accept', 'json')
                .then((res) => {
                    let playerId = this.props.thisRoute[1]
                    this.setState({
                        playerNameS: res.body.players[playerId].name.replace(' ', '%20'),
                        playerName: res.body.players[playerId].name,
                        playerBirth: res.body.players[playerId].dateOfBirth,
                        playerNumber: res.body.players[playerId].jerseyNumber,
                        playerNation: res.body.players[playerId].nationality,
                        playerPosit: res.body.players[playerId].position,
                        playerContLen: res.body.players[playerId].contractUntil,
                        response1: res.body,
                    })
                })
                .then((res) =>{
                    let apiKey = '4012828';
                    const url = `http://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${this.state.playerNameS}`;
                    request
                        .get(url)
                        .set('accept', 'json')
                        .then((res) => {
                            this.setState({
                                response: res.body,
                                responseName: res.body.player,
                            })
                            if(this.state.responseName !== null){
                                this.setState({
                                    playerDesc: res.body.player[0].strDescriptionEN,
                                    playerImg: res.body.player[0].strCutout,
                                    playerContSt: res.body.player[0].dateSigned,
                                    playerHeight: res.body.player[0].strHeight,
                                    playerWeight: res.body.player[0].strWeight,
                                    playerPrice: res.body.player[0].strSigning,
                                    playerTeam: res.body.player[0].strTeam,
                                    playerWage: res.body.player[0].strWage,
                                    playerThumb: res.body.player[0].strThumb,
                                    playerBirthLoc: res.body.player[0].strBirthLocation
                                })
                            } 
                        });
                })
    }


    render() {
        console.log(this.state.response)
        console.log(this.state.response1)
        const response = this.state.response
        let divStyle = {
            backgroundImage: `url(${(this.state.playerImg !== null ? this.state.playerImg : (this.state.playerThumb !== null ? this.state.playerThumb: placeholderPlayer))})`
        };
        if (response != null) {
            return (
                <div className="player__info">
                    <div className="col-md-12 text-center">
                        <div className="image__block" style={divStyle}></div>
                        <h4>Player name</h4>
                        <p>
                            <a target="_blank" href={`https://en.wikipedia.org/wiki/${this.state.playerName.replace(" ", "_")}`}>
                                {this.state.playerName}
                            </a>
                        </p>
                        <h4>Date of birth</h4>
                        <p>{moment(this.state.playerBirth).format('MMMM Do YYYY')}</p>
                        {
                            (this.state.playerBirthLoc !== "" && this.state.playerBirthLoc !== null) ?
                            <div className="info__block">
                                <h4>Birthplace</h4>
                                <p>{this.state.playerBirthLoc}</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        <h4>Nationality</h4>
                        <p>{this.state.playerNation}</p>
                        <h4>Position</h4>
                        <p>{this.state.playerPosit}</p>
                        {
                            (this.state.playerHeight !== "" && this.state.playerHeight !== null) ?
                            <div className="info__block">
                                <h4>Height</h4>
                                <p>{this.state.playerHeight} m</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        {
                            (this.state.playerWeight !== "" && this.state.playerWeight !== null) ?
                            <div className="info__block">
                                <h4>Weight</h4>
                                <p>{Math.round(this.state.playerWeight)} kg</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        {
                            (this.state.playerContSt !== null) ? 
                            <div className="info__block">
                                <h4>Contract signed</h4>
                                <p>{moment(this.state.playerContSt).format('MMMM Do YYYY')}</p>
                            </div> 
                            : 
                            <div></div>
                        }
                         {
                            (this.state.playerPrice !== null && this.state.playerPrice !== "") ? 
                            <div className="info__block">
                                <h4>Transfer fee</h4>
                                <p>{this.state.playerPrice}</p>
                            </div> 
                            : 
                            <div></div>
                        }
                        {
                            (this.state.playerDesc !== null) ? 
                                <div className="info__block">
                                    <h4>Bio</h4>
                                    <p>{this.state.playerDesc}</p>
                                </div>
                                :
                                <div></div>
                        }
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