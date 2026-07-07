import type {User} from '../types/UserTypes.ts';
import type {RegisterUserDTO} from '../types/AuthTypes.ts';
import {fetchWithAuthAndRefresh} from './fetchUtils.ts';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    const response = await fetch(API_BASE_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      throw new Error('Login failed! Email or password is incorrect');
    }

    return response.json();
  },

  getProfile: async (): Promise<User> => {
    return await fetchWithAuthAndRefresh<User>(API_BASE_URL + '/auth/profile', {
      method: 'GET',
      credentials: 'include',
    });
  },

  register: async (registerUserDTO: RegisterUserDTO): Promise<string> => {
    const response = await fetch(API_BASE_URL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerUserDTO),
    });
    if (!response.ok) {
      const responseData = await response.json();
      throw new Error(responseData.message || 'Registration failed');
    }
    return await response.text();
  },

  logout: async () => {
    const response = await fetch(API_BASE_URL + '/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }
  },
};
