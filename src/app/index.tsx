import { FC } from 'react';
import './index.css';
import { Router } from './router';
import { StoreProvider } from './store';

export const App: FC = () => {
  return (
    <StoreProvider>
      <Router />;
    </StoreProvider>
  );
};

//

//?Store
// Utilize the created context to store both the value entered in the Search component and the list of items received from the API;
// Ensure that all components that need to access this data use the context.

//?Testing
// Card List
// Card
// Detailed Card
// Pagination
// Search
// 404 Page
