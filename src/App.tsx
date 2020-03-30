import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from './store/redux';
import {useSession} from './hooks';
import {Guest} from './screens/Guest';
import {User} from './screens/User';
import {AuthStatus} from './types';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// const NATIONS_COEFS = [
//   5.666666667,
//   7.333333333,
//   4.666666667,
//   8.666666667,
//   9.666666667,
//   9,
//   4.333333333,
//   4,
//   6,
//   6,
//   7.333333333,
//   2,
//   3.333333333,
//   9,
//   7.666666667,
//   6,
//   7,
//   6.666666667,
//   6.333333333,
//   6.666666667,
//   5.666666667,
//   8.666666667,
//   5.666666667,
//   5.666666667,
//   8.333333333,
//   8.666666667,
//   7.666666667,
//   5,
//   6.666666667,
//   4.333333333,
//   9.333333333,
//   8.666666667,
//   3.666666667,
//   7.333333333,
//   5,
//   8.333333333,
//   8.333333333,
//   6,
//   3,
//   4.666666667,
//   3,
//   7,
//   4.666666667,
// ];

// export enum Nation {
//   american = 'american',
//   arabian = 'arabian',
//   assyrian = 'assyrian',
//   austrian = 'austrian',
//   aztec = 'aztec',
//   babylonian = 'babylonian',
//   brazilian = 'brazilian', 
//   byzantine = 'byzantine',
//   carthaginian = 'carthaginian',
//   celtic = 'celtic',
//   chinese = 'chinese',
//   danish = 'danish',
//   dutch = 'dutch',
//   egyptian = 'egyptian',
//   english = 'english',
//   ethiopian = 'ethiopian',
//   french = 'french',
//   german = 'german',
//   greek = 'greek',
//   hunnic = 'hunnic',
//   incan = 'incan',
//   indian = 'indian',
//   indonesian = 'indonesian',
//   iroquois = 'iroquois',
//   japanese = 'japanese',
//   korean = 'korean',
//   mayan = 'mayan',
//   mongolian = 'mongolian',
//   moroccan = 'moroccan',
//   ottoman = 'ottoman',
//   persian = 'persian',
//   polish = 'polish',
//   polynesian = 'polynesian',
//   portuguese = 'portuguese',
//   roman = 'roman',
//   russian = 'russian',
//   shoshone = 'shoshone',
//   siamese = 'siamese',
//   songhai = 'songhai',
//   spanish = 'spanish',
//   swedish = 'swedish',
//   venetian = 'venetian',
//   zulu = 'zulu',
// }

// async function set() {
//   Object.keys(Nation).forEach((key, index) => {
//     firebase
//       .firestore()
//       .collection('nations')
//       .doc(key)
//       .set({
//         key,
//         coeff: NATIONS_COEFS[index],
//       })
//       .then((res) => {
//         console.log('done');
//       })
//       .catch((e) => {
//         console.error(e);
//       });
//   });
// }

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
  // set();
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