import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_photo: string;
  questions: string[];
  answers: string[];
  saved_tags: string[];
  member_since: string;
  last_seen: string;
  bio: string;
  cohort_name: string;
  course_type: string;
  github: string;
  location: {
    country: string;
    city: string;
  };
  user_permission: string;
  website: string;
  course_date: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
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
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const responseData: LoginResponse = await response.json();
      localStorage.setItem('accessToken', responseData.access_token);

      dispatch({type: 'LOGIN_SUCCESS', payload: responseData.user});
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    //   To be implemented
  }, []);

  const checkAuth = useCallback(async () => {
    dispatch({type: 'CHECK_AUTH_START'});

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        dispatch({type: 'CHECK_AUTH_ERROR'});
        return;
      }

      const response = await fetch('http://localhost:5000/auth/profile', {
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      });

      if (!response.ok) {
        throw new Error('Auth check failed');
      }

      const user: User = await response.json();
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
