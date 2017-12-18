import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './components/Store';
import {Provider} from 'mobx-react';



class Root extends React.Component {
  render() {
      return(
        <Provider Store={Store}>
            <App />
        </Provider>
      )
  }}

ReactDOM.render(
    <Root />,
    document.getElementById('app')
);

registerServiceWorker();
