//REACT
import React from 'react';

//MOBX
import store from './Store'

//SUPER AGENT
import request from 'superagent';

//MOMENT DATE
import moment from 'moment';

//IMAGES
import placeholderTeam from '../../img/placeholder_team.png';
import placeholderPlayer from '../../img/placeholder_player.png';

export const favoriteTeamRemove = () => {
    localStorage.removeItem("clubName");
    localStorage.removeItem("logo");
    localStorage.removeItem("competitionId");
    localStorage.removeItem("clubName");
    localStorage.removeItem("teamId");
    localStorage.removeItem("teamPosition");
    localStorage.removeItem("leagueName");
    store.favoriteDel();
}

export const favoriteTeamAdd = () => {
    store.favoriteAdd(store.teamInfoApiResponse.name, store.teamInfoApiResponse.crestUrl, store.teamInfoApiResponse._links.self.href.split("teams/")[1])
    localStorage.setItem("clubName", store.teamInfoApiResponse.name);
    localStorage.setItem("logo", store.teamInfoApiResponse.crestUrl);
    localStorage.setItem("teamId", store.teamInfoApiResponse._links.self.href.split("teams/")[1]);
    localStorage.setItem("competitionId", store.competitionId);
    localStorage.setItem("teamPosition", store.teamPosition);
    localStorage.setItem("leagueName", store.leagueName);
    let d = document.getElementById("favorite")
    d.className += " success";
    setTimeout(function(){ 
        d.className += " hide__button";
        setTimeout(function(){ 
            d.className += " no__button";
        }, 500);
    }, 1000);
}

export const teamInfoApiRequest = (url, token) => (
        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    store.teamInfoApiResponseFunc(res.body)
                    store.teamName(res.body.name)
                    let imgUrl = res.body.crestUrl
                    if(imgUrl != null){
                        store.requestDivStyleFunc(
                            {
                                backgroundImage: `url(${imgUrl})`
                            }
                        )
                        
                    } else{
                        store.requestDivStyleFunc(
                            {
                                backgroundImage: `url(${placeholderTeam})`
                            }
                        )
                    }
                    let clubNameLoSt = localStorage.getItem("clubName");
                    let clubNameThisClub = res.body.name
                    if (clubNameLoSt !== clubNameThisClub) {
                        store.requestButtonFunc(
                            <div key={"clubFav"} className="text-center">
                                <button id="favorite" className="btn btn-green btn-border-o" onClick={() => favoriteTeamAdd()}>Add Favorite</button>
                            </div>
                        )
                    }
                }
            })
)

export const singlePlayerApiRequest = (url, token, route) => {
    request
        .get(url)
        .set('X-Auth-Token', token)
        .set('accept', 'json')
        .then((res) => {
            store.playerPictureApiResponseFunc(res.body)
        })
        .then((res) =>{
            let playerId = route
            let apiKey = '4012828';
            const url = `http://www.thesportsdb.com/api/v1/json/${apiKey}/searchplayers.php?p=${store.playerPictureApiResponse.players[playerId].name.replace(' ', '%20')}`;
            request
                .get(url)
                .set('accept', 'json')
                .then((res) => {
                    store.playerPictureApi2ResponseFunc(res.body)
                    if(res.body.player !== null){
                        store.requestDivStyleFunc(
                            {
                                backgroundImage: `url(${(store.playerPictureApi2Response.player[0].strCutout !== null ? store.playerPictureApi2Response.player[0].strCutout : (store.playerPictureApi2Response.player[0].strThumb !== null ? store.playerPictureApi2Response.player[0].strThumb : placeholderPlayer))})`
                            }
                        )
                    } else{
                        store.requestDivStyleFunc(
                            {
                                backgroundImage: `url(${placeholderPlayer})`
                            }
                        )
                    }
                });
        })
}