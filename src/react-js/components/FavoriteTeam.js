//REACT
import React from 'react';

//REACT ROUTER
import {Link} from 'react-router';

//SERVICES
import {favoriteTeamRemove} from '../base/Services'

//IMAGES
import placeholderTeam from '../../img/placeholder_team.png';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer export class FavoriteTeam extends React.Component {
    
    render() {
        const crestUrl = this.props.store.crestUrl
        const clubName = this.props.store.clubName
        const teamId = this.props.store.teamId
        const competitionId = localStorage.getItem("competitionId")
        const teamPosition = localStorage.getItem("teamPosition")
        const leagueName = localStorage.getItem("leagueName")
        const localStorageCrest = localStorage.getItem("logo")
        let divStyle = null;
        if (clubName != null) {
            if(localStorageCrest === "null"){
                divStyle = {
                    backgroundImage: `url(${placeholderTeam})`
                }
            } else{
                    divStyle = {
                        backgroundImage: `url(${crestUrl})`
                    }
            }
            return (
                <div className="row">
                    <div className="favourite__block col-md-12">
                        <button className="btn btn-red btn-border-o" onClick={() => favoriteTeamRemove()}>Remove Favorite</button>
                        <Link to={`/team/${teamId}`} activeClassName={"active-link"}>
                            <div className="image__block" style={divStyle}></div>
                            <h2>{clubName}</h2>
                        </Link>
                        <div className="col-md-12">
                            <div className="info__block">
                                <h4>League</h4>
                                <Link to={`/leagues/${competitionId}`} activeClassName={"active-link"}>
                                    {leagueName}
                                </Link>
                            </div>
                            <div className="info__block">
                                <h4>Team</h4>
                                <Link to={`/team/${teamId}`} activeClassName={"active-link"}>
                                    Team rooster and fixtures
                                </Link>
                            </div>
                            <div className="info__block">
                                <h4>Current table position</h4>
                                <span href="">{teamPosition}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            null
        );
    }
}

export default FavoriteTeam;