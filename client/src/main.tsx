import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './AppContent.tsx';
import './styles/globals.css';
import {AuthProvider} from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
