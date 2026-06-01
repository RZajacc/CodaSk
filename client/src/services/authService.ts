import type {User} from '../types/UserTypes.ts';

export interface LoginResponse {
  access_token: string;
  user: User;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

console.log('BASE URL', API_BASE_URL);

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      throw new Error('Login failed! Email or password is incorrect');
    }

    return response.json();
  },

  getProfile: async (token: string): Promise<User> => {
    const response = await fetch(API_BASE_URL + '/auth/profile', {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    });

    if (!response.ok) {
      throw new Error('Auth check failed');
    }

    return response.json();
  },
};
