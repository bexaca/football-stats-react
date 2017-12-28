//REACT
import React from 'react';

//MOBX
import store from './Store'

//SUPER AGENT
import request from 'superagent';

//IMAGES
import placeholderTeam from '../../img/placeholder_team.png';

export const favoriteTeamRemove = () => (
    localStorage.removeItem("clubName"),
    localStorage.removeItem("logo"),
    localStorage.removeItem("competitionId"),
    localStorage.removeItem("clubName"),
    localStorage.removeItem("teamId"),
    localStorage.removeItem("teamPosition"),
    localStorage.removeItem("leagueName"),
    store.favoriteDel()
   );

export const favoriteTeamAdd = () => {
    localStorage.setItem("clubName", store.requestResponse.name);
    localStorage.setItem("logo", store.requestResponse.crestUrl);
    localStorage.setItem("teamId", store.requestResponse._links.self.href.split("teams/")[1]);
    localStorage.setItem("competitionId", store.competitionId);
    localStorage.setItem("teamPosition", store.teamPosition);
    localStorage.setItem("leagueName", store.leagueName);
    store.favoriteAdd(store.requestResponse.name, store.requestResponse.crestUrl, store.requestResponse._links.self.href.split("teams/")[1])
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
        console.log(store),
        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    store.requestResponseFunc(res.body)
                    store.teamName(res.body.name)
                    let imgUrl = res.body.crestUrl
                    let divStyle = null
                    if(imgUrl != null){
                        store.requestDivFunc(
                            divStyle = {
                                backgroundImage: `url(${imgUrl})`
                            }
                        )
                        
                    } else{
                        store.requestDivFunc(
                            divStyle = {
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