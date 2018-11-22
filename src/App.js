import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import AppNavigator from './routes';

const Root = () => (
  <Provider store={createStore(reducers, {}, compose(applyMiddleware(thunk)))}>
    <AppNavigator ref={(nav) => { this.navigator = nav; }} />
  </Provider>
);

export default Root;
