import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { AppProviders } from './contexts';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
