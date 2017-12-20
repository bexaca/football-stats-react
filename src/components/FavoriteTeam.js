//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//IMAGES
import placeholder from '../images/placeholder.png';

import {observer, inject} from 'mobx-react'
@inject('Store')
@observer
export class FavoriteTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null
        }
    }


    componentWillMount() {
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
                    this.setState({
                        response: res.body
                    })
                }
            });
    }
    
    favoriteTeamRemove() {
            localStorage.clear();
    }

    render() {
        const response = this.state.response
        const crestUrl = localStorage.getItem("logo");
        const clubName = localStorage.getItem("clubName");
        const teamId = localStorage.getItem("teamId");
        let divStyle = {
          backgroundImage: `url(${crestUrl})`
        };
        if (crestUrl != null) {
            return (
                    <div className="row">
                        <div className="favourite__block col-md-12">
                            <span onClick={() => this.favoriteTeamRemove()}>remove favorite</span>
                            <div className="image__block"
                                 style={divStyle}>
                            </div>
                            <h2>{clubName}</h2>
                            <div className="col-md-12">
                                <div className="info__block">
                                    <h4>League</h4>
                                    <a href="#">League link here</a>
                                </div>
                                <div className="info__block">
                                    <h4>Team</h4>
                                    <Link to={`/team/${teamId}`} activeClassName={"active-link"}>
                                        Team link here
                                    </Link>
                                </div>
                                <div className="info__block">
                                    <h4>Current table position</h4>
                                    <a href="#">2</a>
                                </div>
                            </div>
                        </div>
                    </div>
            );
        }
        return (
            <div>
                
            </div>
        );
    }
}

export default FavoriteTeam;