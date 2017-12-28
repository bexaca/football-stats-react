//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//IMAGES
import placeholderTeam from '../../img/placeholder_team.png';

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class LeagueList extends React.Component {

    state = {
        response: null,
        clubName: null,
        crestUrl: null,
        nickName: null
    }

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    this.setState({
                        response: res.body, 
                        clubName: res.body.name, 
                        crestUrl: res.body.crestUrl, 
                        nickName: res.body.shortName
                    })
                    this.props.store.teamName(res.body.name)
                }
            });
    }

    favoriteTeamAdd() {
        localStorage.setItem("clubName", this.state.clubName);
        localStorage.setItem("logo", this.state.crestUrl);
        localStorage.setItem("teamId", this.props.thisRoute);
        localStorage.setItem("competitionId", this.props.store.competitionId);
        localStorage.setItem("teamPosition", this.props.store.teamPosition);
        localStorage.setItem("leagueName", this.props.store.leagueName);
        this.props.store.favoriteAdd(this.state.clubName, this.state.crestUrl, this.props.thisRoute)
        let d = document.getElementById("favorite")
        d.className += " success";
        setTimeout(function(){ 
            d.className += " hide__button";
            setTimeout(function(){ 
                d.className += " no__button";
            }, 500);
        }, 1000);
    }

    render() {
        let imgUrl = this.state.crestUrl
        let divStyle = null
        if(imgUrl != null){
            divStyle = {
                backgroundImage: `url(${imgUrl})`
            };
        } else{
            divStyle = {
                backgroundImage: `url(${placeholderTeam})`
            };
        }
        let clubNameLoSt = localStorage.getItem("clubName");
        let clubNameThisClub = this.state.clubName
        let clubFavButton = []
        if (clubNameLoSt !== clubNameThisClub) {
            clubFavButton.push(
                <div key={"clubFav"} className="text-center">
                    <button id="favorite" className="btn btn-green btn-border-o" onClick={() => this.favoriteTeamAdd()}>Add Favorite</button>
                </div>
            )
        }
        const response = this.state.response
        if (response != null) {
            return (
                <div className="favourite__block team__info">
                    {clubFavButton}
                    <div className="image__block" style={divStyle}></div>
                    <h2 className="text-center" id="club__name">{this.state.clubName}</h2>
                </div>
            );
        }
        return (<Preloader/>);
    }
}

export default LeagueList;