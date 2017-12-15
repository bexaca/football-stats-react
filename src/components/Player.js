import React from 'react';

import SinglePlayer from './SinglePlayer.js';


export class Player extends React.Component {
    render() {
        console.log(this.props.route)
        return (
            <div>
                <SinglePlayer/>
            </div>
        );
    }
}

export default Player;