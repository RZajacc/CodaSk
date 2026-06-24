import type {User} from './UserTypes.ts';

export interface LoginResponse {
  access_token: string;
  user: User;
}
