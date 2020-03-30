export interface Draft {
  name: string;
  users: Array<{
    userId: string;
    accepted: boolean;
  }>;
}