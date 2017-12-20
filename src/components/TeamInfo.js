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
export class LeagueList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            response: null,
            clubName: null,
            crestUrl: null,
            nickName: null
        }
    }


    componentWillMount() {
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
    }

    render() {
        console.log(this.state.response)
        let imgUrl = this.state.crestUrl
        let divStyle = {
          backgroundImage: `url(${imgUrl})`
        };
        const response = this.state.response
        if (response != null) {
            return (
                    <div>
                        <span onClick={() => this.favoriteTeamAdd()}>Favorite</span>
                        <div className="image__block"
                             style={divStyle}>
                        </div>
                        <h2 className="text-center">{this.state.clubName} - {this.state.nickName}</h2>
                    </div>
            );
        }
        return (
            <div className="holder">
                <div className="preloader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        );
    }
}

export default LeagueList;