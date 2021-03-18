import React from 'react';
import {Outlet} from 'react-router-dom';
import {Container} from '@chakra-ui/react';
import {useAppApi} from '../Api';

export default function SearchBox() {
  let api = useAppApi();

  return (
    <Container maxW="container.lg">
      Search Box
      <Outlet />
    </Container>
  );
}
