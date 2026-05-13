import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import type {User} from '../types/UserTypes.ts';
import {authService} from '../services/authService.ts';

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | {type: 'LOGIN_START'}
  | {type: 'LOGIN_SUCCESS'; payload: User}
  | {type: 'LOGIN_ERROR'; payload: string}
  | {type: 'LOGOUT'}
  | {type: 'CHECK_AUTH_START'}
  | {type: 'CHECK_AUTH_SUCCESS'; payload: User}
  | {type: 'CHECK_AUTH_ERROR'};

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {...state, isLoading: true, error: null};
    case 'LOGIN_SUCCESS':
      return {...state, isLoading: false, user: action.payload};
    case 'LOGIN_ERROR':
      return {...state, isLoading: false, error: action.payload};
    case 'LOGOUT':
      return {...state, user: null};
    case 'CHECK_AUTH_START':
      return {...state, isLoading: true};
    case 'CHECK_AUTH_SUCCESS':
      return {...state, isLoading: false, user: action.payload};
    case 'CHECK_AUTH_ERROR':
      return {...state, isLoading: false};
    default:
      return state;
  }
}

export function AuthProvider({children}: {children: ReactNode}) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    dispatch({type: 'LOGIN_START'});

    try {
      // Use service method for fetching
      const responseData = await authService.login(email, password);

      // Until cookie authentication is set
      localStorage.setItem('accessToken', responseData.access_token);

      // Dispatch success
      dispatch({type: 'LOGIN_SUCCESS', payload: responseData.user});

      // To be able to redirect after login properly user is needed
      return responseData.user;
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    //   Call backend to be implemented
    localStorage.removeItem('accessToken');
    dispatch({type: 'LOGOUT'});
  }, []);

  const checkAuth = useCallback(async () => {
    dispatch({type: 'CHECK_AUTH_START'});

    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        dispatch({type: 'CHECK_AUTH_ERROR'});
        return;
      }

      const user = await authService.getProfile(token);

      dispatch({type: 'CHECK_AUTH_SUCCESS', payload: user});
    } catch (error) {
      dispatch({type: 'CHECK_AUTH_ERROR'});
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.user !== null,
        isLoading: state.isLoading,
        error: state.error,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
