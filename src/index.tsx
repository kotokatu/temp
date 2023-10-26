import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ErrorBoundary } from 'shared/error-boundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={<p>[ErrorBoundary] Oops... Something went wrong ((</p>}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
