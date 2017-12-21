//REACT
import React from 'react';

//COMPONENTS
import SinglePlayer from './SinglePlayer.js';

//MOBX
import store from './Store'

export class Team extends React.Component {

    state = {
            thisRoute: this.props.router.params.id
        }

    render() {
        return (
            <div className="container">
                <SinglePlayer thisRoute={this.state.thisRoute} store={store}/>
            </div>
        );
    }


}

export default Team;
