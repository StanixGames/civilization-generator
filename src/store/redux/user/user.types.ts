import {AuthStatus, UserShort} from '../../../types';

export const UserTypes = {
  AUTH_STATUS_SET: 'AUTH_STATUS_SET',
  DATA_SET: 'DATA_SET',
};

export interface AuthStatusSetAction {
  type: typeof UserTypes.AUTH_STATUS_SET
  status: AuthStatus;
}

export interface UserDataSetAction {
  type: typeof UserTypes.DATA_SET;
  data: UserShort;
}

export interface UserState {
  status: AuthStatus;
  data: UserShort | null;
}

export type UserActionTypes =
  | AuthStatusSetAction
  | UserDataSetAction;
