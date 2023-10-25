import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ErrorBoundary } from 'shared/error-boundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Oops... Something went wrong D:</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
