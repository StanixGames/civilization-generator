import {useSelector} from 'react-redux';

import {State} from '../store/redux';
import {UserShort} from '../types';

export type UserHook = UserShort | null;

export const useUser = (): UserHook => {
  const user = useSelector<State, UserShort | null>((state) => state.user.data);

  return user;
}