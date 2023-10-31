import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ErrorBoundary } from 'features/error-boundary';
import { ErrorPage } from 'pages/error-page';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
