import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const reactElement = (
  <StrictMode>
    <App />
  </StrictMode>
);
const root = document.getElementById('root') ?? document.createElement('div');
createRoot(root).render(reactElement);

export { reactElement, root };
