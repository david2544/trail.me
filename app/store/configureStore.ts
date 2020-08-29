/**
 * Create the store with dynamic reducers
 */

import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { History } from 'history';
import { composeWithDevTools } from 'redux-devtools-extension';

import { ApplicationRootState } from '@store/IStore';
import { createReducer } from './reducers';

export default function configureStore(
  initialState: ApplicationRootState | {} = {},
  history: History,
) {
  const enhancers = [applyMiddleware(routerMiddleware(history))];

  let enhancer;

  // If Redux Dev Tools is installed, enable it
  /* istanbul ignore next */
  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    enhancer = composeWithDevTools(...enhancers);
  } else {
    enhancer = compose(...enhancers);
  }

  const store = createStore(createReducer(), initialState, enhancer);

  return store;
}
