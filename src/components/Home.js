//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';


export class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            response: null,
            count: null
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
                        response: res.body,
                        count: res.body.length
                    })
                }
            });
    }
    
    render() {
        console.log(this.state.response)
        console.log(this.state.count)
        const response = this.state.response
          if (response != null) {
            return (
                <div className="container">
                    <div className="row league__block">
                        <div className="col-md-12">
                            <h2>Choose league</h2>
                        </div>
                        <div className="col-md-3">
                            <div className="league__block__single">
                                <a href="#">
                                    <img src="http://e0.365dm.com/16/08/1-1/40/pl-logo-blog-premier-league_3758341.jpg?20160805124844" alt="" />
                                </a>
                            </div>
                        </div>
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