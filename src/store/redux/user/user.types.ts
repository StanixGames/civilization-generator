export const UserTypes = {
  TOKEN_SET: 'TOKEN_SET',
  TOKEN_REMOVE: 'TOKEN_REMOVE',
};

export interface SetTokenAction {
  type: typeof UserTypes.TOKEN_SET
  token: string;
}

interface RemoveTokenAction {
  type: typeof UserTypes.TOKEN_REMOVE
}

export interface UserState {
  token: string | null;
}

export type UserActionTypes = SetTokenAction | RemoveTokenAction