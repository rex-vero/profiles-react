import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DataProvider } from './contexts/DataContext';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './pages/ErrorFallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
      <DataProvider>
        <App />
      </DataProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();