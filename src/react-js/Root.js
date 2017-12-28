//REACT
import React from 'react';

//COMPONENTS
import Header from './layout/Header';

//MOBX
import store from './base/Store';

export class Root extends React.Component {
    render() {
        return (
            <div className="body">
                <div className="header">
                    <Header store={store}/>
                </div>
                <main>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default Root;