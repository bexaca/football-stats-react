//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//COMPONENTS
import Preloader from './Preloader.js'

//IMAGES
import placeholder from '../../img/placeholder.png';

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer export class LeagueList extends React.Component {

    state = {
        response: null,
        count: null,
        name: [],
        identification: [],
        ids: null
    }

    componentDidMount() {
        const url = "http://api.football-data.org/v1/competitions";
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    let names = [];
                    let identifications = [];
                    let leaguesId = []
                    let leaguesName = []
                    let plId = null
                    let flId = null
                    let blId = null
                    let saId = null
                    let prId = null
                    let plName = null
                    let flName = null
                    let blName = null
                    let saName = null
                    let prName = null
                    for(let i=0; i<res.body.length; i++){
                        names.push(res.body[i].caption);
                        identifications.push(res.body[i].id);
                        if(res.body[i].league === "PL"){
                            plId = res.body[i].id
                            plName = res.body[i].caption.split(' 201')[0]
                            localStorage.setItem("leagueNamePl", plName)
                            localStorage.setItem("leagueIdPl", plId)
                        } else if(res.body[i].league === "FL1"){
                            flId = res.body[i].id
                            flName = res.body[i].caption.split(' 201')[0]
                            localStorage.setItem("leagueNameFl", flName)
                            localStorage.setItem("leagueIdFl", flId)
                        } else if(res.body[i].league === "BL1"){
                            blId = res.body[i].id
                            blName = res.body[i].caption.split(' 201')[0]
                            localStorage.setItem("leagueNameBl", blName)
                            localStorage.setItem("leagueIdBl", blId)
                        } else if(res.body[i].league === "SA"){
                            saId = res.body[i].id
                            saName = res.body[i].caption.split(' 201')[0]
                            localStorage.setItem("leagueNameSa", saName)
                            localStorage.setItem("leagueIdSa", saId)
                        } else if(res.body[i].league === "PD"){
                            prId = res.body[i].id
                            prName = res.body[i].caption.split(' 201')[0]
                            localStorage.setItem("leagueNamePr", prName)
                            localStorage.setItem("leagueIdPr", prId)
                        }
                    }
                    leaguesId.push(plId, flId, blId, saId, prId)
                    leaguesName.push(plName, flName, blName, saName, prName)
                    this.props.store.leaguesIdFunc(leaguesId)
                    this.props.store.leaguesNameFunc(leaguesName)
                    this.setState({
                        response: res.body,
                        count: res.body.length,
                        name: names,
                        identification: identifications,
                        prId: prId
                    })

                }
            });
    }

    render() {
        let leaguesElements = []
        for(let i = 0; i < this.state.count; i++) {
            leaguesElements.push(
                <div key={`league-${i}`} className="col-md-3">
                    <div className="league__block__single">
                        <Link to={`/leagues/${this.state.identification[i]}`} activeClassName={"active-link"}>
                            <img src={placeholder} alt="placeholder" />
                            <h6 className="text-center">{this.state.name[i]}</h6>
                        </Link>
                    </div>
                </div>
            );
        }
        const response = this.state.response
        if (response != null) {
            return (
                    <div className="row league__block">
                        <div className="col-md-12">
                            <h2>Choose a league</h2>
                        </div>
                        {leaguesElements}
                    </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default LeagueList;