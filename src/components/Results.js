import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useToast } from '@chakra-ui/react';
import { useAppApi } from '../Api';
import DisplayResultInfoPagination from './DisplayResultInfoPagination';

export default function Results() {
  const { makeApiCall, callApiSearchUsers } = useAppApi();
  const toast = useToast();

  useEffect(() => {
    if (makeApiCall) {
      callApiSearchUsers().then((res) => {
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
  }, [makeApiCall]);

  return (
    <Box bg="gray.600" p={2} mt={5}>
      <DisplayResultInfoPagination />
      <Box mt={5}>
        <Outlet />
      </Box>
    </Box>
  );
}
