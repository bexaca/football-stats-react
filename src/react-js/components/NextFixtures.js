//REACT
import React from 'react';

//SUPERAGENT
import request from 'superagent';

//MOMENT DATE
import moment from 'moment';

//COMPONENTS
import Preloader from './Preloader.js'

//SERVICES
import {nextFixturesApiRequest} from '../base/Services'

//MOBX
import {observer, inject} from 'mobx-react'

@inject('Store') @observer export class NextFixtures extends React.Component {

    componentDidMount() {
        const url = `http://api.football-data.org/v1/fixtures/`;
        const token = "3edb1bdd0041436ebc77c561b73e5e07";
        nextFixturesApiRequest(url, token, this.props.thisRoute)
    }

    render() {
        if (this.props.store.nextFixturesApiResponse != null) {
            if(this.props.store.nextFixturesApiResponse === 0){
                return (
                    <div className="row text-center">
                        <div className="col-md-12">
                            <h3>There are no fixtures today</h3>
                        </div>
                    </div>
                );
            }
            return (
                <div className="row text-center">
                    <div className="col-md-12">
                        <h3>Today Fixtures</h3>
                        <div className="fixtures__block">
                            {this.props.store.nextFixturesApiResponse}
                        </div>
                    </div>
                </div>
            );
        }
        return (<Preloader/>);
    }
}

export default NextFixtures;