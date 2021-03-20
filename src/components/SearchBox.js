import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  SimpleGrid,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Switch,
  useDisclosure,
  Center,
  Image,
} from '@chakra-ui/react';
import { useAppApi } from '../Api';

export default function SearchBox() {
  const api = useAppApi();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      searchTerm: e.target.searchTerm.value,
      perPage: e.target.perPage.value,
      addFilters: isOpen,
    };
    if (isOpen) {
      searchParams.order = e.target.order.value;
      searchParams.sort = e.target.sort.value;
    }
    api.applyNewSearch(searchParams);
    navigate('1');
  };

  return (
    <Container maxW="container.lg">
      <Box bg="gray.600" p={5} m={5}>
        <Box as="form" id="githubUsersSearch" onSubmit={handleSubmit}>
          <SimpleGrid columns={[1, 3, 3]} spacing="10px">
            <Box>
              <FormControl>
                <FormLabel>Search For Users</FormLabel>
                <Input
                  bg="gray.700"
                  type="text"
                  id="searchTerm"
                  defaultValue="jskeefer"
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Results Per Page</FormLabel>
                <Select bg="gray.700" id="perPage">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="addFilters" mt="10">
                  Apply Filters?
                </FormLabel>
                <Switch onChange={onToggle} id="addFilters" mt="10" />
              </FormControl>
            </Box>
          </SimpleGrid>
          {isOpen ? (
            <SimpleGrid columns={[1, 3, 3]} mt={5} spacing="10px">
              <Box>
                <FormControl>
                  <FormLabel>Sort</FormLabel>
                  <Select bg="gray.700" id="sort">
                    <option>followers</option>
                    <option>repositories</option>
                    <option>joined</option>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel>Order</FormLabel>
                  <Select bg="gray.700" id="order">
                    <option>desc</option>
                    <option>asc</option>
                  </Select>
                </FormControl>
              </Box>
            </SimpleGrid>
          ) : (
            ''
          )}
          <SimpleGrid columns={[1, 3, 3]} spacing="10px">
            <Box pt={5}>
              <Button as="button" bg="tomato" type="submit">
                Apply
              </Button>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
      <Outlet />
      <Box>
        <Center p="20px" color="white">
          <Box>
            <Image src="https://uploads-ssl.webflow.com/5a9e6c4d3dd0520001f5b761/5e84f7055154236d4531a86e_td_media.svg" />
          </Box>
        </Center>
      </Box>
    </Container>
  );
}
