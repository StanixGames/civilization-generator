import {
  UserTypes,
  UserActionTypes
} from './user.types';

export const tokenSet = (token: string): UserActionTypes => {
  return {
    type: UserTypes.TOKEN_SET,
    token,
  }
};

export const tokenRemove = (): UserActionTypes => {
  return {
    type: UserTypes.TOKEN_REMOVE,
  }
};
