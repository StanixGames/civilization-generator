import * as firebase from 'firebase/app';
import 'firebase/auth';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";

import {AuthStatus, UserShort} from '../types';
import {authStatusSet, userDataSet} from '../store/redux/user';
import {State} from '../store/redux';
import {users} from '../store';

export type SessionHook = [ AuthStatus ];

let firebaseAuthListenerSetup = false;
let prevAuthStatus: AuthStatus = AuthStatus.FETCHING;

export const useSession = (): SessionHook => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  if (!firebaseAuthListenerSetup) {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('user', user, user.displayName);
        dispatch(authStatusSet(AuthStatus.AUTHORIZED));
        
        if (user.email) {
          users.getDataByEmail(user.email)
            .then((userData: UserShort | null) => {
              if (userData) {
                dispatch(userDataSet(userData));
              }
            });
        }
      } else {
        console.log('LOGOUT IS');
        dispatch(authStatusSet(AuthStatus.NOT_AUTHORIZED));
      }
    });

    firebaseAuthListenerSetup = true;
  }

  const status = useSelector<State, AuthStatus>((state) => state.user.status);

  useEffect(() => {
    if (status !== prevAuthStatus) {
      prevAuthStatus = status;

      if (status === AuthStatus.AUTHORIZED) {
        let path = location.pathname;
        if (path === '/signin' || path === '/signup' || path === '' || path === '/') {
          path = '/home';
        }
        history.push(path);
      } else if (status === AuthStatus.NOT_AUTHORIZED) {
        const path = location.pathname;
        if (path === '/signin' || path === '/signup') {
          history.push(path);
        } else {
          history.push('/signin');
        }
      }
    }
  }, [status, history]);

  return [
    status,
  ];
}