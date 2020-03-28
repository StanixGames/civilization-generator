import {AuthStatus} from '../../../types';
import {
  UserState, 
  UserTypes, 
  UserActionTypes,
  AuthStatusSetAction,
  UserDataSetAction,
} from './user.types';

const initState: UserState = {
  status: AuthStatus.NONE,
  data: null,
}

export const userReducer = (state = initState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case UserTypes.AUTH_STATUS_SET:
      const {status} = action as AuthStatusSetAction;
      return {
        ...state,
        status,
      }
    case UserTypes.DATA_SET:
      const {data} = action as UserDataSetAction;
      return {
        ...state,
        data,
      }
    default:
      return state;
  }
}