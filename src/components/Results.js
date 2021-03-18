import React from 'react';
import {Outlet} from 'react-router';
import { useAppApi } from '../Api.js';

export default function Results() {
  let api = useAppApi();

  return (
    <div>
      Query Results
      <Outlet />
    </div>
  );
}
