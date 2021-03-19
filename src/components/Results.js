import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, Stack, Skeleton, useToast } from '@chakra-ui/react';
import { useAppApi } from '../Api';

export default function Results() {
  const api = useAppApi();
  const navigate = useNavigate();
  const toast = useToast();

  const gotoPage = (p) => {
    api.updatePage(p);
    navigate(p);
  };

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
      Query Results
      {api.makeApiCall ? (
        <Stack>
          <Skeleton height="50px" />
        </Stack>
      ) : (
        <Box>
          <Box>
            items
            {api.results.items.length}
          </Box>
          <Box>
            items
            {api.results.total_count}
          </Box>
        </Box>
      )}
      <Box mt={10}>
        <Outlet />
      </Box>
    </Box>
  );
}
