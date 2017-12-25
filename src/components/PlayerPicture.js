//REACT
import React from 'react';

//SUPER AGENT
import request from 'superagent';

//COMPONENTS
import Preloader from './Preloader.js'

//MOBX
import {observer, inject} from 'mobx-react'
@inject('Store')
@observer

export class PlayerPicture extends React.Component {
    state = {
            response: null,
        }

    componentDidMount() {
        const url = `http://c3420952.r52.cf0.rackcdn.com/playerbasicdata.xml`;

        request
            .get(url)
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


    render() {
        const response = this.state.response
        if (response != null) {
            return (
                    <div>
                        <div className="col-md-12 text-center">
                            <h4>Player name</h4>
                            
                            <h4>Date of birth</h4>
                            <h4>Nationality</h4>
                            <h4>Position</h4>
                            <h4>Number</h4>
                            <h4>Contract until</h4>
                        </div>
                    </div>
            );
        }
        return (
            <Preloader />
        );
    }
}

export default PlayerPicture;