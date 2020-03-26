// src/store/chat/reducers.ts
import {
  UserState, 
  UserTypes, 
  UserActionTypes,
  SetTokenAction,
} from './user.types';

const initState: UserState = {
  token: null,
}

export const userReducer = (state = initState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case UserTypes.TOKEN_REMOVE:
      return {
        ...state,
        token: null,
      };
    case UserTypes.TOKEN_SET:
      const {token} = action as SetTokenAction;
      return {
        ...state,
        token,
      }
    default:
      return state;
  }
}