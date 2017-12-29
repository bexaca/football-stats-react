//REACT
import React from 'react';

// //SUPER AGENT
// import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//SERVICES
import {singlePlayerApiRequest} from '../base/Services'

//MOMENT DATE
import moment from 'moment';

//IMAGES
import placeholderPlayer from '../../img/placeholder_player.png';

//MOBX
import {observer, inject} from 'mobx-react'
import { routerShape } from 'react-router/lib/PropTypes';

@inject('Store') @observer export class PlayerPicture extends React.Component {
  
    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute[0]}/players`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        singlePlayerApiRequest(url, token, this.props.thisRoute[1])
    }

    render() {
        if (this.props.store.playerPictureApi2Response != null) {
            return (
                <div className="player__info">
                    <div className="col-md-12 text-center">
                        <div className="image__block" style={this.props.store.requestDivStyle}></div>
                        <h4>Player name</h4>
                        <p>
                            <a target="_blank" href={`https://en.wikipedia.org/wiki/${this.props.store.playerPictureApiResponse.players[this.props.thisRoute[1]].name.replace(" ", "_")}`}>
                                {this.props.store.playerPictureApiResponse.players[this.props.thisRoute[1]].name}
                            </a>
                        </p>
                        <h4>Date of birth</h4>
                        <p>{moment(this.props.store.playerPictureApiResponse.players[this.props.thisRoute[1].dateOfBirth]).format('MMMM Do YYYY')}</p>
                        {
                            (this.props.store.playerPictureApi2Response.player[0].strBirthLocation !== "" && this.props.store.playerPictureApi2Response.player[0].strBirthLocation !== null) ?
                            <div className="info__block">
                                <h4>Birthplace</h4>
                                <p>{this.props.store.playerPictureApi2Response.player[0].strBirthLocation}</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        <h4>Nationality</h4>
                        <p>{this.props.store.playerPictureApiResponse.players[this.props.thisRoute[1]].nationality}</p>
                        <h4>Position</h4>
                        <p>{this.props.store.playerPictureApiResponse.players[this.props.thisRoute[1].position]}</p>
                        {
                            (this.props.store.playerPictureApi2Response.player[0].strHeight !== "" && this.props.store.playerPictureApi2Response.player[0].strHeight !== null) ?
                            <div className="info__block">
                                <h4>Height</h4>
                                <p>{this.props.store.playerPictureApi2Response.player[0].strHeight} m</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        {
                            (this.props.store.playerPictureApi2Response.player[0].strWeight !== "" && this.props.store.playerPictureApi2Response.player[0].strWeight !== null) ?
                            <div className="info__block">
                                <h4>Weight</h4>
                                <p>{Math.round(this.props.store.playerPictureApi2Response.player[0].strWeight)} kg</p>
                            </div>    
                            :
                            <div></div>                        
                        }
                        {
                            (this.props.store.playerPictureApi2Response.player[0].dateSigned !== null) ? 
                            <div className="info__block">
                                <h4>Contract signed</h4>
                                <p>{moment(this.props.store.playerPictureApi2Response.player[0].dateSigned).format('MMMM Do YYYY')}</p>
                            </div> 
                            : 
                            <div></div>
                        }
                         {
                            (this.props.store.playerPictureApi2Response.player[0].strSigning !== null && this.props.store.playerPictureApi2Response.player[0].strSigning !== "") ? 
                            <div className="info__block">
                                <h4>Transfer fee</h4>
                                <p>{this.props.store.playerPictureApi2Response.player[0].strSigning}</p>
                            </div> 
                            : 
                            <div></div>
                        }
                        {
                            (this.props.store.playerPictureApi2Response.player[0].strDescriptionEN !== null) ? 
                                <div className="info__block">
                                    <h4>Bio</h4>
                                    <p>{this.props.store.playerPictureApi2Response.player[0].strDescriptionEN}</p>
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