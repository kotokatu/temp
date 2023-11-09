import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import { ErrorBoundary } from 'features/error-boundary';
import { isEnabledStrictMode } from 'shared/constants';

const children = (
  <ErrorBoundary fallback={<h1>[ErrorBoundary]: App Error :(</h1>}>
    <App />
  </ErrorBoundary>
);

createRoot(document.getElementById('root')!).render(
  isEnabledStrictMode ? <StrictMode>{children}</StrictMode> : children
);
