import { ErrorBoundary } from 'features/error-boundary';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isEnabledStrictMode } from 'shared/constants';
import { App } from './app';

const children = (
  <ErrorBoundary fallback={<h1>[ErrorBoundary]: App Error :(</h1>}>
    <App />
  </ErrorBoundary>
);

createRoot(document.getElementById('root')!).render(
  isEnabledStrictMode ? <StrictMode>{children}</StrictMode> : children
);
