import React from 'react';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { useAppApi } from '../Api';
import DisplayUserInfo from './DisplayUserInfo';

export default function Page() {
  const api = useAppApi();

  return (
    <Box>
      {api.makeApiCall ? (
        <Stack>
          <Skeleton height="100px" />
        </Stack>
      ) : (
        <Box>
          {api.results.items
            ? api.results.items.map((r) => (
                <Box mb="5px" key={r.id}>
                  <DisplayUserInfo user={r.url} />
                </Box>
              ))
            : 'No Results'}
        </Box>
      )}
    </Box>
  );
}
