//REACT
import React from 'react';

//COMPONENTS
import Header from './Header';

//MOBX
import store from './Store';

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