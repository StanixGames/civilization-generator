import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/redux';
import {useSession} from './hooks';
import {Guest} from './screens/Guest';
import {User} from './screens/User';
import {AuthStatus} from './types';
import './App.css';

const AppContainer = () => {
  const [status] = useSession();
  const routes = status === AuthStatus.AUTHORIZED ? User : Guest;

  return (
    <React.Fragment>
      <Route component={routes} />
    </React.Fragment>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
      <Router>
        <AppContainer />
      </Router>
      </div>
    </Provider>
  );
}

export default App;