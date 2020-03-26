import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory, useLocation} from "react-router-dom";
import {State} from '../store/redux';
import {tokenSet} from '../store/redux/user';

export type SessionHook = [ boolean ];

let prevToken: string | null = '';

export const useSession = (): SessionHook => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector<State, string | null>((state) => state.user.token);
  if (!token) {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      dispatch(tokenSet(localToken));
    }
  } else {
    const localToken = localStorage.getItem('token');
    if (!localToken) {
      localStorage.setItem('token', token);
    }
  }
  const authorized = !!token;

  useEffect(() => {
    if (token !== prevToken) {
      console.log('tokens', token, prevToken);
      prevToken = token;

      if (token) {
        let path = location.pathname;
        if (path === '/signin' || path === '/signup') {
          path = '/home';
        }
        history.push(path);
      } else {
        const path = location.pathname;
        if (path === '/signin' || path === '/signup') {
          history.push(path);
        } else {
          history.push('/signin');
        }
      }
    }
  }, [token, history]);

  return [
    authorized,
  ];
}