import React from 'react';
import { useRoutes } from 'react-router-dom';
import {routes} from './config/routes';

export default function App(){
  let appRoutes = useRoutes(routes);
  return appRoutes;
}


