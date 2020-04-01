import {UserShort} from './User';

export interface Draft {
  name: string;
  users: Array<{
    accepted: boolean;
    user: UserShort;
  }>;
}