//REACT
import React from 'react';

//COMPONENTS
import SinglePlayer from '../components/SinglePlayer.js';
import PlayerPicture from '../components/PlayerPicture.js';

//MOBX
import store from '../base/Store'

export class Team extends React.Component {

    render() {
        return (
            <div className="container">
                <PlayerPicture thisRoute={this.props.router.params.id} store={store}/>
                {/* <SinglePlayer thisRoute={this.state.thisRoute} store={store}/> */}
            </div>
        );
    }

}

export default Team;
