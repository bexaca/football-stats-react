//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//COMPONENTS
import Preloader from './Preloader.js'

//IMAGES
import placeholder from '../images/placeholder.png';

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class LeagueList extends React.Component {

    state = {
        response: null,
        count: null,
        name: [],
        identification: [],
        ids: null,
        randArr: [],
        navList: null
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
                    for(let i=0; i<res.body.length; i++){
                        names.push(res.body[i].caption);
                        identifications.push(res.body[i].id);
                    }
                    let arr = []
                    while(arr.length < 3){
                        var randomnumber = Math.floor((Math.random() * res.body.length));
                        if(arr.indexOf(randomnumber) > -1) continue;
                        arr[arr.length] = randomnumber;
                    }
                    
                    let navListName = []
                    let navListId = []
                    for(let ar of arr){
                        navListName.push(res.body[ar].caption.split(' 201')[0])
                        navListId.push(res.body[ar].id)
                    }

                    this.setState({
                        response: res.body,
                        count: res.body.length,
                        name: names,
                        identification: identifications,
                        randArr: arr,
                        navList: navListId
                    })

                }
            });
    }


    currentMatch(i) {
        let match = this.state.response[i].currentMatchday;
        this.props.store.matchDay(match)
    }


    render() {
        console.log(this.state.navList)
        let leaguesElements = []
        for(let i = 0; i < this.state.count; i++) {
            leaguesElements.push(
                <div key={`league-${i}`} className="col-md-3">
                    <div className="league__block__single">
                        <Link onClick={() => this.currentMatch(i)} to={`/leagues/${this.state.identification[i]}`} activeClassName={"active-link"}>
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