
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';
// import promisesMiddleware from '../middleware/promises';
import { controllers } from '../middleware';

const logger = createLogger();
const configureStore = (preloadedState) => {
  const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(thunk, logger, controllers /* , promisesMiddleware*/)),
  );

  if (module.hot) {
  // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};

export default configureStore;
