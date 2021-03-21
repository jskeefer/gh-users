import React from 'react';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import { useAppApi } from '../Api';
import DisplayUserInfo from './DisplayUserInfo';

export default function Page() {
  const { makeApiCall, results } = useAppApi();

  return (
    <Box>
      {makeApiCall ? (
        <Stack>
          <Skeleton height="100px" />
        </Stack>
      ) : (
        <Box>
          {results.items
            ? results.items.map((result) => (
                <Box mb="5px" key={result.id}>
                  <DisplayUserInfo user={result.url} />
                </Box>
              ))
            : 'No Results'}
        </Box>
      )}
    </Box>
  );
}
