//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//REACT ROUTER
import {Link} from 'react-router';

//REACT ROUTER
import {observer} from 'mobx-react';

//IMAGES
import placeholder from '../images/placeholder.png';



export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            count: null,
            name: [],
            identification: [],
            ids: null
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
                    let names = [];
                    let identifications = [];
                    for(let i=0; i<res.body.length; i++){
                        names.push(res.body[i].caption);
                        identifications.push(res.body[i].id);
                    }
                    this.setState({
                        response: res.body,
                        count: res.body.length,
                        name: names,
                        identification: identifications
                    })
                }
            });
    }


    
   
   
    render() {
        let leaguesElements = []
        let leaguesElementsTest = new Map();
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
                <div className="container">
                    <div className="row league__block">
                        <div className="col-md-12">
                            <h2>Choose a league</h2>
                        </div>
                        {leaguesElements}
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <h1 className="text-center">Fetching</h1>
            </div>
        );
    }
}

export default Home;