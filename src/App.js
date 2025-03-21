import { useContext } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './assets/scss/App.css';
import Loader from './components/main/Loader';
import DataContext from './contexts/DataContext';
import { routes } from './routs';

const App = () => {
  const router = createBrowserRouter(routes);
  const { load } = useContext(DataContext);
  return load ? <Loader /> : <RouterProvider router={router} />
}

export default App;