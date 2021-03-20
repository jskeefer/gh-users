import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Stack, Skeleton, useToast } from '@chakra-ui/react';
import { useAppApi } from '../Api';
import DisplayResultInfoPagination from './DisplayResultInfoPagination';

export default function Results() {
  const api = useAppApi();
  const toast = useToast();

  useEffect(() => {
    if (api.makeApiCall) {
      api.callApiSearchUsers().then((res) => {
        if (res.message) {
          toast({
            title: 'Error!',
            description: res.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
        }
      });
    }
  }, [api.makeApiCall]);

  return (
    <Box bg="gray.600" p={5} m={5}>
      <DisplayResultInfoPagination />

      <Box mt={10}>
        <Outlet />
      </Box>
    </Box>
  );
}
