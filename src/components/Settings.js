//REACT
import React from 'react';

export class Settings extends React.Component {
     constructor(props) {
        super(props);
        this.state = {
          value: null,
        };
      }
    render() {
        return (
            <div className="container">
                <h1 onClick={() => alert('click')}>Nrao</h1>
            </div>
        );
    }
}


export default Settings;