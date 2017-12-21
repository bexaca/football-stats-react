//REACT
import React from 'react';

//COMPONENTS
import Header from './Header'

export class Root extends React.Component {
    render() {
        return (
            <div className="body">
                <div className="header">
                    <Header/>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Root;