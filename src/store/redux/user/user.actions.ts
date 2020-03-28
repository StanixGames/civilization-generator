import {AuthStatus, UserShort} from '../../../types';
import {
  UserTypes,
  UserActionTypes
} from './user.types';

export const authStatusSet = (status: AuthStatus): UserActionTypes => {
  return {
    type: UserTypes.AUTH_STATUS_SET,
    status,
  }
};

export const userDataSet = (data: UserShort): UserActionTypes => {
  return {
    type: UserTypes.DATA_SET,
    data,
  }
}
