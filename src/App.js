import { useRoutes } from 'react-router-dom';
import routes from './config/routes';

export default function App() {
  const appRoutes = useRoutes(routes);
  return appRoutes;
}
