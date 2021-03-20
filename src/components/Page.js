import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton, Stack, Avatar } from '@chakra-ui/react';
import { useAppApi } from '../Api';

export default function Page() {
  const api = useAppApi();
  const { pageNum } = useParams();

  return (
    <div>
      {api.makeApiCall ? (
        <Stack>
          <Skeleton height="100px" />
        </Stack>
      ) : (
        <Box>
          {api.results.items
            ? api.results.items.map((r) => (
                <Box key={r.id}>
                  {r.id}
                  <Avatar name="Dan Abrahmov" src={r.avatar_url} />
                </Box>
              ))
            : 'No Results'}
        </Box>
      )}
    </div>
  );
}
