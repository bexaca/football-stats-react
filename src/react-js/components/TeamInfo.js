//REACT
import React from 'react';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'

//SERVICES
import {teamInfoApiRequest} from '../base/Services'

@inject('Store') @observer export class LeagueList extends React.Component {

    componentDidMount() {
        const url = `http://api.football-data.org/v1/teams/${this.props.thisRoute}`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        teamInfoApiRequest(url, token)
    }

    render() {
        const response = this.props.store.teamInfoApiResponse
        return (
            (response != null) ? 
            <div className="favourite__block team__info">
                {this.props.store.requestButton}
                <div className="image__block" style={this.props.store.requestDivStyle}></div>
                <h2 className="text-center" id="club__name">{this.props.store.teamInfoApiResponse.name}</h2>
            </div>
            :
            <Preloader/>
        );
    }
}

export default LeagueList;