import React from 'react';
import request from 'superagent';

export class Archives extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: null
        }
    }


    componentWillMount() {
        const url = "http://api.football-data.org/v1/teams/62/players";
        const token = "3edb1bdd0041436ebc77c561b73e5e07";

        request
            .get(url)
            .set('X-Auth-Token', token)
            .set('accept', 'json')
            .end((err, res) => {
                if (err || !res.ok) {
                    alert('Oh no! error');
                } else {
                    const responses = res.body;
                    this.setState({
                        response: responses
                    })
                }
            });
    }


    render() {
        const response = this.state.response;

        if (response != null) {
            console.log(this.state.response)
            return (
                <div className="container">
                    <h1 className="text-center">{response.players[2].name}</h1>
                </div>
            );
        }
        return (
            <div className="container">
                <h1 className="text-center"></h1>
            </div>
        );

    }
}

export default Archives;
