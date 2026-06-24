import type {User} from './UserTypes.ts';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export type RegisterUserDTO = {
  email: string;
  password: string;
};
