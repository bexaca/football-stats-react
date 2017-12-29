//REACT
import React from 'react';

//COMPONENTS
import PlayerPicture from '../components/PlayerPicture.js';

//MOBX
import store from '../base/Store'

export class Team extends React.Component {

    render() {
        return (
            <div className="container">
                <PlayerPicture store={store} thisRoute={this.props.router.params.id} />
            </div>
        );
    }

}

export default Team;
