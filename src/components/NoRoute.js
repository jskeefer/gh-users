import React from 'react';
import { Box, Center, Image, Heading } from '@chakra-ui/react';

export default function NoRoute() {
  return (
    <Box>
      <Center p="20px" color="white">
        <Box>
          <Heading>404 PAGE NOT FOUND</Heading>
        </Box>
      </Center>
      <Center p="20px" color="white">
        <Box>
          <Image src="https://uploads-ssl.webflow.com/5a9e6c4d3dd0520001f5b761/5e84f7055154236d4531a86e_td_media.svg" />
        </Box>
      </Center>
    </Box>
  );
}
