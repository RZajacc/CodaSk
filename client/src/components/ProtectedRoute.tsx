import {useAuth} from '../context/AuthContext.tsx';
import {Navigate} from 'react-router';
import type {ReactNode} from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
  const {isAuthenticated, isLoading} = useAuth();

  if (isLoading) {
    return (
      <div className={'flex h-screen items-center justify-center'}>
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={'/user/login'} replace={true} />;
  }

  return children;
}
