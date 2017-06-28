import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'));
};

render();

if (module.hot) {
  module.hot.accept('./containers/Root', render);
}
