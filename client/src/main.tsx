import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {App} from './App.tsx';
import './styles/globals.css';
import './styles/loader.css';
import './styles/modal.css';
import './styles/toast.css';
import {AuthProvider} from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
