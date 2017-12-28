//REACT
import React from 'react';

//COMPONENTS
import SinglePlayer from '../components/SinglePlayer.js';
import PlayerPicture from '../components/PlayerPicture.js';

//MOBX
import store from '../base/Store'

export class Team extends React.Component {

    state = {
            thisRoute: this.props.router.params.id
        }

    render() {
        return (
            <div className="container">
                <PlayerPicture thisRoute={this.state.thisRoute} store={store}/>
                {/* <SinglePlayer thisRoute={this.state.thisRoute} store={store}/> */}
            </div>
        );
    }


}

export default Team;
