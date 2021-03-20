import React from 'react';
import SearchBox from '../components/SearchBox';
import Results from '../components/Results';
import Page from '../components/Page';
import NoRoute from '../components/NoRoute';

const routes = [
  {
    path: '/',
    element: <SearchBox />,
    children: [
      {
        path: '/',
        element: <Results />,
        children: [
          {
            path: ':pageNum',
            element: <Page />,
          },
        ],
      },
    ],
  },
  { path: '*', element: <NoRoute /> },
];

export default routes;
