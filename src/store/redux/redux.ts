import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {UserState} from './user';
import {rootReducer} from './rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
  ),
  // other store enhancers if any
);

export interface State {
  user: UserState,
}

export const store = createStore(rootReducer, enhancer);
