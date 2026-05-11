import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useReducer,
} from 'react';

export interface User {
  _id: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
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

      const user: User = await response.json();

      console.log('USER', user);

      dispatch({type: 'LOGIN_SUCCESS', payload: user});
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error instanceof Error ? error.message : 'Unknown error',
      });
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
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
