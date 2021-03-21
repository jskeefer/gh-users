import React, { useState, useEffect } from 'react';
import {
  Box,
  Skeleton,
  Stack,
  Avatar,
  Grid,
  GridItem,
  Link,
  SimpleGrid,
  Tag,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { useAppApi } from '../Api';

export default function DisplayUserInfo(url) {
  const { callUsersInfoUrl } = useAppApi();
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});

  const getUserInfo = () => {
    callUsersInfoUrl(url.user).then((res) => {
      setUserInfo(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Box>
      {isLoading ? (
        <Stack>
          <Skeleton height="20px" />
        </Stack>
      ) : (
        <LinkBox bg="gray.700" mb="10px" p="3">
          <Grid
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(13, 1fr)"
            gap={2}
          >
            <GridItem rowSpan={2} colSpan={1}>
              <LinkOverlay
                color="papayawhip"
                href={userInfo.html_url}
                isExternal
              >
                <Avatar size="lg" mt="7px" src={userInfo.avatar_url} />
              </LinkOverlay>
            </GridItem>
            <GridItem colSpan={[12, 6, 3]}>
              <Link color="papayawhip" href={userInfo.html_url} isExternal>
                {userInfo.login}
              </Link>
            </GridItem>
            <GridItem colSpan={[12, 6, 3]}> {userInfo.name} </GridItem>
            <GridItem colSpan={[12, 6, 6]}> {userInfo.location}</GridItem>
            <GridItem colSpan={12}>
              <SimpleGrid
                columns={[1, 2, 4]}
                spacing="20px"
                bg="papayawhip"
                color="gray.900"
              >
                <Box p="4px">
                  <Box as="span" fontWeight="800">
                    Followers:
                  </Box>{' '}
                  <Tag as="span" bg="tomato" float={['right', 'right', 'none']}>
                    {userInfo.followers}
                  </Tag>
                </Box>
                <Box p="4px">
                  <Box as="span" fontWeight="800">
                    Following:
                  </Box>{' '}
                  <Tag as="span" bg="tomato" float={['right', 'right', 'none']}>
                    {userInfo.following}
                  </Tag>
                </Box>
                <Box p="4px">
                  <Box as="span" fontWeight="800">
                    Repos:
                  </Box>{' '}
                  <Tag as="span" bg="tomato" float={['right', 'right', 'none']}>
                    {userInfo.public_repos}
                  </Tag>
                </Box>
                <Box p="4px">
                  <Box as="span" fontWeight="800">
                    Gists:
                  </Box>{' '}
                  <Tag as="span" bg="tomato" float={['right', 'right', 'none']}>
                    {userInfo.public_gists}
                  </Tag>
                </Box>
              </SimpleGrid>
            </GridItem>
          </Grid>
        </LinkBox>
      )}
    </Box>
  );
}
